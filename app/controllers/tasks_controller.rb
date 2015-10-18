class TasksController < ApplicationController
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project, shallow: true

  def index
    render json: @tasks
  end

  def update
    @task.update_attributes(task_params)
    render json: @task
  end

  def create
    @task = @project.create(task_params)
    render json: @task
  end

  def destroy
    @task.destroy
    render json: { nothing: true }
  end

  private
  def task_params
    params.require(:task).permit(:title, :position, :project_id, :done, :deadline)
  end
end
