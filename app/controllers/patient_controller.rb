require 'health_cards'

class PatientController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:search]

  def form
    render json: SearchParameters.to_json
  end

  def search
    form = SearchForm.new(search_params)
    v2_response = IISSHCIssuer::QBPClient.query(form.to_query)
    fhir_bundle = IISSHCIssuer::V2ToFHIR.translate_to_fhir(v2_response)
    session[:fhir_bundle] = fhir_bundle
    render json: fhir_bundle
  rescue IISSHCIssuer::V2PatientNotFoundError
    head :not_found
  rescue IISSHCIssuer::V2MultiplePatientsFoundError, IISSHCIssuer::InvalidSearchError,
         ActionController::ParameterMissing
    head :unprocessable_entity
  end

  private

  def search_params
    params.require(SearchParameters.required)
    params.permit(SearchParameters.all)
    # byebug
  end
end
