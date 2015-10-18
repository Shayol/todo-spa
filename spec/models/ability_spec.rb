require 'rails_helper'
require "cancan/matchers"

describe "User" do
  describe "abilities" do
    let(:user)           { create :user }
    subject(:ability)    { Ability.new(user) }

    let(:project)        { create :project,   user: user }
    let(:task)           { create :task,      project: project }
    let(:comment)        { create :comment,   task: task }

    let(:dif_user)       {create :user}
    let(:dif_project)    {create :project,    user: dif_user}
    let(:dif_task)       {create :task,       project: dif_project}
    let(:dif_comment)    {create :comment,    task: dif_task}
    let(:dif_attachment) {create :attachment, comment: dif_comment}


    context "project" do
      it { should be_able_to :manage, Project.new(user: user) }
      it { should_not be_able_to :manage, Project.new(user: dif_user) }
    end

    context "task" do
      it { should be_able_to :manage, Task.new(project: project) }
      it { should_not be_able_to :manage, Task.new(project: dif_project) }
    end

    context "comment" do
      it { should be_able_to :manage, Comment.new(task: task) }
      it { should_not be_able_to :manage, Comment.new(task: dif_task) }
    end

    context "attachment" do
      it { should be_able_to :manage, Attachment.new(comment: comment) }
      it { should_not be_able_to :manage, Attachment.new(comment: dif_comment) }
    end
  end
end