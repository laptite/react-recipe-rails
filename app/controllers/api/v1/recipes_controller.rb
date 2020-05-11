class Api::V1::RecipesController < ApplicationController
  before_action :find_recipe, only: [:show, :edit, :update, :destroy]

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

  def edit
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

  def update
    if @recipe.update_attributes(recipe_params)
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
      params[:recipe].permit(:id, :name, :image, :ingredients, :directions, :notes, :created_at, :updated_at)
    end

    def find_recipe
      @recipe = Recipe.find(params[:id])
    end
end
