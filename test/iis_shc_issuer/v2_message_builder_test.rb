# frozen_string_literal: true

require 'test_helper'
require 'iis_shc_issuer/v2_message_builder'
require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = 'test/vcr_cassettes/iis_shc_issuer'
  config.hook_into :webmock
end

class V2MessageBuilderTest < ActiveSupport::TestCase
  # TODO: Build out unit tests
end
