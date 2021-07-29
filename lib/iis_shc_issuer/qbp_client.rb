# frozen_string_literal: true

require 'savon'
require 'ruby-hl7'
require 'faraday'
require_relative 'qpd'

module IisShcIssuer
  # Send, receive, and translate HL7 V2 messages from the QBP client of the IIS sandbox
  module QBPClient
    extend self
    # Query a patient's Immunization history from the IIS Sandbox
    # @param patient_info [Hash] Patient demographic info sent from the IIS Consumer Portal
    # @param credentials [Hash] (optional) User Id, Password, and Facility Id for the IIS Sandbox login
    # @return [HL7::Message] The HL7 V2 Response message from the IIS-Sandbox
    def query(patient_info,
              sandbox_credentials = { username: Rails.application.config.username,
                                      password: Rails.application.config.password,
                                      facilityID: Rails.application.config.facilityID })
      raise IisShcIssuer::InvalidSandboxCredentialsError unless valid_credentials?(sandbox_credentials)

      service_def = 'lib/assets/service.wsdl'
      client = Savon.client(wsdl: service_def,
                            endpoint: "#{Rails.application.config.iisSandboxHost}/iis-sandbox/soap",
                            pretty_print_xml: true)
      # Check if client is configured properly
      raise IisShcIssuer::OperationNotSupportedError unless client.operations.include?(:submit_single_message)

      msg_input = IisShcIssuer::V2MessageBuilder.build_hl7_message(patient_info)

      begin
        response = client.call(:submit_single_message) do
          message(**sandbox_credentials, hl7Message: msg_input)
        end
      rescue Savon::Error => e
        fault_code = e.to_s
        raise IisShcIssuer::SOAPError, fault_code
      end

      raw_response_message = response.body[:submit_single_message_response][:return]
      response_segments = raw_response_message.to_s.split("\n")
      HL7::Message.new(response_segments)
    end

    # NOTE: This is a helper method to upload a patient to the IIS Sandbox and should be used for testing purposes only
    # Send a VXU message to the IIS Sandbox service to upload a patient
    # @param vxu_path [String] File Path where HL7 V2 VXU message is located
    def upload_patient(vxu_path = 'lib/assets/vxu_fixtures/vxu.hl7')
      # Define client
      service_def = 'lib/assets/service.wsdl'
      client = Savon.client(wsdl: service_def,
                            endpoint: "#{Rails.application.config.iisSandboxHost}/iis-sandbox/soap",
                            pretty_print_xml: true)
      # Upload Patient from fixture
      upload_raw_input = FILE.open(vxu_path).readlines
      upload_msg_input = HL7::Message.new(upload_raw_input)
      client.call(:submit_single_message) do
        message({ username: Rails.application.config.username,
                  password: Rails.application.config.password,
                  facilityID: Rails.application.config.facilityID,
                  hl7Message: upload_msg_input })
      end
    end

    # Methods That Parse HL7 V2 Message

    # Get the status of a response returned from the IIS Sandbox. Throw Errors for invalid responses.
    # @param msg_response [HL7::Message] The response message returned from an IIS Sandbox QBP Query
    # @return [Symbol] The status of the response from the IIS-Sandbox
    # Return Options:
    #   :OK = Data found, no errors (this is the default)
    #   :NF = No data found, no errors
    #   :AE = Application Error
    #   :TM = Too much data found
    def get_response_status(msg_response)
      # Get QAK.2 (Query Response Status)
      response_status = msg_response[:QAK][2].to_sym

      # Handle Errors for each profile that could be returned; modify response_status if necessary
      profile = msg_response[:MSH][20][0..2].to_sym
      case profile
      when :Z32
        handle_z32_errors(msg_response)
      when :Z31
        handle_z31_errors(msg_response)
        # Setting response status to :TM (Too much data found) to handle case where multiple mathces are returned.
        # Query Response Status (QAK) segment would not indicate the need to input more information in this scenario.
        response_status = :TM
      when :Z33
        handle_z33_errors(msg_response)
      else
        # TODO: Come up with request that can produce an unrecognized response profile
        # (this may require a flavor in the IIS Sandbox)
        raise IisShcIssuer::OperationNotSupportedError
      end

      response_status
    end

    # Methods that check for and handle errors

    def check_client_connectivity(client)
      begin
        response = client.call(:connectivity_test) do
          message echoBack: '?'
        end
      rescue Savon::Error => e
        fault_code = e.to_s
        raise IisShcIssuer::SOAPError, fault_code
      end
      conncectivity_response = response.body[:connectivity_test_response][:return]
      throw IisShcIssuer::BadClientConnectionError unless conncectivity_response == 'End-point is ready. Echoing: ?'
    end

    private

    def valid_credentials?(credentials)
      credentials.each do |_k, v|
        return false unless v.is_a? String
      end
      credentials.keys.sort == [:username, :password, :facilityID].sort
    end

    # Methods to Handle Profile Specific Errors

    # PROFILE Z32 RESPONSE PROFILE - RETURN COMPLETE IMMUNIZATION HISTORY
    def handle_z32_errors(_msg)
      # TODO: Handle RSP K11 Z32 test cases
      nil
    end

    # PROFILE Z31 - RETURN A LIST OF CANDIDATES PROFILE
    def handle_z31_errors(_msg)
      # TODO: Handle RSP K11 Z31 test cases
      nil
    end

    # PROFILE Z33 - RETURN AN ACKNOWLEDGEMENT WITH NO PERSON RECORDS (ERRORS)
    def handle_z33_errors(_msg)
      # TODO: Handle RSP K11 Z323 test cases
      nil
    end
  end
end
