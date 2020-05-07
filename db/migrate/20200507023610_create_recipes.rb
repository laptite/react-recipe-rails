class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.text :ingredients
      t.text :directions
      t.text :notes
      t.string :image, default: 'https://user-images.githubusercontent.com/4002284/81347207-87f5ef00-9070-11ea-9189-e82c2875c02a.png'

      t.timestamps
    end
  end
end
