(function () {

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
    window.setInterval(function () {
      this.game.moveObjects();
      this.game.draw(this.ctx);
    }.bind(this), 20);
  };

})();