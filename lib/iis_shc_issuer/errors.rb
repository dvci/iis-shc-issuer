# frozen_string_literal: true

module IISSHCIssuer
  class IISSHCIssuerError < StandardError; end

  class QBPClientError < IISSHCIssuerError; end

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
end
