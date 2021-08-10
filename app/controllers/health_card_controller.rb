require 'health_cards'

class HealthCardController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index; end

  def create
    fhir_bundle = FHIR.from_contents(session[:fhir_bundle])
    vaccine_group = params[:vaccine_group] || 'COVID-19'

    health_card = HealthCard.new(fhir_bundle)
    health_card.immunizations.select! { |i| i.vaccine_group == vaccine_group }

    issuer = Rails.application.config.issuer
    jws = if vaccine_group == 'COVID-19'
            issuer.issue_jws(fhir_bundle, type: HealthCards::COVIDHealthCard)
          else
            issuer.issue_jws(fhir_bundle, type: HealthCards::HealthCard)
          end

    qr_codes = HealthCards::Exporter.qr_codes(jws)
    health_card.qr_codes = qr_codes.chunks.map { |chunk| chunk.qrcode.data }
    render json: health_card.to_json
  end
end
