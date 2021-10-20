class HealthCard
  attr_accessor :patient, :immunizations, :qr_codes, :shc

  def initialize(bundle:, issuer:, vaccine_group: 'COVID-19')
    patient_entry = bundle.entry.find { |e| e.resource.is_a?(FHIR::Patient) }

    @patient = Patient.new(patient_entry.resource)
    @immunizations = extract_immunizations(bundle, vaccine_group)

    card_type = vaccine_group == 'COVID-19' ? HealthCards::COVIDHealthCard : HealthCards::HealthCard

    jws = issuer.issue_jws(bundle, type: card_type)

    qr_codes = HealthCards::Exporter.qr_codes(jws)
    @qr_codes = qr_codes.chunks.map { |chunk| chunk.qrcode.data }

    @shc = HealthCards::Exporter.download([jws])
  end

  private

  def extract_immunizations(bundle, vaccine_group)
    immunization_entries = bundle.entry.select { |e| e.resource.is_a?(FHIR::Immunization) }
    immunizations =
      immunization_entries.map { |immunization_entry| Immunization.new(immunization_entry.resource) }
    immunizations.select! { |i| i.vaccine_group == vaccine_group }
    immunizations.sort_by! { |i| Date.strptime(i.occurrence, '%m/%d/%Y') }
    immunizations
  end
end
