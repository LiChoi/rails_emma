# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_16_171931) do

  create_table "cross_allergies", force: :cascade do |t|
    t.text "cross_allergy"
    t.integer "drug_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["drug_id"], name: "index_cross_allergies_on_drug_id"
  end

  create_table "drugs", force: :cascade do |t|
    t.text "chemicalName"
    t.text "drug_class"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "interactions", force: :cascade do |t|
    t.text "tag"
    t.text "tag_type"
    t.text "effect"
    t.text "severity"
    t.integer "drug_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["drug_id"], name: "index_interactions_on_drug_id"
  end

  create_table "trade_names", force: :cascade do |t|
    t.text "trade_name"
    t.integer "drug_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["drug_id"], name: "index_trade_names_on_drug_id"
  end

  add_foreign_key "cross_allergies", "drugs"
  add_foreign_key "interactions", "drugs"
  add_foreign_key "trade_names", "drugs"
end
