# frozen_string_literal: true

require 'test_helper'
require 'iis_shc_issuer/profile_errors'
require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = 'test/vcr_cassettes/iis_shc_issuer/profile_errors_test'
  config.hook_into :webmock
end

class ProfileErrorsTest < ActiveSupport::TestCase
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

  # Response Error Cases
  #   NOTE: We currently use a locally downloaded version of the correctly implemented WSDL file,
  #   so we will not have to worry about poorly formatted responses for our use case

  # Check Response Statuses

  test 'Status of OK - "Data found, no errors" is returned for valid patient with all fields specified' do
    VCR.use_cassette('ok_status_all_fields') do
      response = IisShcIssuer::QBPClient.query(@complete_patient)
      status = IisShcIssuer::ProfileErrors.get_response_status(response)
      assert_equal(:OK, status)
    end
  end

  test 'Status of OK - "Data found, no errors" is returned for valid patient with minimum fields specified' do
    VCR.use_cassette('ok_status_min_fields') do
      minimal_data_patient = @complete_patient.slice(:patient_name, :patient_dob)
      minimal_data_patient[:patient_name] = minimal_data_patient[:patient_name].slice(:family_name, :given_name)
      response = IisShcIssuer::QBPClient.query(minimal_data_patient)
      status = IisShcIssuer::ProfileErrors.get_response_status(response)
      assert_equal(:OK, status)
    end
  end

  test 'Patient not in sandbox returns a response status of NF - "No data found, no errors"' do
    VCR.use_cassette('nf_status') do
      missing_patient = { patient_name: { family_name: 'Not In Sandbox', given_name: 'Patient' },
                          patient_dob: '20200101' }
      response = IisShcIssuer::QBPClient.query(missing_patient)
      status = IisShcIssuer::ProfileErrors.get_response_status(response)
      assert_equal(:NF, status)
    end
  end

  test 'Patient without required data fields returns a response status of AE - "Application Error"' do
    VCR.use_cassette('ae_status') do
      response = IisShcIssuer::QBPClient.query({})
      status = IisShcIssuer::ProfileErrors.get_response_status(response)
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
      status = IisShcIssuer::ProfileErrors.get_response_status(response)
      assert_equal(:TM, status)
    end
  end
end
