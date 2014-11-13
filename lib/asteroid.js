(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
	

  var Asteroid = Asteroids.Asteroid = function (pos, game, r) {
    var color = "#555";
    var radius = r > 0 ? r : Asteroid.SIZES[Math.floor(Math.random()*Asteroid.SIZES.length)];
    var args = {
      pos: pos,
      color: color,
      radius: radius,
      vel: Asteroids.Util.randomVec(3),
      game: game,
      shouldWrap: true,
    };
		
    Asteroids.MovingObject.call(this, args);
  };
	
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

	Asteroid.SIZES = [10, 10, 20, 40, 80];

  Asteroid.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.strokeStyle = "#222";

    ctx.arc(
      this.pos[0], //x
      this.pos[1], //y
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.stroke();

    ctx.fill();
  };
	
  Asteroid.prototype.collideWith = function (otherObject) {
		if (this.game.lives === 0) {
			this.game.gameOver();
		} else if (otherObject instanceof Asteroids.Ship) {
      this.game.ship.relocate();
			this.game.lives -= 1;
    }
  };
	
	Asteroid.prototype.splitOrDestroy = function () {
			this.game.remove(this);
			this.game.score += Math.floor(10000/this.radius)
		if (this.radius > 20) {
			this.game.score += 10000;
			var rnd = Math.random
			this.game.addAsteroid( this.pos, this.radius / 2 )
			this.game.addAsteroid( this.pos, this.radius / 2 )
		}
	};

})();


