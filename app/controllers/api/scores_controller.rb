class Api::ScoresController < ApplicationController
  def index
    @scores = Score.highscores 
    render :index
  end
  
  def create
    username = params[:username]
    score = params[:score]
    @score = Score.new(username: username, score: score)
    
    if @score.save
      if Score.highscores.include?(@score)
        render json: { id: @score.id,
                       score: @score.score,
                       username: @score.username,
                       highscore: true
                     }.to_json
      else
        render json: { id: @score.id,
                       score: @score.score,
                       username: @score.username,
                       highscore: false
                     }.to_json
      end
    else
      render text: "Unable to save score"
    end
    
    def update
      @score = Score.find(params[:id])
      username = params[:username]
      
      if @score.update(username: username)
        render json: @score
      else
        render text: "unable to save" 
      end
    end
  end
end
