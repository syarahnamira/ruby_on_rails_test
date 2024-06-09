class MessagesController < ApplicationController
  def create
    @chatroom = Chatroom.find(params[:chatroom_id])
    @message = @chatroom.messages.build(message_params)
    if @message.save
      Pusher.trigger("chatroom_#{@chatroom.id}", 'message_created', {
        message: @message.content
      })
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
