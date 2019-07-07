class Api::V1::ShowsController < ApiController

  def index
    render json: { spaces: serialized_shows }
  end

  def create
    show = Show.new(show_params)

    if show.save
      render json: { show: show }
    else
      render json: { show: show }
    end
  end

  def show_params
    params.require(:show).permit(:name, :start_time, :duration, :description)
  end

  def serialized_shows
    ActiveModel::Serializer::ArraySerializer.new(Show.all, each_serializer: ShowSerializer)
  end

end
