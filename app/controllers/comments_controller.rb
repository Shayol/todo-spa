class CommentsController < ApplicationController
  before_action :find_comment, except: [:create, :index]

  def index
    render json: @comments
  end

  def show
    render json: @comment
  end

  def update
    @comment.update_attributes(comment_params)
    render json: @comment
  end

  def create
    @task = Task.find(params[:task_id])
    comment = @task.comments.create(comment_params)
    redirect_to comment_path(comment, format: :json) ## why
  end

  def destroy
    @comment.destroy
    render json: { nothing: true }
  end

  private

  def find_comment
    @comment = Comment.find(params[:id])
  end
  def comment_params
    params.permit(:text, :id)  ## how without id ????
  end
end
