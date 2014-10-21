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
      degFacing: 0,
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
    var PoC = Asteroids.Util.findPointOnCircle.bind(null, this.pos);
    var r = this.radius;
    var deg = this.degFacing;
    // console.log(PoC);
    // console.log(PoC(1,0));

    var shipFront = [PoC(r, deg)[0], PoC(r, deg)[1]];
    var shipBack = [PoC(r*.25, deg - 180)[0], PoC(r*.25, deg - 180)[1]];
    var shipL = [PoC(r*.9, deg - 125)[0], PoC(r*.9, deg - 125)[1]];
    var shipR = [PoC(r*.9, deg - 245)[0], PoC(r*.9, deg - 245)[1]];

    // console.log(shipFront, shipBack, shipL, shipR)
    // ctx.fillStyle = "grey"
    ctx.beginPath();

    ctx.strokeStyle = Ship.COLOR;
    ctx.moveTo( shipFront[0], shipFront[1]);
    ctx.lineTo( shipL[0], shipL[1]);
    ctx.lineTo( shipBack[0], shipBack[1]);
    ctx.lineTo( shipR[0], shipR[1]);
    ctx.lineTo( shipFront[0], shipFront[1]);
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
    var shipDir = Asteroids.Util.findPointOnCircle(this.pos, this.radius, this.degFacing);
    var impX = (shipDir[0] - this.pos[0])/this.radius
    var impY = (shipDir[1] - this.pos[1])/this.radius

    if (dir === "forward") {
      this.vel[0] += impX;
      this.vel[1] += impY;
    } else if (dir === "backward") {
      this.vel[0] -= impX;
      this.vel[1] -= impY;
    }
    
    if (this.vel[0] > Ship.MAX_SPEED) {
      this.vel[0] = Ship.MAX_SPEED;
    }
    if (this.vel[1] > Ship.MAX_SPEED) {
      this.vel[1] = Ship.MAX_SPEED;
    }
    if (this.vel[0] < -1 * Ship.MAX_SPEED) {
      this.vel[0] = -1 * Ship.MAX_SPEED;
    }
    if (this.vel[1] < -1 * Ship.MAX_SPEED) {
      this.vel[1] = -1 * Ship.MAX_SPEED;
    }
  };

    Ship.prototype.turn = function (dir) {
    if (dir === "right") {
      this.degFacing += 5;
    } else if (dir === "left") {
      this.degFacing -= 5;
    }
  };

  Ship.prototype.fireBullet = function () {
    var ship = this;

    this.game.bullets.push(new Asteroids.Bullet(ship, ship.game));
    if (this.game.bullets.length > Ship.MAX_BULLETS) {
      console.log("too many bullets!")
      this.game.remove(this.game.bullets[0]);
    };
  };

})();