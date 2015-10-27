require 'rails_helper'

RSpec.feature "Projects", js: true do

  given(:user) { create :user }
  given!(:project) { create :project, user: user }
  given(:project_attr) { attributes_for :project }

  scenario "User can see the list of projects" do
    register_user(user)
    expect(page).to have_content project[:title]
  end

  scenario "User can create new project" do
    register_user(user)
    click_link "Add TODO project"
    fill_in "new_project_title", with: project_attr[:title]
    click_button "Create project"
    #expect(page).to redirect_to "/#/projects"
    expect(page).to have_content project_attr[:title]
  end


  scenario "User can edit project's title" do
    register_user(user)
    within(".project-header") do
      find(".project-title").click
      find(".editable-input").set(project_attr[:title])
      find(".editable-buttons").first("button").click
    end
    expect(page).to have_content project_attr[:title]
  end

  scenario "User can delete project" do
    register_user(user)
    project_title = project[:title]
    find("#project_row_#{project.id}").find(".fa-trash").click
    expect(page).not_to have_content project_title
  end
end