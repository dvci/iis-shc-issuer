Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'landing_page#index'

  get '/', to: "landing_page#index"
  get '/search', to: 'patient#search'
  get '/health_card', to: 'health_card#create', as: :issue_vc

    # Keep at bottom:
    get '/*path', to: "landing_page#index"
end
