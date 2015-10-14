class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text

  has_many :attached_files
end
