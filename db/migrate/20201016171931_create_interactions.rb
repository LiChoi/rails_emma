class CreateInteractions < ActiveRecord::Migration[6.0]
  def change
    create_table :interactions do |t|
      t.text :tag
      t.text :tag_type
      t.text :effect
      t.text :severity
      t.references :drug, null: false, foreign_key: true

      t.timestamps
    end
  end
end
