class Immunization
  load_xml = ->(filename) { Nokogiri::XML(File.open(Rails.root.join('app', 'assets', filename))) }

  GROUPS = load_xml.call('iisstandards_vax2vg.xml').freeze
  TRADENAMES = load_xml.call('iisstandards_tradename.xml').freeze

  attr_reader :occurrence, :lot_number, :vaccine, :vaccinator, :vaccine_group

  def initialize(fhir_immunization)
    @occurrence = FhirHelper.from_fhir_time(fhir_immunization.occurrenceDateTime)
    @lot_number = fhir_immunization.lotNumber
    code = fhir_immunization.vaccineCode&.coding&.first&.code
    @vaccine = lookup_vaccine_display(code)
    @vaccinator = fhir_immunization.performer&.first&.actor&.display
    @vaccine_group = find_vax_group(code)
  end

  private

  def find_vax_group(code)
    GROUPS.at_xpath(
      "//VGCodes/CVXVGInfo[Value[2]=concat('#{code}', ' ')]/Value[4]/text()"
    ).to_s
  end

  def lookup_vaccine_display(cvx)
    return unless cvx

    display_name = TRADENAMES.xpath(
      "//productnames/prodInfo[Value[3]=concat('#{cvx}', ' ')]/Value[1]/text()"
    )
    if !display_name.empty? && (display_name.length == 1)
      # use CDC product name if single match
      display_name.to_s
    else
      # if multiple or no match in tradenames, use first CVX short description from vaccine groups
      display_name = GROUPS.at_xpath(
        "(//VGCodes/CVXVGInfo[Value[2]=concat('#{cvx}', ' ')]/Value[1]/text())[1]"
      )
      display_name.nil? ? "CVX #{cvx}" : display_name.to_s
    end
  end
end
