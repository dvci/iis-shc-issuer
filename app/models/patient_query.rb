class PatientQuery
  include ActiveModel::Model

  validates :phone, phone: true, allow_blank: true
  validates :sex, inclusion: { in: %w[A F M N O U], allow_blank: true }

  attr_reader(*QueryParameters.all)

  QueryParameters[:required].each do |attribute|
    validates attribute, presence: true
  end

  def attributes
    {
      'phone' => nil
    }
  end

  def initialize(params)
    @patient_name = hash_or_nil(params.slice(:family_name, :given_name))
    @patient_dob = params[:patient_dob]
    phone = Phonelib.parse(params[:phone])
    @phone = hash_or_nil(area_code: phone.area_code, local_number: phone.local_number)
    @admin_sex = params[:sex]
    @address = hash_or_nil(params.slice(:street, :city, :state, :zip))
    @id = params[:id]
  end

  def to_query
    as_json.compact
  end

  private

  def hash_or_nil(hash)
    hash.compact!
    hash.empty? ? nil : hash
  end
end
