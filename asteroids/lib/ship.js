(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Ship === "undefined") {
    Asteroids.Ship = {};
  }

  var MAX_SPEED = 10;

  var Ship = Asteroids.Ship = function (pos, game) {
    var COLOR = "blue";
    var RADIUS = 10;
    var args = {
      pos: pos,
      color: COLOR,
      radius: RADIUS,
      vel: [0,0],
      game: game,
      shouldWrap: true
    };

    Asteroids.MovingObject.call(this, args);
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse, dir) {
    if (dir === "right") {
      if (this.vel[0] + impulse > MAX_SPEED) {
        this.vel[0] = MAX_SPEED;
      } else {
        this.vel[0] += impulse;
      }
    } else if (dir === "down") {
      if (this.vel[1] + impulse > MAX_SPEED) {
        this.vel[1] = MAX_SPEED;
      } else {
        this.vel[1] += impulse;
      }
    } else if (dir === "left") {
      if (Math.abs(this.vel[0] - impulse) > MAX_SPEED) {
        this.vel[0] = -1 * MAX_SPEED;
      } else {
        this.vel[0] -= impulse;
      }
    } else if (dir === "up") {
      if (Math.abs(this.vel[1] - impulse) > MAX_SPEED) {
        this.vel[1] = -1 * MAX_SPEED;
      } else {
        this.vel[1] -= impulse;
      }
    }
  };

  Ship.prototype.fireBullet = function () {
    var ship = this;
    this.game.bullets.push(new Asteroids.Bullet(ship, ship.game));
  };

})();