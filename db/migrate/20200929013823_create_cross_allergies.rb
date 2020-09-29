class CreateCrossAllergies < ActiveRecord::Migration[6.0]
  def change
    create_table :cross_allergies do |t|
      t.text :cross_allergy
      t.references :drug, null: false, foreign_key: true

      t.timestamps
    end
  end
end
