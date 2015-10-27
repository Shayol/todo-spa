module FeatureMacros
  def register_user(user)
    visit '/#/sign-in'
    fill_in 'email', :with => user.email
    fill_in 'password', :with => user.password
    click_button 'Sign in' 
  end

  #def register_user(user)
    #user = create(:user)
    #user.confirmed_at = Time.now
    #user.save
    #login_as(user, :scope => :user)
    #user
  #end
end