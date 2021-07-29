# frozen_string_literal: true

require 'iis_shc_issuer'

Rails.application.configure do
  config.username = ENV['IIS_SANDBOX_USERNAME']
  config.password = ENV['IIS_SANDBOX_PASSWORD']
  config.facilityID = ENV['IIS_SANDBOX_FACILITYID']

  config.iisSandboxHost = ENV['IIS_SANDBOX_HOST']
  config.v2ToFhirHost = ENV['V2_TO_FHIR_HOST']
end
