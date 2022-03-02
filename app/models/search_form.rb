class SearchForm
  ADMIN_SEX = %w[A F M N O U].freeze

  attr_reader(*QueryParameters.all)

  # Attribute name must match the key name expected by V2MessageBuilder as
  # the hash is generated in to_query using attribute names
  def initialize(params)
    @patient_name = hash_or_nil(params.slice(:family_name, :given_name))
    @patient_dob = params[:patient_dob]
    @phone = hash_or_nil(params.slice(:area_code, :local_number))
    @admin_sex = params[:sex] if ADMIN_SEX.include?(params[:sex])
    @address = hash_or_nil(params.slice(:street, :city, :state, :zip))
    @id = params[:id]
    maiden_name_params = params.slice(:maiden_name, :name_given, :name_type_code)
    @mothers_maiden_name = modify_maiden_name_keys(maiden_name_params)
  end

  def to_query
    as_json.deep_symbolize_keys.compact
  end

  private

  def hash_or_nil(hash)
    hash.compact!
    hash.empty? ? nil : hash
  end

  def modify_maiden_name_keys(maiden_name_params)
    maiden_name_params[:family_name] = maiden_name_params.delete :maiden_name
    maiden_name_params[:given_name] = maiden_name_params.delete :name_given
    hash_or_nil(maiden_name_params)
  end
end
