function Hexagon(_image, _xIndex, _yIndex) {
	var boost      = undefined;
	var image      = _image;
	var player     = undefined;
	var text       = undefined;
	var xIndex     = _xIndex;
	var yIndex     = _yIndex;
	var isOccupied = false;

	this.getBoost   = function() { return boost;      }
	this.getImage   = function() { return image;      }
	this.getPlayer  = function() { return player;     }
	this.getText    = function() { return text;       }
	this.getXIndex  = function() { return xIndex;     }
	this.getYIndex  = function() { return yIndex;     }
	this.isOccupied = function() { return isOccupied; }

	this.hasBoost = function() {
		return boost !== undefined;
	}

	this.setBoost = function(_boost) {
		boost = _boost;
		this.calculateColour();
	}

	this.setPlayer = function(_player, _isOccupied) {
		player = _player;
		isOccupied = _isOccupied;
		this.calculateColour();
	}

	this.setText = function(_text) {
		text = _text;
	}

	this.hasText = function() {
		return text !== undefined;
	}

	this.calculateColour = function() {
		if (player !== undefined && isOccupied) {
			image.setFill(player.getColour());
		} else if (this.hasBoost()) {
			image.setFill(colour.boost);
		} else if (player === undefined) {
			image.setFill(colour.unclaimed);
		} else if (player !== undefined) {
			image.setFill(player.getClaimedColour());
		}
		image.getLayer().draw();
	}

	this.getAdjacent = function(_direction) {
		var newXIndex = xIndex;
		var newYIndex = yIndex;

		if (yIndex % 2 == 0) {
			if (_direction === MOVE_E) {
				newXIndex = xIndex + 1;
			} else if (_direction === MOVE_SE) {
				newYIndex = yIndex + 1;
			} else if (_direction === MOVE_SW) {
				newXIndex = xIndex - 1;
				newYIndex = yIndex + 1;
			} else if (_direction === MOVE_W) {
				newXIndex = xIndex - 1;
			} else if (_direction === MOVE_NW) {
				newXIndex = xIndex - 1;
				newYIndex = yIndex - 1;
			} else if (_direction === MOVE_NE) {
				newYIndex = yIndex - 1;
			}
		} else {
			if (_direction === MOVE_E) {
				newXIndex = xIndex + 1;
			} else if (_direction === MOVE_SE) {
				newXIndex = xIndex + 1;
				newYIndex = yIndex + 1;
			} else if (_direction === MOVE_SW) {
				newYIndex = yIndex + 1;
			} else if (_direction === MOVE_W) {
				newXIndex = xIndex - 1;
			} else if (_direction === MOVE_NW) {
				newYIndex = yIndex - 1;
			} else if (_direction === MOVE_NE) {
				newXIndex = xIndex + 1;
				newYIndex = yIndex - 1;
			}
		}
		if (newXIndex < 0) {
			newXIndex = 0;
		} else if (newXIndex >= config.gridWidth) {
			newXIndex = config.gridWidth - 1;
		}

		if (newYIndex < 0) {
			newYIndex = 0;
		} else if (newYIndex >= config.gridHeight) {
			newYIndex = config.gridHeight - 1;
		}

		if (hexGrid[newXIndex][newYIndex].isOccupied()) {
			newXIndex = xIndex;
			newYIndex = yIndex;
		}

		return hexGrid[newXIndex][newYIndex];
	}

}
