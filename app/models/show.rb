class Show < ApplicationRecord
  validates :name, presence: true
  validates :start_time, presence: true
  validates :duration, presence: true

end
