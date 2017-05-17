
var app = function() {
  var blackTileVAL;
  var blackTileCORD;
  var blackTileArraySpot;
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
    blackTile = "3,3";
    blackTileVAL = "";
  };

  self.ondeviceready = function() {
    // This callback is called once Cordova has finished
    // its own initialization.
    console.log("The device is ready");
    $("#vue-div").show(); // This is jQuery.
    self.is_configured = true;
  };

  self.reset = function() {
    for (var i = 0; i < 15; i++){
      document.getElementsByTagName("td")[i].innerHTML= i+1;
    }
     document.getElementsByTagName("td")[15].innerHTML= ""
     for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 4; j++) {
            if((j+i)%2==0){
              document.getElementById(i+ ','+ j).classList.add('red');
              document.getElementById(i+ ','+ j).classList.remove("black");
              document.getElementById(i+ ','+ j).classList.remove("white");
            }
            
            if((j+i)%2!=0 && 4*i+j != 15){
              document.getElementById(i+ ','+ j).classList.add('white');
              document.getElementById(i+ ','+ j).classList.remove('red');
              document.getElementById(i+ ','+ j).classList.remove("black");
            }
            if(4*i+j == 15){
              document.getElementById(i+ ','+ j).classList.add('black');
              document.getElementById(i+ ','+ j).classList.remove('red');
              document.getElementById(i+ ','+ j).classList.remove("white");
            }
          };
        };
    
    self.vue.board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
            
    blackTileCORD = "3,3";
    blackTileVAL = "";
    blackTileArraySpot = "16";

  };


  self.shuffle = function(clickedTileID , i , j) {
    var xpos = [0, 1, 0, -1];
    var ypos = [1, 0, -1, 0];
    var clickedVAL = document.getElementById(clickedTileID).innerText;
    
        for (var x = 0; x < xpos.length; x++) {
        if (blackTileCORD ==((i+xpos[x])+','+(j+ypos[x]))){
         //swap Tile VALS | swap values of clicked and black tile
         var tempClickedVAL = clickedVAL;
          document.getElementById(clickedTileID).innerText = blackTileVAL;
          document.getElementById(blackTileCORD).innerText = tempClickedVAL;
          console.log("blackTileCORD!" + blackTileCORD) ;
          if (document.getElementById(clickedTileID).classList.contains('red')){
              document.getElementById(clickedTileID).classList.remove("red");
              document.getElementById(clickedTileID).classList.add("black");
              document.getElementById(blackTileCORD).classList.remove("black");
              document.getElementById(blackTileCORD).classList.add('red');
              console.log("INSIDE RED");
          }
          if (document.getElementById(clickedTileID).classList.contains('white')){
              document.getElementById(clickedTileID).classList.remove("white");
              document.getElementById(clickedTileID).classList.add("black");
              document.getElementById(blackTileCORD).classList.remove("black");
              document.getElementById(blackTileCORD).classList.add('white');
              console.log("INSIDE white");
          }
          blackTileCORD = clickedTileID;
          break;
        }
    };
  };

  self.scramble = function(r,c) {
     for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if((j+i)%2==0){
          document.getElementById(i+ ','+ j).classList.add('red');
          document.getElementById(i+ ','+ j).classList.remove("black");
          document.getElementById(i+ ','+ j).classList.remove("white");
        }
        if((j+i)%2!=0 && 4*i+j != 15){
          document.getElementById(i+ ','+ j).classList.add('white');
          document.getElementById(i+ ','+ j).classList.remove('red');
          document.getElementById(i+ ','+ j).classList.remove("black");
        }
      };
    };
 //declare and populate array
 var _array = new Array();
 for (var i = 0; i < r*c-1; i++){_array[i] = i;}
 //shuffle tiles
 for (var i = 0; i <= r*c-1; i++)
 {
   var rand = Math.floor(Math.random() * _array.length);
   var temp = _array[rand];
   _array[rand] = _array[i];
   _array[i] = temp;
   console.log(_array[i] + "VALUE HERE");
 }
 //check to see if puzzle is solveable
 var count = 0;
 for (var i = 0; i <= r*c-1; i++){
   for (var j = i; j <= r*c-1; j++)
   {
      if (_array[j] < _array[i])
      {
         count++;
      }
   }
 }

 if (Math.floor(count/2) != count/2)
 {
   self.scramble(r, c);
 }
 else
 {
   for (var i = 0; i < r*c; i++)
   {
      console.log("count = " + i);   
      document.getElementsByTagName("td")[i].innerHTML = _array[i]+1;
        if(isNaN(_array[i])){
          document.getElementsByTagName("td")[i].innerHTML = "";
          document.getElementsByTagName("td")[i].classList.add('black');
          document.getElementsByTagName("td")[i].classList.remove('red');
          document.getElementsByTagName("td")[i].classList.remove("white");
          blackTileCORD = document.getElementsByTagName("td")[i].id;
          blackTileArraySpot = i;
          console.log("BLACKTILE SPOT = " + blackTileArraySpot);
          console.log("BLACKTILE CORD = " + blackTileCORD);
          
        }
        if(document.getElementsByTagName("td")[i].innerText==1 ||
           document.getElementsByTagName("td")[i].innerText==3 || 
           document.getElementsByTagName("td")[i].innerText==6 ||
          document.getElementsByTagName("td")[i].innerText==8 || 
          document.getElementsByTagName("td")[i].innerText==9 ||
          document.getElementsByTagName("td")[i].innerText== 11 ||
          document.getElementsByTagName("td")[i].innerText==14){

          document.getElementsByTagName("td")[i].classList.add('red');
          document.getElementsByTagName("td")[i].classList.remove("black");
          document.getElementsByTagName("td")[i].classList.remove("white");
        }
        if(document.getElementsByTagName("td")[i].innerText==2  ||
           document.getElementsByTagName("td")[i].innerText==4  || 
           document.getElementsByTagName("td")[i].innerText==5  ||
          document.getElementsByTagName("td")[i].innerText==7   || 
          document.getElementsByTagName("td")[i].innerText==10  ||
          document.getElementsByTagName("td")[i].innerText== 12 ||
          document.getElementsByTagName("td")[i].innerText==13  ||
          document.getElementsByTagName("td")[i].innerText== 15 ){
          document.getElementsByTagName("td")[i].classList.add('white');
          document.getElementsByTagName("td")[i].classList.remove("black");
          document.getElementsByTagName("td")[i].classList.remove("red");
        }
       
   }

 }
  };

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
class Game {
}

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function() {
  APP = app();
  APP.initialize();
});

