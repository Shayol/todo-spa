class AttachmentsController < ApplicationController
  before_action :find_comment

  def index
    @attachments = @comment.attachments.all
    render json: @attachments
  end

  def create
    attachment = @comment.attachments.create(file: params[:file])
    render json: attachment
  end

  private
  def find_comment
    @comment = Comment.find(params[:comment_id])
  end
end
