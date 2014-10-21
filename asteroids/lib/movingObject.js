(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (args) {
    this.pos = args["pos"];
    this.vel = args["vel"];
    this.radius = args["radius"];
    this.color = args["color"];
    this.degFacing = args["degFacing"];
    this.game = args["game"];
    this.shouldWrap = args["shouldWrap"];
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.strokeStyle = this.color;

    ctx.arc(
      this.pos[0], //x
      this.pos[1], //y
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.stroke();

    // ctx.fill();
  };

  MovingObject.prototype.move = function () {
    var relvel = [];
    if (this instanceof Asteroids.Star) {
      relvel[0] = this.game.ship.vel[0]*.2 || 0;
      relvel[1] = this.game.ship.vel[1]*.3 || 0;
    } else {
      relvel[0] = 0;
      relvel[1] = 0;
    };
    // console.log(relvel[0]);
    var x = this.pos[0] + this.vel[0] - relvel[0];
    var y = this.pos[1] + this.vel[1] - relvel[1];
    var r = this.radius;

    if (!this.shouldWrap && this.game.isOutOfBounds([x,y], r)) {
      this.game.remove(this);
    };

    if (this.shouldWrap) {
      this.pos = this.game.wrap([x,y],r);
    } else {
      this.pos = [x,y];
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var x1 = this.pos[0];
    var y1 = this.pos[1];
    var x2 = otherObject.pos[0];
    var y2 = otherObject.pos[1];

    var x_diff = Math.abs(x1 - x2);
    var y_diff = Math.abs(y1 - y2);

    var dist = Math.sqrt(x_diff * x_diff + y_diff * y_diff);

    if (this.radius + otherObject.radius > dist) {
      return true;
    }

    return false;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
  };
})();