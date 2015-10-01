class ProjectsController < ApplicationController
  def index
    @projects = current_user.projects.all
    render json: @projects
  end
end
