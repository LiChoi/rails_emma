class CreateTradeNames < ActiveRecord::Migration[6.0]
  def change
    create_table :trade_names do |t|
      t.text :trade_name
      t.references :drug, null: false, foreign_key: true

      t.timestamps
    end
  end
end
