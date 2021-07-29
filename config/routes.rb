Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'landing_page#index'

  post '/health_card', to: 'health_card#create', as: :issue_vc, format: :fhir_json
end
