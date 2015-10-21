require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
	login
  cancan_access

  let(:project) { create :project, user: @user }
  let(:task) { create :task, project: project }
  let(:comment) { create :comment, task: task }
  let(:comment_attr) { attributes_for :comment, task: task}
  

  describe "With permission from cancan" do

  	before(:each) do
  		@ability.can :manage, :all
  	end

  	#it "GET #index can assign @comments" do
	      #get :index, format: :json, project_id: project.id
	      #expect(assigns(:comments)).not_to be_nil
	    #end

    it "POST #create creates new comment" do
      post :create, format: :json, task_id: task.id, comment: comment_attr
      expect(Comment.where(text: comment_attr[:text]).count).to be 1
    end

    it "PATCH #update changes comment" do
      patch :update, format: :json, id: comment.id, comment: comment_attr
      expect(Comment.where(text: comment_attr[:text]).count).to be 1
    end

    it "DELETE #destroy deletes comment" do
      delete :destroy, format: :json, id: comment.id
      expect(Comment.find_by_id(comment.id)).to be_nil
    end

  end

  describe "Without permission from cancan" do

  	before(:each) do
  		@ability.cannot :manage, :all
  	end

  	#context "GET #index cannot get @comments" do
      #before do
        #get :index, format: :json, project_id: project.id, project_id: project.id
      #end
      #it { expect(response).to be_forbidden }
    #end

    context "POST #create cannot create comment" do
      before do
        post :create, format: :json, task_id: task.id, comment: comment_attr
      end
      it { expect(response).to be_forbidden }
    end

    context "PATCH #update cannot change comment" do
      before do
        patch :update, format: :json, id: comment.id, comment: comment_attr
      end
      it { expect(response).to be_forbidden }
    end

    context "DELETE #destroy cannot delete comment" do
      before do
        delete :destroy, format: :json, id: comment.id
      end
      it { expect(response).to be_forbidden }
    end
  end
end
