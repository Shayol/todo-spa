require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do
  login
  cancan_access
  let(:project_attr) { attributes_for :project }
  let(:project) { create :project }
  

  describe "With permission from cancan" do

  	before(:each) do
  		@ability.can :manage, :all
  	end

  	it "GET #index can assign @projects" do
	      get :index, format: :json
	      expect(assigns(:projects)).not_to be_nil
	    end

    it "POST #create creates new project" do
      post :create, format: :json, project: project_attr
      expect(Project.where(title: project_attr[:title]).count).to be 1
    end

    it "PATCH #update changes project" do
      patch :update, format: :json, id: project.id, project: project_attr
      expect(Project.where(title: project_attr[:title]).count).to be 1
    end

    it "DELETE #destroy deletes project" do
      delete :destroy, format: :json, id: project.id
      expect(Project.find_by_id(project.id)).to be_nil
    end

  end

  describe "Without permission from cancan" do

  	before(:each) do
  		@ability.cannot :manage, :all
  	end

  	context "GET #index cannot get @projects" do
      before do
        get :index, format: :json
      end
      it { expect(response).to be_forbidden }
    end

    context "POST #create cannot create project" do
      before do
        post :create, format: :json, project: project_attr
      end
      it { expect(response).to be_forbidden }
    end

    context "PATCH #update cannot change project" do
      before do
        patch :update, format: :json, id: project.id, project: project_attr
      end
      it { expect(response).to be_forbidden }
    end
  end

    context "DELETE #destroy cannot delete project" do
      before do
        delete :destroy, format: :json, id: project.id
      end
      it { expect(response).to be_forbidden }
    end


end
