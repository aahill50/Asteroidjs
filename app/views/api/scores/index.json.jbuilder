place = 1

json.array! @scores do |score|
  json.place place
  json.extract! score, :username, :score
  json.date score.created_at.to_formatted_s(:db)
  place += 1
end