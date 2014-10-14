(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Star === "undefined") {
    Asteroids.Star = {};
  }


  var Star = Asteroids.Star = function (pos, game) {
    var COLOR = "yellow";
    var RADIUS = Math.random()*.5;
    var args = {
      pos: pos,
      color: COLOR,
      radius: RADIUS,
      vel: [0,Math.random()*5 + .01],
      game: game,
      shouldWrap: true
    };

    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Star, Asteroids.MovingObject);

  
})();


