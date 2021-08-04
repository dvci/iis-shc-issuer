# frozen_string_literal: true

require 'savon'
require 'ruby-hl7'

module IISSHCIssuer
  # Send a VXU message to the IIS Sandbox service to upload a patient
  module VXUClient
    module_function

    # Send a VXU message to the IIS Sandbox service to upload a patient
    # @param vxu_path [String] File Path where HL7 V2 VXU message is located
    def upload_patient(vxu_path)
      # Define client
      service_def = 'lib/assets/service.wsdl'
      client = Savon.client(wsdl: service_def,
                            endpoint: "#{Rails.application.config.iis_sandbox_host}/iis-sandbox/soap",
                            pretty_print_xml: true)
      # Upload Patient from fixture
      upload_raw_input = File.open(vxu_path).readlines
      upload_msg_input = HL7::Message.new(upload_raw_input)
      begin
        response = client.call(:submit_single_message) do
          message({ username: Rails.application.config.iis_username,
                    password: Rails.application.config.iis_password,
                    facilityID: Rails.application.config.iis_facility_id,
                    hl7Message: upload_msg_input })
        end
      rescue Savon::Error => e
        fault_code = e.to_s
        raise IISSHCIssuer::SOAPError, fault_code
      end
      raw_response_message = response.body[:submit_single_message_response][:return]
      response_segments = raw_response_message.to_s.split("\n")
      HL7::Message.new(response_segments)
    end
  end
end
