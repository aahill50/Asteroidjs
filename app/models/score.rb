class Score < ActiveRecord::Base
  validates :score, presence: true
  
  def self.sorted_scores
    Score.all.select("*").order("score DESC")
  end
    
  def self.highscores
    Score.sorted_scores.limit(10)
  end
end
