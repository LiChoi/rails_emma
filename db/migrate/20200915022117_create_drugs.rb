class CreateDrugs < ActiveRecord::Migration[6.0]
  def change
    create_table :drugs do |t|
      t.text :chemicalName
      t.text :class

      t.timestamps
    end
  end
end
