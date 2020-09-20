class RenameDrugsClassColumn < ActiveRecord::Migration[6.0]
  def change
    rename_column :drugs, :class, :drug_class
  end
end
