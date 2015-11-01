class Task < ActiveRecord::Base
  belongs_to :project
  has_many :comments, dependent: :destroy

  validates :title, :project, presence: true

  default_scope -> { order('position ASC') }

  after_create do
    lowest_position = project.tasks.pluck(:position).max
    increment!(:position, (lowest_position+1))
  end  

end

