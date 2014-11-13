(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Game === "undefined") {
    Asteroids.Game = {};
  }

  var NUM_STARS = 75;
  var Game = Asteroids.Game = function (dimX, dimY) {
		this.currId = 0;
    this.dimX = dimX;
    this.dimY = dimY;
		this.isOver = false;
		this.isPaused = false;
    this.ASTEROID_COUNT = 0;
	  this.maxAsteroidArea = Game.maxAsteroidArea;
    this.asteroids = this.addAsteroids();
    this.stars = this.addStars();
    this.ship = new Asteroids.Ship(this.findNewSpawn(), this)
    this.bullets = [];
    this.allObjects = this.getAllObjects();
		this.score = 0;
		this.lives = 5;
  };

	Game.maxAsteroidArea = 10000;
	
	Game.prototype.getNextId = function () {
		this.currId += 1;
		return this.currId
	};

	Game.prototype.reset = function (options) {
		$(window).off("click.resetGame");
		this.removeMessage('gameover');
		
		 Game.maxAsteroidArea *= 1.5;
		this.maxAsteroidArea = Game.maxAsteroidArea;
    this.asteroids = this.addAsteroids();
    this.stars = this.addStars();
    this.ship = new Asteroids.Ship(this.findNewSpawn(), this)
    this.bullets = [];
    this.allObjects = this.getAllObjects();
		this.isOver = false;
		this.isPaused = false;
		
		if (options.newGame) {
			this.score = 0;
			this.lives = 5;
		}
	};
	
  Game.prototype.getAllObjects = function () {
    return this.stars.concat(this.bullets).concat(this.asteroids).concat(this.ship);
  };

  Game.prototype.addAsteroids = function () {
		var asteroidArea = 0;
    var asteroids = [];
    var game = this;

    while (asteroidArea < this.maxAsteroidArea) {
      var ast = new Asteroids.Asteroid(game.randomPosition(), this, 0);
      asteroids.push(ast);
			var newAstArea = Math.PI * Math.pow(ast.radius, 2)
			asteroidArea += newAstArea;
			this.ASTEROID_COUNT += 1;
    };
    return asteroids;
  };
	
	Game.prototype.addAsteroid = function (pos, radius) {
		var ast = new Asteroids.Asteroid(pos, this, radius);
		this.asteroids.push(ast);
		this.ASTEROID_COUNT += 1;
	};
  
  Game.prototype.addStars = function () {
    var stars = [];
    var game = this;

    for (var i = 0; i < NUM_STARS; i++) {
      var star = new Asteroids.Star(game.randomPosition(), this);
      stars.push(star);
    };
    return stars;
  };


  Game.prototype.randomPosition = function () {
    var x = Math.floor(Math.random() * (this.dimX));
    var y = Math.floor(Math.random() * (this.dimY));
    return [x,y];
  };
	
  Game.prototype.findNewSpawn = function () {
		var newPos = this.randomPosition();
		var badPos = false;
		
		this.asteroids.forEach( function (ast) {
			var abs = Math.abs;
			var diffX = abs(ast.pos[0] - newPos[0]);
			var diffY = abs(ast.pos[1] - newPos[1]);
			
			if (diffX < ast.radius * 3 && diffY < ast.radius * 3 ) {
				badPos = true;
			}
		});
		
		if (badPos) {
			return this.findNewSpawn();
		} else {
	    return newPos;
		}
  };
	
  Game.prototype.draw = function (ctx) {
	    ctx.clearRect(0, 0, this.dimX, this.dimY);
	    ctx.fillStyle = "black"
	    ctx.fillRect(0, 0, this.dimX, this.dimY);

	    this.allObjects.forEach(function (object) {
	      object.draw(ctx);
	    });
  };

  Game.prototype.moveObjects = function () {
		var game = this;
		if (!game.isPaused) {
	    game.allObjects.forEach(function (object) {
	      object.move();
	    });
		}
  };

  Game.prototype.wrap = function (pos, radius) {
    var x = pos[0];
    var y = pos[1];
    var r = radius;

    if (x + r < 0) {
      var new_x = this.dimX + r;
    } else if (x - r > this.dimX) {
      var new_x = 0 - r
    } else{
      var new_x = x;
    }

    if (y + r < 0) {
      var new_y = this.dimY + r;
    } else if (y - r > this.dimY) {
      var new_y = 0 - r;
    } else {
      var new_y = y;
    }

    return [new_x,new_y];
  };

  Game.prototype.isOutOfBounds = function (pos, radius) {
    var x = pos[0];
    var y = pos[1];
    var r = radius;

    if (x + r < 0) {
      return true;
    } else if (x - r > this.dimX) {
      return true;
    } 

    if (y + r < 0) {
      return true;
    } else if (y - r > this.dimY) {
      return true;
    } 

    return false;
  };

  Game.prototype.checkCollisions = function () {
		var game = this;
		game.allObjects.forEach(function (object) {
			game.allObjects.forEach(function (otherObject) {
				if (object !== otherObject) {
					if (object.isCollidedWith(otherObject)) {
						object.collideWith(otherObject);
					}
				}
			})
		})
	};
	
	Game.prototype.togglePause = function () {
		this.isPaused = !this.isPaused;
		
		if (this.isPaused) {
			this.addMessage('paused');
		} else {
			this.removeMessage('paused');
		}
	};

  Game.prototype.step = function () {
		if (!this.isPaused && !this.isOver) {
			this.ship.adjustFacing();
			this.ship.updateThruster();
			this.allObjects = this.getAllObjects();
	    this.moveObjects();
	    this.checkCollisions();
			this.updateGameScore();
			this.updateLivesLeft();
			
			if (this.ASTEROID_COUNT === 0) {
				this.reset({ newGame: false })
			}
		}
  };

  Game.prototype.remove = function (movingObject) {
		this.allObjects = this.allObjects.filter( function (obj) { return obj.id !== movingObject.id })
    if (movingObject instanceof Asteroids.Asteroid) {
			this.asteroids = this.asteroids.filter( function (ast) { return ast.id !== movingObject.id })
			this.ASTEROID_COUNT -= 1;
    } else if(movingObject instanceof Asteroids.Bullet) {
			this.bullets = this.bullets.filter( function (blt) { return blt.id !== movingObject.id })
    }
  };
	
	Game.prototype.updateGameScore = function () {
		$gameScoreContainer = $('#game-score');
		$gameScoreContainer.text(this.score)
	};
	
	Game.prototype.updateLivesLeft = function () {
		$gameScoreContainer = $('#lives-left');
		$gameScoreContainer.text(this.lives)
	};
	
	Game.prototype.gameOver = function () {
		var game = this;
		game.isOver = true;
		
		this.addMessage('gameover')

		$(window).one("click.resetGame", function () {
			game.reset({ newGame: true });
		})
	};
	
	Game.prototype.addMessage = function (message) {
		var $gameOverlay = $('#game-overlay');
		var $message = $('#message');
		$gameOverlay.addClass('active');
		$message.addClass(message);
	};
	
	Game.prototype.removeMessage = function (message) {
		var $gameOverlay = $('#game-overlay');
		var $message = $('#message');
		$gameOverlay.removeClass('active');
		$message.removeClass(message);
	};
})();