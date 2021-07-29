# frozen_string_literal: true

require 'test_helper'
require 'iis_shc_issuer/profile_errors'
require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = 'test/vcr_cassettes/iis_shc_issuer/profile_errors_test'
  config.hook_into :webmock
end

class ProfileErrorsTest < ActiveSupport::TestCase
end
