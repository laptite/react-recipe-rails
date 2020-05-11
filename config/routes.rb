Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get     'recipes/index'
      post    'recipes/create'
      get     '/edit/:id',      to: 'recipes#edit'
      get     '/show/:id',      to: 'recipes#show'
      put     '/update/:id',    to: 'recipes#update'
      delete  '/destroy/:id',   to: 'recipes#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
