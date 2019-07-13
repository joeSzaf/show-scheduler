class ActSerializer < ActiveModel::Serializer
  attributes :id, :name, :contact_name, :contact_email, :description, :archived
end
