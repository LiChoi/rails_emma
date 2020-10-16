class Api::V1::CrossAllergiesController < ApplicationController
  def index
  end

  def create
    cross_allergy = CrossAllergy.create(cross_allergy_params)
    if cross_allergy
      render json: cross_allergy
    else
      render json: cross_allergy.errors
    end
  end

  def show
  end

  def destroy
    cross_allergy = CrossAllergy.find(params[:id])
    cross_allergy.destroy
  end

  private
  def cross_allergy_params
    params.permit(:cross_allergy, :drug_id)
  end
end
