// Hexagon dimensions
var hexRadius = 60;
var hexHeight = (hexRadius * Math.sqrt(3));
var hexSide = hexRadius * 3 / 2;

// Hexagon grid size
var gridWidth = 10;
var gridHeight = 5;

var gameCount = 20;
gameCounter = setInterval(timer, 1000); //1000 will  run it every 1 second
function timer() {
  gameCount = gameCount-1;
  if (gameCount < 0)
  {
    clearInterval(gameCounter);
    playing = false;
    if (scores[0] == scores[1]) {
     alert("< DRAW >")
    } else if (scores[0] > scores[1]) {
     alert("< YELLOW WINS > " + scores[0] + " to " + scores[1]);
    } else if (scores[0] < scores[1]) {
     alert("< PURPLE WINS > " + scores[1] + " to " + scores[0]);
    }
    return;
  } else {
    countdown.setText("Time remaining: " + gameCount);
    countdown.getLayer().draw();
  }

  plantSpecial();

}

function plantSpecial() {
  seed = Math.random();
  if (seed < 0.4) {
    var hexIndex = pickHex();
    hexGrid[hexIndex[0]][hexIndex[1]].setBoost(true);
  }
}

function pickHex() {
  var widthMax = gridWidth - 1;
  var widthMin = 0;
  var heightMax = gridHeight - 1;
  var heightMin = 0;
  var x = Math.floor(Math.random() * (widthMax - widthMin + 1)) + widthMin;
  var y = Math.floor(Math.random() * (heightMax - heightMin + 1)) + heightMin;
  return [x,y];
}

if (gameCounter < 0) {
  clearInterval(gameCounter);
}



playing = true;

// Player scores
scores = [1,1];

// Hexagon grid
hexGrid = new Array();

var stage = new Kinetic.Stage({
  container: 'hex',
  width: 1600,
  height: 800
});

var layer = new Kinetic.Layer();

title = new Kinetic.Text({
  x: 40,
  y: 40,
  text: '< CONVINCED OF THE HEX >',
  fontSize: 55,
  fontFamily: 'Vermin Vibes',
  fill: 'rgb(240,240,240)'
});

countdown = new Kinetic.Text({
  x: 900,
  y: 60,
  text: 'Time remaining: ' + gameCount,
  fontSize: 30,
  fontFamily: 'Vermin Vibes',
  fill: 'rgb(240,240,240)'
});

layer.add(countdown);
layer.add(title);

var hexagons = [];
for(var i = 0; i < gridWidth; i++){
  hexGrid[i] = [];
  for(var j = 0; j < gridHeight; j++){
    hexagons[i] = createHexagon(i,j);

    hexGrid[i].push(new Hexagon(hexagons[i], i , j))

    //add the shape to the layer
    layer.add(hexagons[i]);
  }//end j
}//end i

players = new Array();
players.push(new Player(0, hexGrid[0][0], "FFA621", "FFF700", gridWidth, gridHeight));
players.push(new Player(1, hexGrid[gridWidth - 1][gridHeight - 1], "C800CF", "E692FF", gridWidth, gridHeight));

// add the layer to the stage
stage.add(layer);

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 69) { // W Key
      players[0].move(0);
  } else if (e.keyCode == 68) { // E Key
      players[0].move(1);
  } else if (e.keyCode == 88) { // D Key
      players[0].move(2);
  } else if (e.keyCode == 90) { // X Key
      players[0].move(3);
  } else if (e.keyCode == 65) { // Z Key
      players[0].move(4);
  } else if (e.keyCode == 87) { // A Key
      players[0].move(5);
  }

  if (e.keyCode == 73) { // W Key
      players[1].move(0);
  } else if (e.keyCode == 75) { // E Key
      players[1].move(1);
  } else if (e.keyCode == 77) { // D Key
      players[1].move(2);
  } else if (e.keyCode == 78) { // X Key
      players[1].move(3);
  } else if (e.keyCode == 72) { // Z Key
      players[1].move(4);
  } else if (e.keyCode == 85) { // A Key
      players[1].move(5);
  }

  stage.draw();
});

function createHexagon(i,j) {
  return new Kinetic.RegularPolygon({
    //add a tad less than half of the radius for even rows
    x: i*120+80+(j%2)*60,
    //the 30 is based off of
    y: j*110+200,
    sides: 6,
    radius: hexRadius,
    fill: '59F7F2',
    stroke: 'transparent',
    strokeWidth: 0,
  });
}
