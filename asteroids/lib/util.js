(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function (child, parent) {
    function Surrogate() {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  Util.randomVec = function (length) {
    var x = Math.floor(((Math.random() * 2) - 1) * (length))+1;
    var y = Math.floor(((Math.random() * 2) - 1) * (length))+1;
    return [x,y]
  };

  Util.dist = function (pos1, pos2) {
    var x1 = pos1[0];
    var y1 = pos1[1];
    var x2 = pos2[0];
    var y2 = pos2[1];

    return Math.sqrt(Math.pow((x1 - x2),2) + Math.pow((y1-y2),2))
  }

  Util.norm = function (pos) {
    return Util.dist([0,0],pos)
  };

  Util.scale = function(vec, m) {
    return [vec[0] * m, vec[1] * m]
  };

  Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1/norm) 
  }

  Util.findPointOnCircle = function(origin, radius, degrees) {
    var x = origin[0];
    var y = origin[1];
    var r = radius;
    var rads = (degrees * (Math.PI / 180));
    var cos = Math.round(100 * Math.cos(rads))/100;
    var sin = Math.round(100 * Math.sin(rads))/100;

    return [ x + r*cos, y + r*sin];

  }
})();