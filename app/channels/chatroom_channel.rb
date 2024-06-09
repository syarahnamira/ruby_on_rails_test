class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chatroom_#{params[:chatroom_id]}_channel"
  end
end
