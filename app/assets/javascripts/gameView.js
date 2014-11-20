if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

if (typeof Asteroids.GameView === "undefined") {
  Asteroids.GameView = {};
}

var GameView = Asteroids.GameView = function (game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  window.setInterval(function () {
    this.game.draw(this.ctx);
    this.game.step();
  }.bind(this), 20);
};

GameView.prototype.bindKeyHandlers = function () {
  var gv = this;
	
  key('space', function() { 
		if (!gv.game.isPaused && !gv.game.isOver) {
			gv.game.ship.power(0.04, "forward");
		}
	});
	
	key('p', function () { gv.game.togglePause() })
  // key('up', function() { gv.game.ship.power(1, "forward") });
  // key('down', function() { gv.game.ship.power(0.5, "backward") });
  // key('left', function() { gv.game.ship.turn("left") });
  // key('right', function() { gv.game.ship.turn("right") });
  // key('space', function() { gv.game.ship.fireBullet() });
};