class Drug < ApplicationRecord
    has_many :tradeNames, dependent: :destroy
    has_many :cross_allergies, dependent: :destroy
    has_many :interactions, dependent: :destroy
end
