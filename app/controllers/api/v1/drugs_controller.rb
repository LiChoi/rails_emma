class Api::V1::DrugsController < ApplicationController
  def index
    drug = Drug.all.order(created_at: :desc)
    render json: drug
  end

  def create
    drug = Drug.create!(drug_params)
    if drug
      render json: drug
    else
      render json: drug.errors
    end
  end

  def show
    if drug
      render json: drug
    else
      render json: drug.errors
    end
  end

  def destroy
    drug&.destroy
    render json: { message: 'Drug deleted!' }
  end

  private

  def drug_params
    params.permit(:chemicalName, :drug_class)
  end

  def drug
    @drug ||= Drug.find(params[:id])
  end
end
