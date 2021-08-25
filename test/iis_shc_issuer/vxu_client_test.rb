# frozen_string_literal: true

require 'test_helper'
require 'vcr_setup'
require 'iis_shc_issuer/vxu_client'

class VXUClientTest < ActiveSupport::TestCase
  test 'Patient can be uploaded to IIS Sandbox via VXU message' do
    VCR.use_cassette('patient_is_uploaded') do
      # Enter VXU Upload fixture path parameter here
      v2_response_body = IISSHCIssuer::VXUClient.upload_patient('test/fixtures/files/VXU_example.hl7')
      assert_instance_of(HL7::Message, v2_response_body)
    end
  end
end
