config = {
  boostChance  : 0.4,
  gridHeight   : 5,
  gridWidth    : 10,
  hexHeight    : 60 * Math.sqrt(3),
  hexRadius    : 60,
  menuRadius   : 250,
  playing      : false,
  scores       : [1,1],
  timeLimit    : 20,
  windowHeight : 800,
  windowWidth  : 1300
}

colour = {
  background     : "5E3164",
  boost          : "21FF21",
  player1        : "FFA621",
  player1Claimed : "FFF700",
  player2        : "C800CF",
  player2Claimed : "E692FF",
  text           : "F0F0F0",
  unclaimed      : "59F7F2",
}

MOVE_E  = 0;
MOVE_SE = 1;
MOVE_SW = 2;
MOVE_W  = 3;
MOVE_NW = 4;
MOVE_NE = 5;

var stage = new Kinetic.Stage({
  container: 'hex',
  width: config.windowWidth,
  height: config.windowHeight
});

var layer = new Kinetic.Layer();

hexGrid = createHexGrid(layer);

var title = new Kinetic.Text({
  x: 40,
  y: 40,
  text: '< CONVINCED OF THE HEX >',
  fontSize: 55,
  fontFamily: 'Vermin Vibes',
  fill: colour.text
});

var countdownText = new Kinetic.Text({
  x: 900,
  y: 60,
  text: 'Time remaining: ' + config.timeLimit,
  fontSize: 30,
  fontFamily: 'Vermin Vibes',
  fill: colour.text
});
startCountdown(countdownText, layer);

menu = new Menu(layer);

$(window).bind("load", function() {
  menu.getStartButtons().forEach(function(button) {
    layer.add(button);
  });
  menu.getStartText().forEach(function(text) {
    layer.add(text);
  });
  layer.add(countdownText);
  layer.add(title);
});

players = [];
players.push(createPlayer(1, 0, 0, colour.player1, colour.player1Claimed));
players.push(createPlayer(2, config.gridWidth - 1, config.gridHeight - 1, colour.player2, colour.player2Claimed));
setupEventListeners();

stage.add(layer);

function createHexGrid(layer) {
  var grid = [];
  for (var i = 0; i < config.gridWidth; i++){
    grid[i] = [];
    for (var j = 0; j < config.gridHeight; j++){
      grid[i].push(new Hexagon(createHexImage(i,j), i, j));
      layer.add(grid[i][j].getImage());
    }
  }
  return grid;
}

function createPlayer(number, xIndex, yIndex, colour, claimedColour) {
  var player = new Player(number, colour, claimedColour);
  player.setCurrentHex(hexGrid[xIndex][yIndex]);
  return player;
}

function createHexImage(i,j) {
  return new Kinetic.RegularPolygon({
    x: (i * 120) + ((j % 2) * 60) + 80,
    y: (j * 110) + 200,
    sides: 6,
    radius: config.hexRadius,
    fill: colour.unclaimed,
    stroke: 'transparent',
    strokeWidth: 0,
  });
}

function startCountdown(countdownText, layer) {
  var currentTime = config.timeLimit;
  var gameCounter = setInterval(timer, 1000);
  function timer() {
    if (config.playing) {
      currentTime = currentTime - 1;
      plantBoost();
    }

    if (currentTime < 0) {
      config.playing = false;
      clearInterval(gameCounter);
      scores = calculateScores();
      if (scores[0] == scores[1]) {
       alert("< DRAW > " + scores[0] + " - " + scores[1])
      } else if (scores[0] > scores[1]) {
       alert("< YELLOW WINS > " + scores[0] + " - " + scores[1]);
      } else if (scores[0] < scores[1]) {
       alert("< PURPLE WINS > " + scores[1] + " - " + scores[0]);
      }
      return;
    } else {
      countdownText.setText("Time remaining: " + currentTime);
    }
    layer.draw();
  }
}

function plantBoost() {
  if (Math.random() < config.boostChance) {
    var randomHex;
    do {
      randomHex = pickRandomHex();
    } while (randomHex.isOccupied())
    randomHex.setBoost(new Boost(randomHex));
  }
}

function pickRandomHex() {
  return hexGrid
    [Math.floor(Math.random() * (config.gridWidth - 1))]
    [Math.floor(Math.random() * (config.gridHeight - 1))];
}

function calculateScores() {
  var scores = [0, 0];
  for (var i = 0; i < config.gridWidth; i++) {
    for (var j = 0; j < config.gridHeight; j++) {
      if (hexGrid[i][j].getPlayer() !== undefined) {
        scores[hexGrid[i][j].getPlayer().getNumber() - 1]++;
      }
    }
  }
  return scores;
}

function setupEventListeners() {
  window.addEventListener('keydown', function(e) {
    // Player 1
    if (e.keyCode == 68) {        // D
        players[0].move(0);
    } else if (e.keyCode == 88) { // X
        players[0].move(1);
    } else if (e.keyCode == 90) { // Z
        players[0].move(2);
    } else if (e.keyCode == 65) { // A
        players[0].move(3);
    } else if (e.keyCode == 87) { // W
        players[0].move(4);
    } else if (e.keyCode == 69) { // E
        players[0].move(5);
    }

    // Player 2
    else if (e.keyCode == 75) {   // K
        players[1].move(0);
    } else if (e.keyCode == 77) { // M
        players[1].move(1);
    } else if (e.keyCode == 78) { // N
        players[1].move(2);
    } else if (e.keyCode == 72) { // H
        players[1].move(3);
    } else if (e.keyCode == 85) { // U
        players[1].move(4);
    } else if (e.keyCode == 73) { // I
        players[1].move(5);
    }
  });
}
