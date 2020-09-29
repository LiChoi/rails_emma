class Api::V1::TradeNamesController < ApplicationController
  def index
  end

  def create
    trade_name = TradeName.create(tradename_params)
    if trade_name
      render json: trade_name
    else
      render json: trade_name.errors
    end
  end

  def show
  end

  def destroy
    trade_name = TradeName.find(params[:id])
    trade_name.destroy
  end

  private

  def tradename_params
    params.permit(:trade_name, :drug_id)
  end
end
