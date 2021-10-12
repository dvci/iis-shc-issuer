class SearchForm

  ADMIN_SEX = %w[A F M N O U]

  attr_reader(*QueryParameters.all)

  def initialize(params)
    @patient_name = hash_or_nil(params.slice(:family_name, :given_name))
    @patient_dob = params[:patient_dob]
    phone = Phonelib.parse(params[:phone])
    @phone = hash_or_nil(area_code: phone.area_code, local_number: phone.local_number)
    @admin_sex = params[:sex] if ADMIN_SEX.include?(params[:sex])
    @address = hash_or_nil(params.slice(:street, :city, :state, :zip))
    @id = params[:id]
  end

  def to_query
    as_json.deep_symbolize_keys.compact
  end

  private

  def hash_or_nil(hash)
    hash.compact!
    hash.empty? ? nil : hash
  end
end
