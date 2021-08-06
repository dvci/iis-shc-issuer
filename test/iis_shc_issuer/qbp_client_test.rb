# frozen_string_literal: true

require 'test_helper'
require 'iis_shc_issuer/qbp_client'
require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = 'test/vcr_cassettes/iis_shc_issuer'
  config.hook_into :webmock
end

class QBPClientTest < ActiveSupport::TestCase
  # General Functionality Tests

  test 'query() method successfully returns an HL7 V2 Message' do
    VCR.use_cassette('query_returns_v2') do
      v2_response_body = IISSHCIssuer::QBPClient.query({})
      assert_instance_of(HL7::Message, v2_response_body)
    end
  end

  test 'raises error if inputted sandbox credentials are incorrectly formatted' do
    user_sandbox_credentials = { username: 'test_user', password: 'test_password', facilityID: 'test_facilityID' }
    missing_credential = user_sandbox_credentials.except(:password)
    assert_raises IISSHCIssuer::InvalidSandboxCredentialsError do
      IISSHCIssuer::QBPClient.query({}, missing_credential)
    end

    non_string_credential = user_sandbox_credentials
    non_string_credential[:password] = 1
    assert_raises IISSHCIssuer::InvalidSandboxCredentialsError do
      IISSHCIssuer::QBPClient.query({}, non_string_credential)
    end
  end

  # Client Connectivity Tests

  test 'Connectivity Test raises no errors (Successfully connected to IIS Sandbox endpoint)' do
    VCR.use_cassette('connectivity_test') do
      service_def = 'lib/assets/service.wsdl'
      client = Savon.client(wsdl: service_def,
                            endpoint: "#{Rails.application.config.iis_sandbox_host}/iis-sandbox/soap",
                            pretty_print_xml: true)
      assert_nothing_raised do
        IISSHCIssuer::QBPClient.check_client_connectivity(client) if client.operations.include?(:connectivity_test)
      end
    end
  end

  # SOAP Faults

  test 'SOAP FAULT: SecurityFault - bad credentials' do
    VCR.use_cassette('soap_fault_bad_credentials') do
      user_sandbox_credentials = { username: 'mitre', password: 'bad_password', facilityID: 'MITRE Healthcare' }
      assert_raises IISSHCIssuer::SOAPError do
        IISSHCIssuer::QBPClient.query({}, user_sandbox_credentials)
      end
    end
  end

  test 'SOAP FAULT: Unknown fault - generic error' do
    # NOTE: This functionality may be updated within the IIS Sandbox, according to recent conversation with Nathan
    # Currently, this throws the same exception as the above "Security Fault"
    VCR.use_cassette('soap_fault_generic_error') do
      user_sandbox_credentials = { username: 'NPE', password: 'NPE', facilityID: 'MITRE Healthcare' }
      assert_raises IISSHCIssuer::SOAPError do
        IISSHCIssuer::QBPClient.query({}, user_sandbox_credentials)
      end
    end
  end
end
