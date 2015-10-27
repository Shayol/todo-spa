require 'rails_helper'

RSpec.feature "Tasks", js: true do

  given(:user) { create :user }
  given(:project) { create :project, user: user }
  given!(:task) { create :task, project: project }
  given(:task_attr) { attributes_for :task }

  scenario "User can see tasks for her project" do
    register_user(user)
    expect(page).to have_content task.title
  end

  scenario "User can edit task" do
    register_user(user)
    within "#task_row_#{task.id}" do
      find(".task-title").click
      find(".editable-input").set(task_attr[:title])
      find(".editable-buttons").first("button").click
    end
    expect(page).to have_content task_attr[:title]
  end

  scenario "User can mark task as done" do
    register_user(user)
    check("Done")
    expect(find(".Done")).to be_checked
  end

  scenario "User can create new task" do
    register_user(user)
    find(".new-task-input").find("input").set(task_attr[:title])
    click_button "Add task"
    expect(page).to have_content task_attr[:title]
  end

  scenario "User can delete task" do
    register_user(user)
    find(".task-buttons").hover
    find(".fa-trash").click
    expect(page).not_to have_content task.title
  end
end