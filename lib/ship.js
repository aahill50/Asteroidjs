(function () {

  window.Asteroids = window.Asteroids || {};

  Asteroids.Ship = Asteroids.Ship || {};

  var Ship = Asteroids.Ship = function (pos, game) {
    var args = {
      pos: pos,
      color: Ship.COLOR,
      radius: Ship.RADIUS,
      vel: [0,0],
      game: game,
      degFacing: 270,
      shouldWrap: true
    };

    Asteroids.MovingObject.call(this, args);
  }

  Ship.MAX_SPEED = 10;
  Ship.COLOR = "red";
  Ship.RADIUS = 25;
  Ship.MAX_BULLETS = 5;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
  
  Ship.prototype.draw = function (ctx) {
    var PoC = Asteroids.Util.findPointOnCircle.bind(null, this.pos);
    var r = this.radius;
    var deg = this.degFacing;

    var shipFront = [PoC(r, deg)[0], PoC(r, deg)[1]];
    var shipBack = [PoC(r*.25, deg - 180)[0], PoC(r*.25, deg - 180)[1]];
    var shipL = [PoC(r*.9, deg - 135)[0], PoC(r*.9, deg - 135)[1]];
    var shipR = [PoC(r*.9, deg - 225)[0], PoC(r*.9, deg - 225)[1]];
		
		var thrusterStart = shipBack;
		var thrusterL = Asteroids.Util.findPointOnCircle(shipBack, ((Math.random() + 0.5) * Asteroids.Ship.thrusterLevel) * this.radius, this.degFacing + 160);
		var thrusterR = Asteroids.Util.findPointOnCircle(shipBack, ((Math.random() + 0.5) * Asteroids.Ship.thrusterLevel) * this.radius, this.degFacing + 200);

		ctx.beginPath();
			ctx.strokeStyle = "orange";
			ctx.moveTo( thrusterStart[0], thrusterStart[1] );
			ctx.lineTo( thrusterL[0], thrusterL[1]);
			ctx.lineTo( thrusterR[0], thrusterR[1]);
			ctx.lineTo( thrusterStart[0], thrusterStart[1]);
			ctx.fillStyle = "orange";
			ctx.fill();
		ctx.stroke();

    ctx.beginPath();
	    ctx.strokeStyle = Ship.COLOR;
	    ctx.moveTo( shipFront[0], shipFront[1]);
	    ctx.lineTo( shipL[0], shipL[1]);
	    ctx.lineTo( shipBack[0], shipBack[1]);
	    ctx.lineTo( shipR[0], shipR[1]);
	    ctx.lineTo( shipFront[0], shipFront[1]);
			ctx.fillStyle = "black";
			ctx.fill();
    ctx.stroke();

  };

  Ship.prototype.relocate = function () {
		var ship = this;
		var newPos = ship.game.findNewSpawn();
		
    ship.pos = newPos;
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
		this.degFacing < 0 ? this.degFacing += 360 : this.degFacing %= 360
  };
	
	Ship.prototype.adjustFacing = function () {
		var sq = function (num) {
			return Math.pow(num,2)
		};
		
		var sqrt = Math.sqrt;
		
		var facingVecX = Asteroids.x - this.pos[0];
		var facingVecY = this.pos[1] - Asteroids.y;
		var newNormVec = [ facingVecX / sqrt( sq(facingVecX) + sq(facingVecY) ),
											 facingVecY / sqrt( sq(facingVecX) + sq(facingVecY) )];
											 
		var origNormVec =[1,0];
		
		var topPc = (origNormVec[0] * newNormVec[0]) + (origNormVec[1] * newNormVec[1]);
		var sqrt1 = sqrt( sq(origNormVec[0]) + sq(origNormVec[1]) );
		var sqrt2 = sqrt( sq(newNormVec[0]) + sq(newNormVec[1]) );
		
		var newDeg = 180 * Math.acos(topPc / (sqrt1 * sqrt2)) / Math.PI
		if (newNormVec[1] < 0) {
			this.degFacing = newDeg
		} else {
			this.degFacing = -newDeg
		}
	};

  Ship.prototype.fireBullet = function () {
    var ship = this;

		if (!this.game.isPaused && !this.game.isOver) {
	    this.game.bullets.push(new Asteroids.Bullet(ship, ship.game));
	    if (this.game.bullets.length > Ship.MAX_BULLETS) {
	      console.log("too many bullets!")
	      this.game.remove(this.game.bullets[0]);
	    };
		}
   };

})();