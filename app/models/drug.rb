class Drug < ApplicationRecord
    has_many :tradeNames
    has_many :cross_allergies
end
