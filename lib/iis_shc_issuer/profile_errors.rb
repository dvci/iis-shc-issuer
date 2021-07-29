# frozen_string_literal: true

module IISSHCIssuer
  # Handle Profile-specific Errors returned by the IIS Sandbox
  module ProfileErrors
    extend self

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
        raise IISSHCIssuer::OperationNotSupportedError
      end

      response_status
    end

    private

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
