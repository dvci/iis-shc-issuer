# frozen_string_literal: true

require 'test_helper'
require 'iis_shc_issuer/vxu_client'
require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = 'test/vcr_cassettes/iis_shc_issuer/vxu_client_test'
  config.hook_into :webmock
end

class VXUClientTest < ActiveSupport::TestCase
end
