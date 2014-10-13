(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Game === "undefined") {
    Asteroids.Game = {};
  }

  var NUM_ASTEROIDS = 5;

  var Game = Asteroids.Game = function (dim_x, dim_y) {
    this.dim_x = dim_x;
    this.dim_y = dim_y;
    this.num_asteroids = NUM_ASTEROIDS;
    this.asteroids = this.addAsteroids();

  };

  Game.prototype.addAsteroids = function () {
    var asteroids = [];
    var game = this;

    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      var ast = new Asteroids.Asteroid(game.randomPosition(), this);
      asteroids.push(ast);
    };
    return asteroids;
  };

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Math.random() * (this.dim_x));
    var y = Math.floor(Math.random() * (this.dim_y));
    return [x,y];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.dim_x, this.dim_y);

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0] // % this.dim_x;
    var y = pos[1] //% this.dim_y;

    if (x <= 0) {
      var new_x = this.dim_x;
    } else {
      var new_x = x % this.dim_x;
    }

    if (y <= 0) {
      var new_y = this.dim_y;
    } else {
      var new_y = y % this.dim_y;
    }

    return [new_x,new_y];
  };

})();