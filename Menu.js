function Menu(_layer) {
  var layer   = _layer;
  var buttons = [];
  var controlsShowing = false;

  this.drawStartMenu = function() {
    buttons.push(createButton(4, 1, "Play", 5.5, play));
    buttons.push(createButton(5, 1, "Controls", 5.4, controls));
    buttons.push(createButton(5, 2, "Twitter", 5, twitter));
    layer.draw();
  }

  function createButton(_xIndex, _yIndex, _text, _positionFactor, _clickFunction) {
    var hex = hexGrid[_xIndex][_yIndex]
    var buttonImage = hex.getImage();
    buttonImage.setFill("4FFF81");

    var text = createButtonText(hex, _text, 15, _positionFactor);
    hex.setText(text);

    buttonImage.on('mouseover', toPointer);
    buttonImage.on('mouseout', toCursor);
    buttonImage.on('click', _clickFunction);
    text.on('mouseover', toPointer);
    text.on('click', _clickFunction);

    return hex;
  }

  function createButtonText(_hex, _text, _size, _positionFactor) {
    var position = _hex.getImage().getPosition();
    var text = new Kinetic.Text({
      x: position.x - (_text.length * _positionFactor),
      y: position.y - 6,
      text: _text,
      fontSize: _size,
      fontFamily: 'Vermin Vibes',
      fill: colour.background
    });
    layer.add(text);
    return text;
  }

  function toPointer() {
    document.body.style.cursor = 'pointer';
  }

  function toCursor() {
    document.body.style.cursor = 'default';
  }

  function play() {
    config.playing = true;
    for (var i = 0; i < config.gridWidth; i++) {
      for (var j = 0; j < config.gridHeight; j++) {
        if (hexGrid[i][j].hasText()) {
          hexGrid[i][j].getText().remove();
        }
        if (!hexGrid[i][j].isOccupied()) {
          hexGrid[i][j].getImage().setFill(colour.unclaimed);
        }
        hexGrid[i][j].getImage().setListening(false);
      }
    }
    layer.draw();
  }

  function controls() {
    if (controlsShowing) {
      return;
    }
    controlsShowing = true;

    var player1 = hexGrid[3][2];
    player1.getImage().setFill(colour.player1);
    player1.setText(createButtonText(player1, "Player 1", 15, 5));

    hexGrid[2][1].setText(createButtonText(hexGrid[2][1], "W", 20, 7));
    hexGrid[3][1].setText(createButtonText(hexGrid[3][1], "E", 20, 7));
    hexGrid[4][2].setText(createButtonText(hexGrid[4][2], "D", 20, 7));
    hexGrid[3][3].setText(createButtonText(hexGrid[3][3], "X", 20, 7));
    hexGrid[2][3].setText(createButtonText(hexGrid[2][3], "Z", 20, 7));
    hexGrid[2][2].setText(createButtonText(hexGrid[2][2], "A", 20, 7));

    var player2 = hexGrid[7][2];
    player2.getImage().setFill(colour.player2);
    player2.setText(createButtonText(player2, "Player 2", 15, 5));

    hexGrid[6][1].setText(createButtonText(hexGrid[6][1], "U", 20, 7));
    hexGrid[7][1].setText(createButtonText(hexGrid[7][1], "I", 20, 7));
    hexGrid[8][2].setText(createButtonText(hexGrid[8][2], "K", 20, 7));
    hexGrid[7][3].setText(createButtonText(hexGrid[7][3], "M", 20, 7));
    hexGrid[6][3].setText(createButtonText(hexGrid[6][3], "N", 20, 7));
    hexGrid[6][2].setText(createButtonText(hexGrid[6][2], "H", 20, 7));

    layer.draw();
  }

  function twitter() {
    window.location.href = 'https://twitter.com/___joeforshaw';
  }

}
