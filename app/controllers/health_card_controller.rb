require 'health_cards'

class HealthCardController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index; end

  def create
    fhir_bundle = FHIR.from_contents(session[:fhir_bundle])
    vaccine_group = params[:vaccine_group] || 'COVID-19'

    health_card = HealthCard.new(bundle: fhir_bundle, vaccine_group: vaccine_group,
                                 issuer: Rails.application.config.issuer)
    render json: health_card.to_json
  end
end
