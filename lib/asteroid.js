(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    var COLOR = "white";
    var RADIUS = Math.random()*20 + 10;
    var args = {
      pos: pos,
      color: COLOR,
      radius: RADIUS,
      vel: Asteroids.Util.randomVec(5),
      game: game,
      shouldWrap: true
    };

    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      this.game.ship.relocate();
    }
  };

})();


