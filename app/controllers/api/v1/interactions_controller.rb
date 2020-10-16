class Api::V1::InteractionsController < ApplicationController
  def index
  end

  def create
    interaction = Interaction.create(interaction_params)
    if interaction
      render json: interaction
    else
      render json: interaction.errors
    end
  end

  def show
  end

  def destroy
    interaction = Interaction.find(params[:id])
    interaction.destroy
  end

  private

  def interaction_params
    params.permit(:tag, :tag_type, :effect, :severity, :drug_id)
  end
end
