class ProjectsController < ApplicationController
  def index
    @projects = Project.all ## current user
    render json: @projects
  end
  def show
    render json: @project
  end

  def update
    @project.update_attributes(project_params)
    render json: @project
  end

  def create
    @project = Project.create(project_params)  ## current user
    redirect_to project_path(@project, format: :json)
  end

  def destroy
    @project.destroy
    render json: { nothing: true }
  end
  private

  def project_params
    params.require(:project).permit(:title)
  end
end
