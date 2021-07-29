# frozen_string_literal: true

require 'test_helper'
require 'iis_shc_issuer/vxu_client'
require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = 'test/vcr_cassettes/iis_shc_issuer/vxu_client_test'
  config.hook_into :webmock
end

class VXUClientTest < ActiveSupport::TestCase
  # # WARNING: Running tests with this test uncommented could change sandbox data and cause other tests to fail
  # # Temporary Test to upload a patient
  # test 'Uploading a patient' do
  #   IisShcIssuer::QBPClient.upload_patient() #Enter VXU Upload fixture path parameter here
  # end
end
