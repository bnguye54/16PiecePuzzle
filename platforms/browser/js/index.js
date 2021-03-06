var app = function() {
  var self = {};
  self.is_configured = false;

  Vue.config.silent = false; // show all warnings

  // Extends an array
  self.extend = function(a, b) {
    for (var i = 0; i < b.length; i++) {
      a.push(b[i]);
    }
  };

  // Enumerates an array.
  var enumerate = function(v) {
    var k = 0;
    v.map(function(e) {
      e._idx = k++;
    });
  };

  // Initializes an attribute of an array of objects.
  var set_array_attribute = function(v, attr, x) {
    v.map(function(e) {
      e[attr] = x;
    });
  };

  self.initialize = function() {
    document.addEventListener("deviceready", self.ondeviceready, false);
  };

  self.ondeviceready = function() {
    // This callback is called once Cordova has finished
    // its own initialization.
    console.log("The device is ready");
    $("#vue-div").show(); // This is jQuery.
    self.is_configured = true;
  };

  self.reset = function() {
    self.vue.board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  };

  self.shuffle = function(i, j) {
    var xpos = [-1, 0, 0, 1];
    var ypos = [0, 1, -1, 0];
    for (var x = 0; x < xpos.length; x++) {
      for (var y = 0; y < ypos.length; y++) {
        if (
          document
            .getElementsByClassName("black")
            .innerHTML.equals((i + xpos[x], j + ypos[y]))
        ) {
          //if black tile is next to clicked tile, swap
          var name = board[4 * i + j];
          document.getElementById("name").className = "black";
        }
      }
    }
    console.log("Shuffle:" + i + ", " + j);
  };

  self.scramble = function() {
    console.log("HELLO?"); };

  self.vue = new Vue({
    el: "#vue-div",
    delimiters: ["${", "}"],
    unsafeDelimiters: ["!{", "}"],
    data: {
      board: []
    },
    methods: {
      reset: self.reset,
      shuffle: self.shuffle,
      scramble: self.scramble
    }
  });

  self.reset();

  return self;
};

var APP = null;
// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function() {
  APP = app();
  APP.initialize();
});
