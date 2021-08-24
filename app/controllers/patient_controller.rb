require 'health_cards'

class PatientController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:search]

  def search
    patient_info = { patient_name: { given_name: params[:given_name], family_name: params[:family_name] },
                     patient_dob: params[:patient_dob] }
    v2_response = IISSHCIssuer::QBPClient.query(patient_info)
    fhir_bundle = IISSHCIssuer::V2ToFHIR.translate_to_fhir(v2_response)
    session[:fhir_bundle] = fhir_bundle
    byebug
    render json: fhir_bundle
  end
end
