class Immunization
  class << self
    @tradenames = nil

    def tradenames
      @tradenames ||= load_tradenames
    end

    def load_tradenames
      f = File.open(Rails.root.join('app', 'assets', 'iisstandards_tradename.xml'))
      @tradenames = Nokogiri::XML(f)
    end
  end

  def initialize(fhir_immunization)
    @fhir_immunization = fhir_immunization
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
    coding.nil? ? '' : lookup_vaccine_display(coding.code)
  end

  def vaccinator
    @fhir_immunization.vaccineCode ||= FHIR::CodeableConcept.new
    performer = @fhir_immunization.performer.try(:first)
    performer.nil? ? '' : (performer.actor.try(:display) || '')
  end

  def vaccine_code
    @fhir_immunization.vaccineCode ||= FHIR::CodeableConcept.new
    coding = @fhir_immunization.vaccineCode.coding.try(:first)
    coding.nil? ? '' : coding.code
  end

  private

  def from_fhir_time(time_string)
    Date.parse(time_string).strftime('%m/%d/%Y') if time_string.present?
  end

  def lookup_vaccine_display(cvx)
    display_name = Immunization.tradenames.at_xpath(
      "//productnames/prodInfo[Value[3]=concat('#{cvx}', ' ')]/Value[1]/text()"
    )
    display_name.nil? ? "CVX #{cvx}" : display_name.to_s
  end
end
