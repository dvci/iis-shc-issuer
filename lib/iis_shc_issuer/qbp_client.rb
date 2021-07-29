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
  end
end
