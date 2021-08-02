require 'health_cards'
require 'open-uri'

class HealthCardController < ApplicationController
  @private_key = nil
  @issuer = nil

  skip_before_action :verify_authenticity_token, only: [:create]

  def index; end

  def create
    # respond_to do |format|
    #  format.fhir_json do
    fhir_params = FHIR.from_contents(request.raw_post)

    health_card = HealthCard.new
    patient_entry = fhir_params.entry.find { |e| e.resource.is_a?(FHIR::Patient) }
    health_card.patient = Patient.new(patient_entry.resource)

    immunization_entries = fhir_params.entry.select { |e| e.resource.is_a?(FHIR::Immunization) }
    immunization_entries.map do |immunization_entry|
      health_card.immunizations.push(Immunization.new(immunization_entry.resource))
    end
    health_card.immunizations.sort_by!{ |i| Date.strptime(i.occurrence, '%m/%d/%Y') }

    @private_key ||= private_key
    @issuer ||= HealthCards::Issuer.new(key: @private_key, url: 'https://spec.smarthealth.cards/examples/issuer')
    jws = @issuer.issue_jws(fhir_params, type: HealthCards::COVIDHealthCard)

    qr_codes = HealthCards::Exporter.qr_codes(jws)
    qr_codes.chunks.map.with_index do |chunk, _idx|
      health_card.qr_codes.push chunk.qrcode.data
    end
    render json: health_card.to_json
    # end
    # end
  end

  private

  def private_key
    jwks = URI.open('https://raw.githubusercontent.com/smart-on-fhir/health-cards/main/generate-examples/src/config/issuer.jwks.private.json').read
    keyset = HealthCards::KeySet.from_jwks(jwks)
    keyset.keys[0]
  end
end
