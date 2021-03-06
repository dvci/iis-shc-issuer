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

  test 'Valid HL7 V2 Complete Immunization History Response will return a FHIR Bundle' do
    VCR.use_cassette('translator_returns_fhir_bundle', match_requests_on: [:method]) do
      response = File.open('test/fixtures/files/RSP_valid.hl7').readlines
      v2_response = HL7::Message.new(response)
      fhir_response = IISSHCIssuer::V2ToFHIR.translate_to_fhir(v2_response)
      fhir_response_hash = JSON.parse(fhir_response)
      assert_equal('Bundle', fhir_response_hash['resourceType'])
    end
  end

  test 'An HL7 V2 Message with multiple results will throw a V2MultiplePatientsFoundError' do
    response = File.open('test/fixtures/files/TestCase-Z31_multimatch-Response.hl7').readlines
    v2_response = HL7::Message.new(response)
    assert_raises IISSHCIssuer::V2MultiplePatientsFoundError do
      IISSHCIssuer::V2ToFHIR.translate_to_fhir(v2_response)
    end
  end

  test 'A Non-Patient HL7 V2 Message will throw a V2PatientNotFoundError' do
    response = File.open('test/fixtures/files/RSP_error.hl7').readlines
    v2_response = HL7::Message.new(response)
    assert_raises IISSHCIssuer::V2PatientNotFoundError do
      IISSHCIssuer::V2ToFHIR.translate_to_fhir(v2_response)
    end
  end
end
