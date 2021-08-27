require 'health_cards'

class PatientController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:search]


  REQUIRED_ATTRIBUTES = config_for(:search_form)

  def form
    render json: SearchForm
  end

  def search
    query = IISSHCIssuer::PatientQuery.new(search_params)
    v2_response = IISSHCIssuer::QBPClient.query(query)
    fhir_bundle = IISSHCIssuer::V2ToFHIR.translate_to_fhir(v2_response)
    session[:fhir_bundle] = fhir_bundle
    render json: fhir_bundle
  end

  private

  def search_params
    puts params.require(SearchParameters[:required])
    params.require(SearchParameters[:required]).permit(SearchParameters[:optional])
  end
end
