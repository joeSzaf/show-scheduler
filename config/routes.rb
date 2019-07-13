Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  resources :shows, only: [:index, :show, :new]
  resources :acts, only: [:index, :show, :new]

  namespace :api do
    namespace :v1 do
      resources :shows, only: [:index, :show, :create, :update]
      resources :acts, only: [:index, :show, :create, :update]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
