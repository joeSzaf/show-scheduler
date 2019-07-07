class Show < ApplicationRecord
  validates :name, presence: true
  validates :start_time, presence: true
  validates :duration, presence: true

  has_many :assignments
  has_many :acts, through: :assignments

end
