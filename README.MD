## Asteroidjs
An Asteroids game created using mainly JavaScript, supported by jQuery and Rails
* Uses vector math to determine which direction to apply thrust and fire weapons.
* Ship movement affects the relative velocity of fired bullets and stars
* Uses a Rails backend to support high score tracking
* Implements an api for pulling highscores

#### Rules and Controls
* The ship will always face your mouse cursor
* Use Spacebar to give the ship a bit of thrust in the direction it is facing
* Your ship has a maximum velocity
	 * Applying thrust while already at the max does nothing
* Press 'p' at any time to pause
* You start with 5 lives
* Each collision with an asteroid reduces your lives by one
* Destroy asteroids to score points
* Destroy ALL asteroids to advance to the next level, which has (wait for it...) MORE asteroids!
* If your score is better than any of the current top ten, you will be able to submit your name, to be displayed among all the other high scores! Press Enter to submit your name
* After your game ends, click anywhere to start over (after submitting your name, if needed)!

Try to beat the high score!

##### Bugs
* A "ghost" asteroid occasionally appears off screen. You are unable to destroy it, which prevents you from advancing.