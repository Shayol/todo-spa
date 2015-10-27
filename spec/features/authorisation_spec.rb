require 'rails_helper'

RSpec.feature "Authorization", js: true do
  given(:user) { create :user }

  scenario "User can sign in with email and password" do
    register_user(user)
    expect(page).to have_content "Successfully logged in."
  end

  scenario "User cannot signin in stranger's account" do
    first_user = create :user
    second_user = create :user
    visit '/#/sign-in'
    fill_in 'email', :with => first_user.email
    fill_in 'password', :with => '12345678'
    click_button 'Sign in' 
    expect(page).to have_content "Authentication failed"
  end

  scenario "User can sign out" do
    register_user(user)
    expect(page).to have_content "Successfully logged in."
    click_button "Sign out"
    expect(page).to have_content "Signed out successfully."
  end
end

