class Immunization
  load_xml = ->(filename) { Nokogiri::XML(File.open(Rails.root.join('app', 'assets', filename))) }

  GROUPS = load_xml.call('iisstandards_vax2vg.xml').freeze
  TRADENAMES = load_xml.call('iisstandards_tradename.xml').freeze

  def initialize(fhir_immunization)
    @fhir_immunization = fhir_immunization
  end

  def occurrence
    FhirHelper.from_fhir_time(@fhir_immunization.occurrenceDateTime)
  end

  def lot_number
    @fhir_immunization.lotNumber
  end

  def vaccine
    coding = @fhir_immunization.vaccineCode&.coding&.first
    coding.nil? ? '' : lookup_vaccine_display(coding.code)
  end

  def vaccinator
    performer = @fhir_immunization.performer&.first
    performer.nil? ? '' : (performer.actor&.display || '')
  end

  def vaccine_code
    coding = @fhir_immunization.vaccineCode&.coding&.first
    coding.nil? ? '' : coding.code
  end

  def vaccine_group
    vg = GROUPS.at_xpath(
      "//VGCodes/CVXVGInfo[Value[2]=concat('#{vaccine_code}', ' ')]/Value[4]/text()"
    )
    @vaccine_group ||= vg.nil? ? '' : vg.to_s
  end

  private

  def lookup_vaccine_display(cvx)
    display_name = TRADENAMES.at_xpath(
      "//productnames/prodInfo[Value[3]=concat('#{cvx}', ' ')]/Value[1]/text()"
    )
    if display_name.is_a? Nokogiri::XML::Text
      # use CDC product name if single match
      display_name.to_s
    else
      # else use short description
      display_name = TRADENAMES.at_xpath(
        "(//productnames/prodInfo[Value[3]=concat('#{cvx}', ' ')]/Value[2]/text())[1]"
      )
      display_name.nil? ? "CVX #{cvx}" : display_name.to_s
    end
  end
end
