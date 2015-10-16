class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead of :exception
  protect_from_forgery with: :null_session

  def default_serializer_options
    {root: false}
  end
end
