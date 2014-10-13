Function.prototype.inherits = function (parent) {
  // parent.call(this, )
  function Surrogate() {};
  Surrogate.prototype = parent.prototype;
  this.prototype = new Surrogate();
};



function MovingObject (name, color) {
  this.name = name;
  this.color = color;
};


function Ship (name, color, size) {
  MovingObject.call(this, name, color);
  this.size = size;
};
Ship.inherits(MovingObject);

Ship.prototype.fly = function () {
  return "whooosh!";
};

function Asteroid (name, color, material) {
  MovingObject.call(this, name, color);
  this.material = material;
};
Asteroid.inherits(MovingObject);


