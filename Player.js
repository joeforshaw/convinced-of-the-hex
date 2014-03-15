MOVE_NE = 0;
MOVE_E  = 1;
MOVE_SE = 2;
MOVE_SW = 3;
MOVE_W  = 4;
MOVE_NW = 5;

function Player(number, currentHex, colour, claimedColour, gridWidth, gridHeight) {
  this.number = number;
  this.colour = colour;
  this.claimedColour = claimedColour;
  this.currentHex = currentHex;
  this.currentHex.setPlayer(this);
  this.gridWidth = gridWidth;
  this.gridHeight = gridHeight;

  this.getCurrentHex = getCurrentHex;
  function getCurrentHex() {
    return this.currentHex;
  }

  this.setCurrentHex = setCurrentHex;
  function setCurrentHex(currentHex) {
    currentHex.setOwned(number);

    this.currentHex.setPlayer(undefined);
    this.currentHex = currentHex;
    this.currentHex.setPlayer(this);
    this.currentHex.owned = this.number;

  }

  this.setColour = setColour;
  function setColour(colour) {
    this.colour = colour;
  }

  this.move = move;
  function move(direction) {
    if (!playing) {
      return;
    }

    var newCoords = this.getNextHex(direction);

    // console.log(newXIndex, newYIndex);
    this.setCurrentHex(hexGrid[newCoords[0]][newCoords[1]]);

    if (this.currentHex.boost) {
      seed = Math.random();
      if (seed < 0.5) {
        this.claimColumn(newCoords[0], newCoords[1]);
      } else {
        this.claimRow(newCoords[0], newCoords[1]);
      }
      this.currentHex.boost = false;
    }
  }

  this.getNextHex = getNextHex;
  function getNextHex(direction) {
    var newXIndex = -1;
    var newYIndex = -1;
    if (this.currentHex.yIndex % 2 == 0) {
      // console.log("even", direction);
      if (direction === MOVE_E) {
        // console.log("east");
        newXIndex = this.currentHex.xIndex + 1;
        newYIndex = this.currentHex.yIndex;
      } else if (direction === MOVE_SE) {
        // console.log("south east");
        newXIndex = this.currentHex.xIndex;
        newYIndex = this.currentHex.yIndex + 1;
      } else if (direction === MOVE_SW) {
        // console.log("south west");
        newXIndex = this.currentHex.xIndex - 1;
        newYIndex = this.currentHex.yIndex + 1;
      } else if (direction === MOVE_W) {
        // console.log("west");
        newXIndex = this.currentHex.xIndex - 1;
        newYIndex = this.currentHex.yIndex;
      } else if (direction === MOVE_NW) {
        // console.log("north west");
        newXIndex = this.currentHex.xIndex - 1;
        newYIndex = this.currentHex.yIndex - 1;
      } else if (direction === MOVE_NE) {
        // console.log("north east");
        newXIndex = this.currentHex.xIndex;
        newYIndex = this.currentHex.yIndex - 1;
      }
    } else {
      // console.log("odd", direction);
      if (direction === MOVE_NE) {
        // console.log("north east");
        newXIndex = this.currentHex.xIndex + 1;
        newYIndex = this.currentHex.yIndex - 1;
      } else if (direction === MOVE_E) {
        // console.log("east");
        newXIndex = this.currentHex.xIndex + 1;
        newYIndex = this.currentHex.yIndex;
      } else if (direction === MOVE_SE) {
        // console.log("south east");
        newXIndex = this.currentHex.xIndex + 1;
        newYIndex = this.currentHex.yIndex + 1;
      } else if (direction === MOVE_SW) {
        // console.log("south west");
        newXIndex = this.currentHex.xIndex;
        newYIndex = this.currentHex.yIndex + 1;
      } else if (direction === MOVE_W) {
        // console.log("west");
        newXIndex = this.currentHex.xIndex - 1;
        newYIndex = this.currentHex.yIndex;
      } else if (direction === MOVE_NW) {
        // console.log("north west");
        newXIndex = this.currentHex.xIndex;
        newYIndex = this.currentHex.yIndex - 1;
      }
    }
    if (newXIndex < 0) {
      newXIndex = 0;
    }
    if (newXIndex >= gridWidth) {
      newXIndex = gridWidth - 1;
    }
    if (newYIndex < 0) {
      newYIndex = 0;
    }
    if (newYIndex >= gridHeight) {
      newYIndex = gridHeight - 1;
    }
    return [newXIndex, newYIndex];
  }

  this.claimRow = claimRow;
  function claimRow(newXIndex, newYIndex) {
    for (var i = 0; i < gridWidth; i++) {
      hexGrid[i][newYIndex].setOwned(this.number);
      hexGrid[i][newYIndex].setColour(this.claimedColour);
      console.log(i, newXIndex, hexGrid[i][newYIndex])
    }
  }

  this.claimColumn = claimColumn;
  function claimColumn(newXIndex, newYIndex) {
    for (var i = 0; i < gridHeight; i++) {
      if (!hexGrid[newXIndex][i].boost && hexGrid[newXIndex][i].player === undefined) {
        hexGrid[newXIndex][i].setColour(this.claimedColour);
      }
      if (hexGrid[newXIndex][i].player === undefined) {
        hexGrid[newXIndex][i].setOwned(this.number);
      }
    }
  }

}
