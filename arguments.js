function sum() {
  var args = Array.prototype.slice.call(arguments);
  var sum = 0;

  for (var i = 0; i < args.length; i++) {
    sum += args[i];
  };

  return sum;
};


Function.prototype.myBind = function (obj) {
  var args = Array.prototype.slice.call(arguments);

  var fn = this;

  return function () {
    var args2 = Array.prototype.slice.call(arguments);
    return fn.apply(obj, args.slice(1).concat(args2));
  };
};


function curriedSum(numArgs) {
  var numbers = [];

  var _curriedSum = function (currNumber) {
    numbers.push(currNumber);
    if (numbers.length === numArgs) {
      var sum = 0;

      for (var i = 0; i < numbers.length; i++) {
        sum += numbers[i];
      };

      return sum;
    } else {
      return _curriedSum;
    }
  };

  return _curriedSum;
};

Function.prototype.curry = function (numArgs) {
  var args = [];
  var that = this;

  var _curriedFunc = function (currArg) {
    args.push(currArg);

    if (args.length === numArgs) {
      return that.apply(that, args)
    } else {
      return _curriedFunc;
    }
  };

  return _curriedFunc;
};

function sumNums() {
  var sum = 0;
  var args = Array.prototype.slice.call(arguments);

  for (var i = 0; i < args.length; i++) {
    sum += args[i];
  };

  return sum;
}