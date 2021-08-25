class Patient
  attr_reader :full_name, :birth_date

  def initialize(fhir_patient)
    name = fhir_patient.name&.first
    @full_name = [name&.given, name&.family].compact.join('/')
    @birth_date = FhirHelper.from_fhir_time(fhir_patient.birthDate)
  end

  private

  def name(fhir_patient)
    fhir_patient.name.&first
  end
end
