class ProjectsController < ApplicationController
  load_and_authorize_resource

  def index
    render json: @projects
  end

  def update
    @project.update_attributes(project_params)
    render json: @project
  end

  def create
    @project = current_user.projects.create(project_params)
    render json: @project
  end

  def destroy
    @project.destroy
    render json: { nothing: true }
  end
  private

  def project_params
    params.require(:project).permit(:title, :position)
  end
end
