// Generated by CoffeeScript 1.6.3
var Blocks, b, data;

Blocks = (function() {
  function Blocks(data) {
    var coords, i, npoints, point, points, surface, x, y, z, _i, _j, _k, _l;
    this.data = data;
    this.$container = $(".cubes");
    this.dims = 40;
    this.timer = false;
    this.rotateCoords = ["x", "y", "z"];
    this.rotation = {
      x: -35,
      y: -45,
      z: 0
    };
    for (x = _i = 0; _i <= 2; x = ++_i) {
      for (y = _j = 0; _j <= 2; y = ++_j) {
        for (z = _k = 0; _k <= 2; z = ++_k) {
          this.$container.append(this.addBlock({
            x: x,
            y: y,
            z: z
          }, "blue"));
        }
      }
    }
    npoints = this.sample([2, 3, 4, 5]);
    for (i = _l = 1; 1 <= npoints ? _l <= npoints : _l >= npoints; i = 1 <= npoints ? ++_l : --_l) {
      surface = this.sample([0, 2]);
      point = this.sample([-1, 3]);
      points = this.shuffle([point, surface, surface]);
      coords = {
        x: points[0],
        y: points[1],
        z: points[2]
      };
      this.$container.append(this.addBlock(coords, "blue"));
    }
    this.$container.css({
      width: 60 + 'px',
      height: 60 + 'px'
    });
  }

  Blocks.prototype.addBlock = function(coords, color) {
    var block;
    return block = "<div class='cube' style='left: " + (this.dims * coords.x) + "px; top: " + (this.dims * coords.z) + "px; -webkit-transform: translateZ(" + (this.dims * coords.y) + "px)'>      <div class='face front " + color + "-" + (this.random(6)) + "'></div>      <div class='face back " + color + "-" + (this.random(6)) + "'></div>      <div class='face right " + color + "-" + (this.random(6)) + "'></div>      <div class='face left " + color + "-" + (this.random(6)) + "'></div>      <div class='face top " + color + "-" + (this.random(6)) + "'></div>      <div class='face bottom " + color + "-" + (this.random(6)) + "'></div>    </div>";
  };

  Blocks.prototype.random = function(range) {
    return Math.ceil(Math.random() * range);
  };

  Blocks.prototype.sample = function(values) {
    return values[this.random(values.length) - 1];
  };

  Blocks.prototype.order = function(values) {
    var i, index, j, value, value_copy, values_copy, _i, _j, _k, _len, _len1, _len2;
    values_copy = [];
    for (_i = 0, _len = values.length; _i < _len; _i++) {
      value = values[_i];
      values_copy.push(value);
    }
    values.sort();
    index = [];
    i = 0;
    for (_j = 0, _len1 = values_copy.length; _j < _len1; _j++) {
      value_copy = values_copy[_j];
      j = 0;
      for (_k = 0, _len2 = values.length; _k < _len2; _k++) {
        value = values[_k];
        if (value_copy === value) {
          index[i] = j;
        }
        j++;
      }
      i++;
    }
    return index;
  };

  Blocks.prototype.shuffle = function(values) {
    var seed, seed_order, seeds, shuffled, value;
    seeds = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        _results.push(Math.random());
      }
      return _results;
    })();
    seed_order = this.order(seeds);
    shuffled = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = seed_order.length; _i < _len; _i++) {
        seed = seed_order[_i];
        _results.push(values[seed]);
      }
      return _results;
    })();
    return shuffled;
  };

  Blocks.prototype.rotate = function() {
    /*
    @rotation[@rotateCoords[0]] += @sample [ -30, 0, 30 ]
    @rotation[@rotateCoords[1]] += @sample [ -15, 0, 15 ]
    @rotation[@rotateCoords[2]] += @sample [ -0,  0, 0 ]
    
    switch @rotateCoords[0]
      when "x" then @rotateCoords = ["y", "z", "x"]
      when "y" then @rotateCoords = ["x", "y", "z"]
      #when "y" then @rotateCoords = ["z", "x", "y"]
      #when "z" then @rotateCoords = ["x", "y", "z"]
    
    rotation = "rotateX(#{@rotation.x}deg) rotateY(#{@rotation.y}deg) rotateZ(#{@rotation.z}deg)"
    @$container.css({"-webkit-transform": rotation})
    */

    var animation;
    animation = "myfirst 60s infinite";
    this.$container.css({
      "-webkit-animation": animation,
      animation: animation
    });
    return true;
  };

  Blocks.prototype.startRotate = function() {
    var callback;
    callback = this.rotate.bind(this);
    this.timer = setInterval(callback, 2000);
    return true;
  };

  return Blocks;

})();

data = [
  {
    x: 3,
    y: 2,
    z: 2
  }, {
    x: -1,
    y: 0,
    z: 0
  }, {
    x: 2,
    y: 0,
    z: 3
  }
];

b = new Blocks(data);
