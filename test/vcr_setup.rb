require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = 'test/vcr_cassettes/iis_shc_issuer'
  config.hook_into :webmock
  config.default_cassette_options = { match_requests_on: [:method, :path] }
end