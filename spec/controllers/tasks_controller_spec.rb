require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  login
  cancan_access

  let(:project) { create :project, user: @user }
  let(:task_attr) { attributes_for :task, project_id: project.id }
  let(:task) { create :task }
  

  describe "With permission from cancan" do

  	before(:each) do
  		@ability.can :manage, :all
  	end

  	#it "GET #index can assign @tasks" do
	      #get :index, format: :json, project_id: project.id
	      #expect(assigns(:tasks)).not_to be_nil
	    #end

    it "POST #create creates new task" do
      post :create, format: :json, project_id: project.id, task: task_attr
      expect(Task.where(title: task_attr[:title]).count).to be 1
    end

    it "PATCH #update changes task" do
      patch :update, format: :json, id: task.id, task: task_attr
      expect(Task.where(title: task_attr[:title]).count).to be 1
    end

    it "DELETE #destroy deletes task" do
      delete :destroy, format: :json, id: task.id
      expect(Task.find_by_id(task.id)).to be_nil
    end

  end

  describe "Without permission from cancan" do

  	before(:each) do
  		@ability.cannot :manage, :all
  	end

  	#context "GET #index cannot get @tasks" do
      #before do
        #get :index, format: :json, project_id: project.id, project_id: project.id
      #end
      #it { expect(response).to be_forbidden }
    #end

    context "POST #create cannot create task" do
      before do
        post :create, format: :json, project_id: project.id, task: task_attr
      end
      it { expect(response).to be_forbidden }
    end

    context "PATCH #update cannot change task" do
      before do
        patch :update, format: :json, id: task.id, task: task_attr
      end
      it { expect(response).to be_forbidden }
    end
  end

    context "DELETE #destroy cannot delete task" do
      before do
        delete :destroy, format: :json, id: task.id
      end
      it { expect(response).to be_forbidden }
    end
end
