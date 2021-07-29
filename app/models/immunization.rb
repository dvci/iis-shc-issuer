class Immunization
  include ActiveModel::Model
  include ActiveModel::Serializers::JSON

  def initialize(fhir_immunization)
    @fhir_immunization=fhir_immunization
    @occurrence = occurrence
    @vaccine = vaccine
    @lot_number = lot_number
    @vaccinator = vaccinator
  end

  def attributes
    {
      'occurrence' => @occurrence,
      'vaccine' => @vaccine,
      'lot_number' => @lot_number,
      'vaccinator' => @vaccinator
    }
  end

  def occurrence
    from_fhir_time(@fhir_immunization.occurrenceDateTime)
  end

  def lot_number
    @fhir_immunization.lotNumber
  end

  def vaccine
    @fhir_immunization.vaccineCode ||= FHIR::CodeableConcept.new
    coding = @fhir_immunization.vaccineCode.coding.try(:first)
    coding.nil? ? '' : 'CVX ' + coding.code
  end

  def vaccinator
    @fhir_immunization.vaccineCode ||= FHIR::CodeableConcept.new
    performer = @fhir_immunization.performer.try(:first)
    performer.nil? ? '' : (performer.actor.try(:display) || '')
  end

  private

  def from_fhir_time(time_string)
    Date.parse(time_string).strftime('%m/%d/%Y') if time_string.present?
  end
end