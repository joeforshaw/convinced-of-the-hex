function Player(_number, _colour, _claimedColour) {
  this.colour        = _colour;
  this.claimedColour = _claimedColour;

  var currentHex;
  var number        = _number;

  this.getCurrentHex = function() { return currentHex; }
  this.getNumber     = function() { return number;     }

  this.setCurrentHex = function(_currentHex) {
    if (currentHex !== undefined) {
      currentHex.setPlayer(this, false);
    }
    currentHex = _currentHex;
    if (currentHex !== undefined) {
      currentHex.setPlayer(this, true);
    }
  }

  this.move = function(_direction) {
    if (!config.playing) return;

    this.setCurrentHex(currentHex.getAdjacent(_direction));

    if (currentHex.hasBoost()) {
      currentHex.getBoost().claim(this);
    }
    stage.draw();
  }

}
