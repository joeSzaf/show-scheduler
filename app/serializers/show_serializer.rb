class ShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_time, :duration, :description
end
