function Hexagon(image, xIndex, yIndex) {
	this.image = image;
  this.xIndex = xIndex;
  this.yIndex = yIndex;
  this.player = undefined;
  this.owned = -1;
  this.boost = false;

	this.getPlayer = getPlayer;
	function getPlayer() {
		return this.player;
	}

  this.setPlayer = setPlayer;
  function setPlayer(player) {
    if (player !== undefined) {
      this.setColour(player.colour);
      this.owned = player.number;
    } else {
      if (this.owned == 0) {
        this.setColour("FFF700");
      } else if (this.owned == 1) {
        this.setColour("E692FF");
      }
    }
    this.player = player;
  }

  this.setColour = setColour;
  function setColour(colour) {
    this.image.setFill(colour);
    this.image.getLayer().draw()
  }

  this.setBoost = setBoost;
  function setBoost(boost) {
    this.boost = boost;
    this.setColour("21FF21");
  }

  this.setOwned = setOwned;
  function setOwned(number) {
    if (this.owned != number) {
      scores[number]++;
      if (number == 0 && this.owned == 1) {
        scores[1]--;
      } else if (number == 1 && this.owned == 0) {
        scores[0]--;
      }
    }
  }

}
