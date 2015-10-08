class ProjectsController < ApplicationController
  def index
    @projects = Project.all ## current user
    render json: @projects
  end
  def show
    render json: @project
  end

  def update
    @project=Project.find(params[:id])
    @project.update_attributes(project_params)
    render json: @project
  end

  def create
    @project = Project.create(project_params)  ## current user
    #redirect_to project_path(@project, format: :json)
    render json: @project
  end

  def destroy
    @project=Project.find(params[:id])
    @project.destroy
    render json: { nothing: true }
  end
  private

  def project_params
    params.require(:project).permit(:title, :position, :id)
  end
end
