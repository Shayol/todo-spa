require 'rails_helper'

RSpec.feature "Attachments", js: true do

  given!(:user) { create :user }
  given!(:project) { create :project, user: user }
  given!(:task) { create :task, project: project }
  given!(:comment) { create :comment, task: task }
  given!(:attachment) { create :attachment, comment: comment }

  scenario "User can see attachments" do
    register_user(user)
    find(".task-buttons").hover
    find(".fa-comment").click
    expect(page).to have_content attachment.file.url
  end
end