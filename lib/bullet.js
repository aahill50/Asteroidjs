(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Bullet === "undefined") {
    Asteroids.Bullet = {};
  }

  var Bullet = Asteroids.Bullet = function (ship, game) {
    var shipDir = Asteroids.Util.findPointOnCircle(ship.pos, ship.radius, ship.degFacing);
    var bulletX = (shipDir[0] - ship.pos[0])/ship.radius;
    var bulletY = (shipDir[1] - ship.pos[1])/ship.radius;
    bulletX *= Asteroids.Ship.MAX_SPEED * 1.3;
    bulletY *= Asteroids.Ship.MAX_SPEED * 1.3;
    bulletX += ship.vel[0];
    bulletY += ship.vel[1];
    
    this.vel = [ bulletX, bulletY ];

    var COLOR = "red";
    var RADIUS = 2;
    var args = {
      pos: ship.pos,
      color: COLOR,
      radius: RADIUS,
      vel: this.vel,
      game: game,
      shouldWrap: false
    };

    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

})();