Asteroidjs::Application.routes.draw do
  root to: 'scores#index'
  resources :scores, only: [:index, :create, :update]
  
  namespace :api, defaults: { format: :json } do
    resources :scores, only: [:index, :create, :update]
  end
end
