require 'rails_helper'

RSpec.feature "Comments", js: true do

  given(:user) { create :user }
  given(:project) { create :project, user: user }
  given(:task) { create :task, project: project }
  given!(:comment) { create :comment, task: task }
  give(:comment_attr) { attributes_for :comment}


  scenario "User can create comment for task" do
    register_user(user)
    find(".fa-comment").click
    click_button "Add comment"
    find(".comment").first("input").set(comment_attr[:text])
    click_button "Add comment"
  end

  scenario "User can delete comment" do
    register_user(user)
    find(".fa-comment").click
    find(".comment-buttons").first(".fa-times").click
    expect(page).not_to have_content comment.text
  end

  scenario "User can edit comment" do
    register_user(user)
    find(".fa-comment").click
    within "comment" do
      find(".editable").click
      find(".editable-input").set(comment_attr[:text])
      find(".editable-buttons").first("button").click
    end
    expect(page).to have_content comment_attr[:text]
  end
end