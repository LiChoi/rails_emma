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
      drug_details = drug.as_json
      puts drug_details 
      # Add trade names
      trade_names = TradeName.where(drug_id: params[:id])
      drug_details[:trade_names] = trade_names

      # Add cross allergies
      cross_allergies = CrossAllergy.where(drug_id: params[:id])
      drug_details[:cross_allergies] = cross_allergies

      # Send it over
      render json: drug_details
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
