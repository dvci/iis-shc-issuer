class PatientControllerTest < ActionDispatch::IntegrationTest
  test 'search for patient_not_found' do
    params = { given_name: 'Bob', family_name: 'Loblaw', patient_dob: '20000101' }
    VCR.use_cassette('patient_search_not_found') do
      get search_path, params: params
    end

    assert_response :not_found
  end

  test 'search for patients with multiple matches' do
    params = { given_name: 'Latrice', family_name: 'MorrisAIRA', patient_dob: '20170817' }
    VCR.use_cassette('patient_search_multi') do
      get search_path, params: params
      assert_response :unprocessable_entity
    end
  end

  test 'list required and optional fields' do
    get patient_form_path
    assert_response :success
  end

  test 'search without required parameter' do
    params = { given_name: 'VallisAIRA', family_name: 'RogersAIRA' }
    get search_path, params: params
    assert_response :unprocessable_entity
  end

  test 'search for patient' do
    params = { given_name: 'VallisAIRA', family_name: 'RogersAIRA', patient_dob: '20160715' }
    VCR.use_cassette('patient_search') do
      get search_path, params: params
    end

    assert_response :ok

    bundle = FHIR.from_contents(session[:fhir_bundle])
    assert bundle.is_a?(FHIR::Bundle)
    resources = bundle.entry.map(&:resource)
    assert_equal 3, resources.length

    patient = resources[0]
    assert patient.is_a?(FHIR::Patient)
    name = patient.name.first
    assert_equal params[:given_name], name.given&.first
    assert_equal params[:family_name], name.family
    assert_equal params[:patient_dob], patient.birthDate

    resources[1, 2].each { |imm| assert imm.is_a?(FHIR::Immunization) }
  end

  test 'search for patient with additional information' do
    params = { given_name: 'VallisAIRA', family_name: 'RogersAIRA', patient_dob: '20160715', street: '1371 Kongeradeel Ave',
               city: 'Quincy', state: 'MI', zip: '49082', mothers_maiden_name: 'BellAIRA', name_code: 'M',
               phone: '5175138248', sex: 'M' }

    VCR.use_cassette('patient_search') do
      get search_path, params: params
    end

    assert_response :ok

    bundle = FHIR.from_contents(session[:fhir_bundle])
    assert bundle.is_a?(FHIR::Bundle)
    resources = bundle.entry.map(&:resource)
    assert_equal 3, resources.length

    patient = resources[0]

    assert patient.is_a?(FHIR::Patient)
    name = patient.name.first
    address = patient.address
    assert_equal params[:given_name], name.given&.first
    assert_equal params[:family_name], name.family
    assert_equal params[:patient_dob], patient.birthDate

    resources[1, 2].each { |imm| assert imm.is_a?(FHIR::Immunization) }
  end
end
