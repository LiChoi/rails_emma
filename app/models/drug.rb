class Drug < ApplicationRecord
    has_many :tradeNames, dependent: :destroy
    has_many :cross_allergies, dependent: :destroy
end
