class TasksController < ApplicationController
  before_action :find_task
  def index
    render json: @tasks
  end

  def show
    render json: @task
  end

  def update
    @task.update_attributes(task_params)
    render json: @task
  end

  def create
    @task = @project.tasks.create(task_params)
    render json: @task
  end

  def destroy
    @task.destroy
    render json: { nothing: true }
  end

  private
  def find_task
    @task = Project.find(params[:project_id]).tasks.find(params[:id])
  end
  def task_params
    params.require(:task).permit(:title, :position, :project_id, :done, :deadline)
  end
end
