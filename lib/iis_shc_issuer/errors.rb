# frozen_string_literal: true

module IISSHCIssuer
  class IISSHCIssuerError < StandardError; end

  class QBPClientError < IISSHCIssuerError; end

  class V2ToFhirError < IISSHCIssuerError; end

  # Standard Errors

  class InvalidSearchError < StandardError
    def initialize(msg)
      super ("Query was contained missing or invalid parameters: #{msg}")
    end
  end

  # Errors Related to QBP Client for IIS-Sandbox

  # Exception thrown when an invalid payload is provided
  class InvalidSandboxCredentialsError < QBPClientError
    def initialize(msg = 'IIS Sandbox Credentials is missing a valid string username, password, or facilityID')
      super(msg)
    end
  end

  # Exception thrown when the client does not support the submitSingleMessage operation
  class OperationNotSupportedError < QBPClientError
    def initialize(msg = 'SOAP Client does not support the submitSingleMessage operation')
      super(msg)
    end
  end

  # Exception thrown when the SOAP client returns a SOAP fault
  class SOAPError < QBPClientError
    def initialize(msg = nil)
      if msg
        super("The following SOAP fault was returned by the client: #{msg}")
      else
        super('SOAP Fault returned by the client')
      end
    end
  end

  # Exception thrown when the SOAP client fails the connectivity test
  class BadClientConnectionError < QBPClientError
    def initialize(msg = 'Unable to establish a good connection with the SOAP client')
      super(msg)
    end
  end

  # Exception thrown when the response profile returned from the IIS sandbox is not recognized
  class UnrecognizedResponseProfileError < QBPClientError
    def initialize(msg = 'Response Profile returned from the sandbox is not recognized')
      super(msg)
    end
  end

  # Errors related to the V2 to FHIR Translator

  # Exception thrown when no patient is present in the V2 message
  class V2PatientNotFoundError < V2ToFhirError
    def initialize(msg = 'Unable to locate matching patient')
      super(msg)
    end
  end

  # Exception thrown when multiple patients are present in the V2 message
  class V2MultiplePatientsFoundError < V2ToFhirError
    def initialize(msg = 'Found more than one patient')
      super(msg)
    end
  end

  # Exception thrown when the Faraday call to the v2_to_fhir translator returns an error message
  class V2ParsingError < V2ToFhirError
    def initialize(msg = nil)
      if msg
        error_string = 'The following error message(s) were returned from the v2_to_fhir translator:'
        msg.each do |error|
          error_string += "\n#{error['message']}"
        end
        super(error_string)
      else
        super('Unable to parse the incoming HL7 V2 Message')
      end
    end
  end
end
