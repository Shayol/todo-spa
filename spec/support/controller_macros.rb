module ControllerMacros
  def login
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      @user = FactoryGirl.create(:user)
      sign_in @user
    end
  end

  def cancan_access
    before(:each) do
      @ability = Object.new
      @ability.extend(CanCan::Ability)
      allow(@controller).to receive(:current_ability).and_return(@ability)
    end
  end


end
