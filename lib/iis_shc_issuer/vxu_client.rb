# frozen_string_literal: true

module IISSHCIssuer
  # Send a VXU message to the IIS Sandbox service to upload a patient
  module VXUClient
    module_function

    # NOTE: This is a helper method to upload a patient to the IIS Sandbox and should be used for testing purposes only
    # Send a VXU message to the IIS Sandbox service to upload a patient
    # @param vxu_path [String] File Path where HL7 V2 VXU message is located
    def upload_patient(vxu_path = 'lib/assets/vxu_fixtures/vxu.hl7')
      # Define client
      service_def = 'lib/assets/service.wsdl'
      client = Savon.client(wsdl: service_def,
                            endpoint: "#{Rails.application.config.iisSandboxHost}/iis-sandbox/soap",
                            pretty_print_xml: true)
      # Upload Patient from fixture
      upload_raw_input = FILE.open(vxu_path).readlines
      upload_msg_input = HL7::Message.new(upload_raw_input)
      client.call(:submit_single_message) do
        message({ username: Rails.application.config.username,
                  password: Rails.application.config.password,
                  facilityID: Rails.application.config.facilityID,
                  hl7Message: upload_msg_input })
      end
    end
  end
end
