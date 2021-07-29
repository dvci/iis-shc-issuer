# frozen_string_literal: true

require 'test_helper'
require 'iis_shc_issuer/qbp_client'
require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = 'test/vcr_cassettes/iis_shc_issuer/qbp_client_test'
  config.hook_into :webmock
end

class QBPClientTest < ActiveSupport::TestCase
  setup do
    @complete_patient = { patient_list: { id: 'J19X5',
                                          assigning_authority: 'AIRA-TEST',
                                          identifier_type_code: 'MR' },
                          patient_name: { family_name: 'WeilAIRA',
                                          given_name: 'BethesdaAIRA',
                                          second_or_further_names: 'Delvene',
                                          suffix: '' },
                          mothers_maiden_name: { family_name: 'WeilAIRA',
                                                 given_name: 'BethesdaAIRA',
                                                 name_type_code: 'M' },
                          patient_dob: '20170610',
                          admin_sex: 'F',
                          address: { street: '1113 Wollands Kroon Ave',
                                     city: 'Hamburg',
                                     state: 'MI',
                                     zip: '48139',
                                     address_type: 'P' },
                          phone: { area_code: '810',
                                   local_number: '2499010' } }
  end

  # General Functionality Tests

  test 'query() method successfully returns an HL7 V2 Message' do
    VCR.use_cassette('query_returns_v2') do
      v2_response_body = IisShcIssuer::QBPClient.query({})
      assert_instance_of(HL7::Message, v2_response_body)
    end
  end

  test 'raises error if inputted sandbox credentials are incorrectly formatted' do
    user_sandbox_credentials = { username: 'test_user', password: 'test_password', facilityID: 'test_facilityID' }
    missing_credential = user_sandbox_credentials.except(:password)
    assert_raises IisShcIssuer::InvalidSandboxCredentialsError do
      IisShcIssuer::QBPClient.query({}, missing_credential)
    end

    non_string_credential = user_sandbox_credentials
    non_string_credential[:password] = 1
    assert_raises IisShcIssuer::InvalidSandboxCredentialsError do
      IisShcIssuer::QBPClient.query({}, non_string_credential)
    end
  end

  # Client Connectivity Tests

  test 'Connectivity Test raises no errors (Successfully connected to IIS Sandbox endpoint)' do
    VCR.use_cassette('connectivity_test') do
      service_def = 'lib/assets/service.wsdl'
      client = Savon.client(wsdl: service_def,
                            endpoint: "#{Rails.application.config.iisSandboxHost}/iis-sandbox/soap",
                            pretty_print_xml: true)
      assert_nothing_raised do
        IisShcIssuer::QBPClient.check_client_connectivity(client) if client.operations.include?(:connectivity_test)
      end
    end
  end

  # SOAP Faults

  test 'SOAP FAULT: SecurityFault - bad credentials' do
    VCR.use_cassette('soap_fault_bad_credentials') do
      user_sandbox_credentials = { username: 'mitre', password: 'bad_password', facilityID: 'MITRE Healthcare' }
      assert_raises IisShcIssuer::SOAPError do
        IisShcIssuer::QBPClient.query({}, user_sandbox_credentials)
      end
    end
  end

  test 'SOAP FAULT: Unknown fault - generic error' do
    # NOTE: This functionality may be updated within the IIS Sandbox, according to recent conversation with Nathan
    # Currently, this throws the same exception as the above "Security Fault"
    VCR.use_cassette('soap_fault_generic_error') do
      user_sandbox_credentials = { username: 'NPE', password: 'NPE', facilityID: 'MITRE Healthcare' }
      assert_raises IisShcIssuer::SOAPError do
        IisShcIssuer::QBPClient.query({}, user_sandbox_credentials)
      end
    end
  end

  # Response Error Cases
  #   NOTE: We currently use a locally downloaded version of the correctly implemented WSDL file,
  #   so we will not have to worry about poorly formatted responses for our use case

  # Check Response Statuses

  test 'Status of OK - "Data found, no errors" is returned for valid patient with all fields specified' do
    VCR.use_cassette('ok_status_all_fields') do
      response = IisShcIssuer::QBPClient.query(@complete_patient)
      status = IisShcIssuer::QBPClient.get_response_status(response)
      assert_equal(:OK, status)
    end
  end

  test 'Status of OK - "Data found, no errors" is returned for valid patient with minimum fields specified' do
    VCR.use_cassette('ok_status_min_fields') do
      minimal_data_patient = @complete_patient.slice(:patient_name, :patient_dob)
      minimal_data_patient[:patient_name] = minimal_data_patient[:patient_name].slice(:family_name, :given_name)
      response = IisShcIssuer::QBPClient.query(minimal_data_patient)
      status = IisShcIssuer::QBPClient.get_response_status(response)
      assert_equal(:OK, status)
    end
  end

  test 'Patient not in sandbox returns a response status of NF - "No data found, no errors"' do
    VCR.use_cassette('nf_status') do
      missing_patient = { patient_name: { family_name: 'Not In Sandbox', given_name: 'Patient' },
                          patient_dob: '20200101' }
      response = IisShcIssuer::QBPClient.query(missing_patient)
      status = IisShcIssuer::QBPClient.get_response_status(response)
      assert_equal(:NF, status)
    end
  end

  test 'Patient without required data fields returns a response status of AE - "Application Error"' do
    VCR.use_cassette('ae_status') do
      response = IisShcIssuer::QBPClient.query({})
      status = IisShcIssuer::QBPClient.get_response_status(response)
      assert_equal(:AE, status)
    end
  end

  test 'Unspecific query returns Z31 profile indicating that one or more low confidence matches are found' do
    VCR.use_cassette('z31_returned') do
      duplicate_patient = @complete_patient.deep_dup
      # NOTE: This is a specialized query built into the sandbox that allows for the return of a Z31 multi-match profile
      # I was unable to trigger this response manually by uploading similar patients into the sandbox.
      duplicate_patient[:patient_name][:second_or_further_names] = 'Multi'
      response = IisShcIssuer::QBPClient.query(duplicate_patient)
      profile = response[:MSH][20]
      assert_equal('Z31^CDCPHINVS', profile)
      status = IisShcIssuer::QBPClient.get_response_status(response)
      assert_equal(:TM, status)
    end
  end

  # # WARNING: Running tests with this test uncommented could change sandbox data and cause other tests to fail
  # # Temporary Test to upload a patient
  # test 'Uploading a patient' do
  #   IisShcIssuer::QBPClient.upload_patient() #Enter VXU Upload fixture path parameter here
  # end
end