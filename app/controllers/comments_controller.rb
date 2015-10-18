class CommentsController < ApplicationController
  load_and_authorize_resource :task
  load_and_authorize_resource through: :task, shallow: true

  def index
    render json: @comments
  end

  def update
    @comment.update_attributes(comment_params)
    render json: @comment
  end

  def create
    @comment = @task.comments.create(comment_params)
    render json: @comment
  end

  def destroy
    @comment.destroy
    render json: { nothing: true }
  end

  private

  def comment_params
    params.require(:comment).permit(:text, :task_id)
  end
end
