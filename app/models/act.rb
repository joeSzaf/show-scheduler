class Act < ApplicationRecord
  validates :name, presence: true
  validates :contact_name, presence: true
  validates :contact_email, presence: true

  has_many :assignments
  has_many :shows, through: :assignments

end
