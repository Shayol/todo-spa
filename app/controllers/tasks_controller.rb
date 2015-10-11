class TasksController < ApplicationController
  before_action :find_task, except: [:create, :index]
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
    @task = Project.find(params[:project_id]).tasks.create(task_params)
    render json: @task
  end

  def destroy
    @task.destroy
    render json: { nothing: true }
  end

  private
  def find_task
    @task = Task.find(params[:id])
  end
  def task_params
    params.require(:task).permit(:title, :position, :project_id, :done, :deadline)
  end
end
