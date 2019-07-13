class Api::V1::ActsController < ApiController
  respond_to :json

  def index
    render json: { acts: serialized_acts }
  end

  def create
    act = Act.new(act_params)

    if act.save
      render json: { act: act }
    else
      render json: { act: act }
    end
  end

  def show
    render json: Act.find(params[:id])
  end

  def update
    act = Act.find(params['id'])
    act.update(act_params)
    respond_with Act, json: show
  end

  def act_params
    params.require(:act).permit(:name, :contact_name, :contact_email, :description, :archived)
  end

  def serialized_acts
    ActiveModel::Serializer::ArraySerializer.new(Act.all, each_serializer: ActSerializer)
  end

end
