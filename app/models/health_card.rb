class HealthCard
  attr_accessor :patient, :immunizations, :qr_codes

  def initialize(fhir_bundle)
    @immunizations = []
    @qr_codes = []

    patient_entry = fhir_bundle.entry.find { |e| e.resource.is_a?(FHIR::Patient) }
    @patient = Patient.new(patient_entry.resource)

    immunization_entries = fhir_bundle.entry.select { |e| e.resource.is_a?(FHIR::Immunization) }
    @immunizations =
      immunization_entries.map { |immunization_entry| Immunization.new(immunization_entry.resource) }
    @immunizations.sort_by! { |i| Date.strptime(i.occurrence, '%m/%d/%Y') }
  end
end
