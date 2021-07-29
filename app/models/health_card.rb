class HealthCard
  attr_accessor :patient, :immunizations, :qr_codes

  def initialize
    @immunizations = []
    @qr_codes = []
  end
end
