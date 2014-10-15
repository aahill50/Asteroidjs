(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Ship === "undefined") {
    Asteroids.Ship = {};
  }


  var Ship = Asteroids.Ship = function (pos, game) {
    var args = {
      pos: pos,
      color: Ship.COLOR,
      radius: Ship.RADIUS,
      vel: [0,0],
      game: game,
      shouldWrap: true
    };

    Asteroids.MovingObject.call(this, args);
  }

  Ship.MAX_SPEED = 10;
  Ship.COLOR = "red";
  Ship.RADIUS = 25;
  Ship.MAX_BULLETS = 10;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
  
  Ship.prototype.draw = function (ctx) {
    var shipTop = [this.pos[0], this.pos[1] - Ship.RADIUS];
    var shipBot = [this.pos[0], this.pos[1] + Ship.RADIUS];
    var shipL = [this.pos[0] - Ship.RADIUS, this.pos[1]];
    var shipR = [this.pos[0] + Ship.RADIUS, this.pos[1]];

    // ctx.fillStyle = "grey"
    ctx.beginPath();

    ctx.strokeStyle = Ship.COLOR;
    ctx.moveTo( shipTop[0], shipTop[1]);
    ctx.lineTo( shipL[0], shipL[1]);
    ctx.lineTo( shipBot[0], shipBot[1]);
    ctx.lineTo( shipR[0], shipR[1]);
    ctx.lineTo( shipTop[0], shipTop[1]);
    ctx.stroke();

    // ctx.beginPath();
    // ctx.fillStyle = "blue";
    // ctx.arc(
    //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    // );
    // ctx.fill();

  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse, dir) {
    if (dir === "right") {
      if (this.vel[0] + impulse > Ship.MAX_SPEED) {
        this.vel[0] = Ship.MAX_SPEED;
      } else {
        this.vel[0] += impulse;
      }
    } else if (dir === "down") {
      if (this.vel[1] + impulse > Ship.MAX_SPEED) {
        this.vel[1] = Ship.MAX_SPEED;
      } else {
        this.vel[1] += impulse;
      }
    } else if (dir === "left") {
      if (Math.abs(this.vel[0] - impulse) > Ship.MAX_SPEED) {
        this.vel[0] = -1 * Ship.MAX_SPEED;
      } else {
        this.vel[0] -= impulse;
      }
    } else if (dir === "up") {
      if (Math.abs(this.vel[1] - impulse) > Ship.MAX_SPEED) {
        this.vel[1] = -1 * Ship.MAX_SPEED;
      } else {
        this.vel[1] -= impulse;
      }
    }
  };

  Ship.prototype.fireBullet = function () {
    var ship = this;

    if (Asteroids.Util.norm(ship.vel) > 0) {
      this.game.bullets.push(new Asteroids.Bullet(ship, ship.game));
      if (this.game.bullets.length > Ship.MAX_BULLETS) {
        console.log("too many bullets!")
        this.game.remove(this.game.bullets[0]);
      };
    };
  };

})();