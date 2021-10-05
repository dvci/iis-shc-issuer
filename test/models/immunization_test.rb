# frozen_string_literal: true

require 'test_helper'

class ImmunizationTest < ActiveSupport::TestCase
  test 'lookup_vaccine_display with single tradename' do
    imm_model = Immunization.new(FHIR.from_contents(File.read('test/fixtures/files/immunization.json')))
    assert_equal 'Moderna COVID-19 Vaccine (non-US Spikevax)', imm_model.vaccine
  end

  test 'lookup_vaccine_display without tradename' do
    imm_model = Immunization.new(FHIR.from_contents(File.read('test/fixtures/files/immunization_no_tradename.json')))
    assert_equal 'COVID-19 Non-US Vaccine, Product Unknown', imm_model.vaccine
  end

  test 'lookup_vaccine_display multiple tradenames' do
    imm_model = Immunization.new(FHIR.from_contents(File.read('test/fixtures/files/immunization_multiple_tradenames.json')))
    assert_equal 'Hep B, adult', imm_model.vaccine
  end

  test 'lookup_vaccine_display unknown cvx' do
    imm_model = Immunization.new(FHIR.from_contents(File.read('test/fixtures/files/immunization_invalid_cvx.json')))
    assert_equal 'CVX 0', imm_model.vaccine
  end
end