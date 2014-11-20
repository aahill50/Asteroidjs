Asteroidjs::Application.routes.draw do
  root to: 'games#show'
  resource :game, only: :show
end
