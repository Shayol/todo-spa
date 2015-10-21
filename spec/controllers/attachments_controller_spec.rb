require 'rails_helper'

RSpec.describe AttachmentsController, type: :controller do
  login
  cancan_access

  let(:project) { create :project, user: @user }
  let(:task) { create :task, project: project }
  let(:comment) { create :comment, task: task }
  before do
  	@file = fixture_file_upload('files/flower.jpg')
  end

  describe "With permission from cancan" do

  	before(:each) do
  		@ability.can :manage, :all
  	end

  	it "GET #index can assign @attachments" do
	     get :index, format: :json, comment_id: comment.id
	     expect(assigns(:attachments)).not_to be_nil
	   end

    #it "POST #create creates new attachment" do
      #post :create, format: :json, comment_id: comment.id, file: @file
      #expect(Attachment.count).to be 1
    #end
  end

  describe "With permission from cancan" do

  	before(:each) do
  		@ability.cannot :manage, :all
  	end
  	
	   context "GET #index cannot get @attachments" do
      before do
        get :index, format: :json, comment_id: comment.id
      end
      it { expect(response).to be_forbidden }
    end

	 end

end
