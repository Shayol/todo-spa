require 'rails_helper'

RSpec.feature "Signup", js: true do
  let(:user) { create :user }
  scenario "User can signup with email and password" do
    visit '/#/sign-up'
    fill_in "email", with: user.email
    fill_in "password", with: user.password
    fill_in "password_confirmation", with: user.password
    click_button "Register"
    expect(page).to have_content "Successfully logged in."
  end
end