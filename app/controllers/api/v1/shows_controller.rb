class Api::V1::ShowsController < ApiController

  def index
    render json: { spaces: serialized_shows }
  end

  def serialized_shows
    ActiveModel::Serializer::ArraySerializer.new(Show.all, each_serializer: ShowSerializer)
  end

end
