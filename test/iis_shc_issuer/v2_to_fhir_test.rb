# frozen_string_literal: true

require 'test_helper'
require 'vcr_setup'
require 'iis_shc_issuer/v2_to_fhir'

class V2ToFHIRTest < ActiveSupport::TestCase
  # General Functionality Tests
  test 'translate_to_fhir() method successfully returns a stringified JSON object' do
    VCR.use_cassette('translator_returns_json_string', match_requests_on: [:method]) do
      response = File.open('test/fixtures/files/RSP_valid.hl7').readlines
      v2_response_body = HL7::Message.new(response)
      fhir_response_body = IISSHCIssuer::V2ToFHIR.translate_to_fhir(v2_response_body)
      parsed_fhir_response = begin
        JSON.parse(fhir_response_body)
      rescue StandardError
        nil
      end
      assert_not_nil(parsed_fhir_response)
    end
  end

  # V2 to FHIR Translation Tests

  test 'Valid HL7 V2 Complete Immunization History Response will return a FHIR Bundle from the HL7 to V2 Translator' do
    VCR.use_cassette('translator_returns_fhir_bundle', match_requests_on: [:method]) do
      response = File.open('test/fixtures/files/RSP_valid.hl7').readlines
      v2_response = HL7::Message.new(response)
      fhir_response = IISSHCIssuer::V2ToFHIR.translate_to_fhir(v2_response)
      fhir_response_hash = JSON.parse(fhir_response)
      assert_equal('Bundle', fhir_response_hash['resourceType'])
    end
  end

  test 'Non-Patient HL7 V2 Response will return an error message from the HL7 to V2 Translator' do
    VCR.use_cassette('translator_returns_error', match_requests_on: [:method]) do
      response = File.open('test/fixtures/files/RSP_error.hl7').readlines
      v2_response = HL7::Message.new(response)
      fhir_response = IISSHCIssuer::V2ToFHIR.translate_to_fhir(v2_response)
      fhir_response_hash = JSON.parse(fhir_response)
      assert_not_nil(fhir_response_hash['errors'])
    end
  end
end
