class Api::V1::RecipesController < ApplicationController
  before_action :find_recipe, only: [:show, :destroy]

  def index
    @recipe = Recipe.all.order(created_at: :desc)
    render json: @recipe
  end

  def create
    @recipe = Recipe.create!(recipe_params)
    if @recipe
      render json: @recipe
    else
      render json: @recipe.errors
    end
  end

  def show
    if @recipe
      render json: @recipe
    else
      render json: @recipe.errors
    end
  end

  def destroy
    @recipe&.destroy
    render json: { message: 'Recipe has been deleted'}
  end

  private

    def recipe_params
      params[:recipe].permit(:name, :image, :ingredients, :directions, :notes)
    end

    def find_recipe
      @recipe = Recipe.find(params[:id])
    end
end
