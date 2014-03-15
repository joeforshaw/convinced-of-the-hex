function Boost(_hex) {
  var hex = _hex;

  this.claim = function(_player) {
    if (Math.random() < 0.5) {
      this.claimRow(_player);
    } else {
      this.claimColumn(_player);
    }
    hex.setBoost(undefined);
  }

  this.claimRow = function(_player) {
    for (var i = 0; i < config.gridWidth; i++) {
      if (!hexGrid[i][hex.getYIndex()].isOccupied()) {
        hexGrid[i][hex.getYIndex()].setPlayer(_player, false);
      }
    }
    hexGrid[hex.getXIndex()][hex.getYIndex()].setPlayer(_player, true);
  }

  this.claimColumn = function(_player) {
    for (var j = 0; j < config.gridHeight; j++) {
      if (!hexGrid[hex.getXIndex()][j].isOccupied()) {
        hexGrid[hex.getXIndex()][j].setPlayer(_player, false);
      }
    }
    hexGrid[hex.getXIndex()][hex.getYIndex()].setPlayer(_player, true);
  }

}
