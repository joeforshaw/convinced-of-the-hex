function Player(_number, _colour, _claimedColour) {
  var colour        = _colour;
  var claimedColour = _claimedColour;
  var number        = _number;
  var currentHex;

  this.getColour        = function() { return colour;        }
  this.getClaimedColour = function() { return claimedColour; }
  this.getNumber        = function() { return number;        }
  this.getCurrentHex    = function() { return currentHex;    }

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
