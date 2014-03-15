function Menu(_layer) {
  var layer   = _layer;
  var controlsShowing = false;

  this.getStartButtons = function() {
    var buttons = [];
    buttons.push(createButton(4, 1, play));
    buttons.push(createButton(5, 1, controls));
    buttons.push(createButton(5, 2, twitter));
    return buttons;
  }

  function createButton(_xIndex, _yIndex, _clickFunction) {
    var hex = hexGrid[_xIndex][_yIndex]
    var buttonImage = hex.getImage();
    buttonImage.setFill("4FFF81");
    buttonImage.on('mouseover', toPointer);
    buttonImage.on('mouseout', toCursor);
    buttonImage.on('click', _clickFunction);
    return buttonImage;
  }

  this.getStartText = function() {
    var textList = [];
    textList.push(createButtonText(hexGrid[4][1], "Play", 15, 5.5, play));
    textList.push(createButtonText(hexGrid[5][1], "Controls", 15, 5.4, controls));
    textList.push(createButtonText(hexGrid[5][2], "Twitter", 15, 5, twitter));
    return textList;
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
    layer.add(createText(player1, "Player 1", 15, 5));

    layer.add(createText(hexGrid[2][1], "W", 20, 7));
    layer.add(createText(hexGrid[3][1], "E", 20, 7));
    layer.add(createText(hexGrid[4][2], "D", 20, 7));
    layer.add(createText(hexGrid[3][3], "X", 20, 7));
    layer.add(createText(hexGrid[2][3], "Z", 20, 7));
    layer.add(createText(hexGrid[2][2], "A", 20, 7));

    var player2 = hexGrid[7][2];
    player2.getImage().setFill(colour.player2);
    layer.add(createText(player2, "Player 2", 15, 5));

    layer.add(createText(hexGrid[6][1], "U", 20, 7));
    layer.add(createText(hexGrid[7][1], "I", 20, 7));
    layer.add(createText(hexGrid[8][2], "K", 20, 7));
    layer.add(createText(hexGrid[7][3], "M", 20, 7));
    layer.add(createText(hexGrid[6][3], "N", 20, 7));
    layer.add(createText(hexGrid[6][2], "H", 20, 7));

    layer.draw();
  }

  function twitter() {
    window.location.href = 'https://twitter.com/___joeforshaw';
  }

  function createButtonText(_hex, _text, _size, _positionFactor, _clickFunction) {
    var position = _hex.getImage().getPosition();
    var text = new Kinetic.Text({
      x: position.x - (_text.length * _positionFactor),
      y: position.y - 6,
      text: _text,
      fontSize: _size,
      fontFamily: 'Vermin Vibes',
      fill: colour.background
    });
    text.on('mouseover', toPointer);
    text.on('click', _clickFunction);
    _hex.setText(text);
    return text;
  }

  function createText(_hex, _text, _size, _positionFactor) {
    var position = _hex.getImage().getPosition();
    var text = new Kinetic.Text({
      x: position.x - (_text.length * _positionFactor),
      y: position.y - 6,
      text: _text,
      fontSize: _size,
      fontFamily: 'Vermin Vibes',
      fill: colour.background
    });
    _hex.setText(text);
    return text;
  }

}
