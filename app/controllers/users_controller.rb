class UsersController < ApplicationController

  def index
  end

  def show
    render json: {test: "Hello World!"}
  end

  def create
    render json: {test: "Hello World"}
  end

  def update
    render json: {test: "Hello World"}
  end

  def destroy
    render json: {test: "Hello World"}
  end

  private 

    def user_params
      params.require(:user).permit(:name)
    end
end
