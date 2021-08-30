config = Rails.application.config_for(:search_form)
Phonelib.default_country = 'US'

# params = {optional: [], required: []}
PatientParameters = Struct.new(:optional, :required, keyword_init: true) do
  def all
    optional + required
  end
end
# These are used in the search form for each field
SearchParameters = PatientParameters.new(optional: [], required: [])

# These are used to build the V2 query to account for compound fields (e.g. name, address)
QueryParameters = PatientParameters.new(optional: [], required: [])
# byebug
config.attributes.each do |att|
  name = att.is_a?(String) ? att : att.keys.first
  values = att.is_a?(String) ? att : att.values

  if config.required.include?(name.to_s)
    SearchParameters[:required] << values
    QueryParameters[:required] << name
  else
    SearchParameters[:optional] << values
    QueryParameters[:optional] << name
  end
end

SearchParameters[:optional].flatten!
SearchParameters[:required].flatten!

QueryParameters.freeze
SearchParameters.freeze
