 self.shuffle = function(i, j) {
    var xpos = [0, 1, 0, -1];
    var ypos = [1, 0, -1, 0];
    for (var x = 0; x < xpos.length; x++) {
        if (blackTile == ((i + xpos[x] + ", "+ (j + ypos[x])))
        ){
            var clickedTile = self.vue.board[4*i+j];
            var prevBlackID = clickedTile + xpos[x]+ypos[x];
            var prevBlackVal = self.vue.board[4*(i+xpos[x])+(j+ypos[x])];
            console.log("NEXT TO BLACK");
            blackTile = (i + ", "+ j ); 
            console.log("clicked Tile at: " + clickedTile);
            console.log("Prev BlackTile at: " + prevBlackVal);
            if ( document.getElementById(clickedTile).classList.contains('red')){
              console.log("INSIDE RED");
              console.log("clicked Tile at: " + clickedTile);
              console.log("Prev BlackTile at: " + prevBlackID);
              document.getElementById(clickedTile).classList.add("black");
              console.log("clickedTile added black at: " + clickedTile);
              document.getElementById(clickedTile).classList.remove("red");
              console.log("clickedTile removed white at: " + clickedTile);
              document.getElementById(prevBlackID).classList.remove("black");
              console.log("prevBlackID removed black at: " + prevBlackID);
              document.getElementById(prevBlackID).classList.add('red');
              console.log("prevBlackID added red at: " + prevBlackID);
            }
            if ( document.getElementById(clickedTile).classList.contains('white')){
              console.log("INSIDE WHITE");
              console.log("clicked Tile at: " + clickedTile);
              console.log("Prev BlackTile at: " + prevBlackID);
              document.getElementById(clickedTile).classList.add("black");
              console.log("clickedTile added black at: " + clickedTile);
              document.getElementById(clickedTile).classList.remove("white");
              console.log("clickedTile removed white at: " + clickedTile);
              document.getElementById(prevBlackID).classList.remove("black");
              console.log("prevBlackID removed black at: " + prevBlackID);
              document.getElementById(prevBlackID).classList.add('white');
              console.log("prevBlackID added white at: " + prevBlackID);
            }
            Vue.set(self.vue.board,[4*i+j],prevBlackVal);
            Vue.set(self.vue.board,[4*(i+xpos[x])+(j+ypos[x])],clickedTile);

            
          }
       //console.log("can't Shuffle piece.");
    }