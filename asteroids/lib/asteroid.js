(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    var COLOR = "green";
    var RADIUS = 25;
    var args = {
      pos: pos,
      color: COLOR,
      radius: RADIUS,
      vel: Asteroids.Util.randomVec(5),
      game: game
    };

    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();


