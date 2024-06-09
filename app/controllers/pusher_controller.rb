class PusherController < ApplicationController
    def config
      render json: {
        key: ENV['PUSHER_KEY'],
        cluster: ENV['PUSHER_CLUSTER']
      }
    end
  end
  