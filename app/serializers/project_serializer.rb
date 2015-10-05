class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :position

  has_many :tasks
end
