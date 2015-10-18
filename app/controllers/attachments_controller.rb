class AttachmentsController < ApplicationController
  load_and_authorize_resource :comment
  load_and_authorize_resource through: :comment

  def index
    render json: @attachments
  end

  def create
    attachment = @comment.attachments.create(file: params[:file])
    render json: attachment
  end

end
