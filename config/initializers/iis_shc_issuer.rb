# frozen_string_literal: true

require 'iis_shc_issuer'

Rails.application.configure do
  config.iis_username = ENV['IIS_SANDBOX_USERNAME']
  config.iis_password = ENV['IIS_SANDBOX_PASSWORD']
  config.iis_facility_id = ENV['IIS_SANDBOX_FACILITY_ID']

  config.iis_sandbox_host = ENV['IIS_SANDBOX_HOST']
  config.v2_to_fhir_host = ENV['V2_TO_FHIR_HOST']
end
