class Patient
  include ActiveModel::Model
  include ActiveModel::Serializers::JSON

  def initialize(fhir_patient)
    @fhir_patient=fhir_patient
    @full_name = full_name
    @given = given
    @family = family
    @birth_date = birth_date
  end

  def attributes
    {'full_name' => @full_name,
      'given' => @given,
      'family' => @family,
      'birth_date' => @birth_date
    }
  end

  def full_name
    [family, given].join('/') if given || family
  end

  def given    
    first_name.given.join(" ") || first_name.text
  end

  delegate :family, to: :first_name

  def birth_date
    from_fhir_time(@fhir_patient.birthDate)
  end

  private

  def first_name
    @fhir_patient.name << FHIR::HumanName.new if @fhir_patient.name.empty? 
    @fhir_patient.name[0]
  end

  def from_fhir_time(time_string)
    Date.parse(time_string).strftime('%m/%d/%Y') if time_string.present?
  end
end