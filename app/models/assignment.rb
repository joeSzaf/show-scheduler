class Assignment < ApplicationRecord
  validates :duration, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 9001 }

  belongs_to :act
  belongs_to :show

end
