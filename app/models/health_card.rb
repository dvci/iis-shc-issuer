class HealthCard
  include ActiveModel::Model
  attr_accessor :patient, :immunizations, :qrCodes

  def initialize
    @immunizations = []
    @qrCodes = []
  end
end