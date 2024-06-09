Rails.application.routes.draw do
  root 'chatrooms#index'
  resources :chatrooms, only: [:index, :show] do
    resources :messages, only: [:create]
  end

  get 'pusher/config', to: 'pusher#config'
end
