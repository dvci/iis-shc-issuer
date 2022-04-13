# frozen_string_literal: true

require 'simplecov'
require 'webmock/minitest'

SimpleCov.start do
  enable_coverage :branch
  add_filter '/test/'
  add_filter '/config/'
end

if ENV['GITHUB_ACTIONS']
  require 'codecov'
  SimpleCov.formatter = SimpleCov::Formatter::Codecov
end

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    # parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
  end
end
