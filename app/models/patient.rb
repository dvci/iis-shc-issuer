class Patient
  def initialize(fhir_patient)
    @fhir_patient = fhir_patient
  end

  def full_name
    [family, given].join('/') if given || family
  end

  def given
    first_name.given.join(' ') || first_name.text
  end

  delegate :family, to: :first_name

  def birth_date
    FhirHelper.from_fhir_time(@fhir_patient.birthDate)
  end

  private

  def first_name
    @fhir_patient.name << FHIR::HumanName.new if @fhir_patient.name.empty?
    @fhir_patient.name[0]
  end
end
