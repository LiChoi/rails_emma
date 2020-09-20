Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'drugs/index'
      post 'drugs/create'
      get '/show/:id', to: 'drugs#show'
      delete '/destroy/:id', to: 'drugs#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end