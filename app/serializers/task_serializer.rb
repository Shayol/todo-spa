class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :position, :done, :deadline

  has_many :comments
end
