# frozen_string_literal: true

module IISSHCIssuer
  # Translate an HL7 V2 Message into a FHIR Bundle
  module V2ToFHIR
    module_function

    # Translate relevant Patient and Vaccination info from V2 Response message into a FHIR Bundle
    # @param v2_response [HL7::Message] V2 message returned from the IIS Sandbox
    # @return [String] FHIR Bundle representation of the V2 message
    def translate_to_fhir(v2_response)
      fhir_response = Faraday.post("#{Rails.application.config.v2_to_fhir_host}/api/v0.1.0/convert/text",
                                   v2_response.to_hl7,
                                   'Content-Type' => 'text/plain')
      fhir_response.body
    end
  end
end
