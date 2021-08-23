module FhirHelper
  def self.from_fhir_time(time_string)
    Date.parse(time_string).strftime('%m/%d/%Y') if time_string.present?
  end
end
