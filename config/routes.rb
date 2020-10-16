Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'interactions/index'
      post 'interactions/create'
      get 'interactions/show'
      delete 'interactions/destroy/:id', to: 'interactions#destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'cross_allergies/index'
      post 'cross_allergies/create'
      get 'cross_allergies/show'
      delete 'cross_allergies/destroy/:id', to: 'cross_allergies#destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'trade_names/index'
      post 'trade_names/create'
      get 'trade_names/show'
      delete 'trade_names/destroy/:id', to: 'trade_names#destroy'
    end
  end
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
