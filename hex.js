// Hexagon dimensions
var hexRadius = 60;
var hexHeight = (hexRadius * Math.sqrt(3));
var hexSide = hexRadius * 3 / 2;

// Hexagon grid size
var gridWidth = 10;
var gridHeight = 5;

var stage = new Kinetic.Stage({
  container: 'hex',
  width: 1600,
  height: 800
});

var layer = new Kinetic.Layer();

var hexagons = [];
for(var i = 0; i < gridWidth; i++){
  for(var j = 0; j < gridHeight; j++){
      hexagons[i] = new Kinetic.RegularPolygon({
        //add a tad less than half of the radius for even rows
        x: i*120+50+(j%2)*60,
        //the 30 is based off of
        y: j*110+55,
        sides: 6,
        radius: hexRadius,
        fill: 'FF0DEB',
        stroke: 'rgb(200,200,200)',
        strokeWidth: 1,
      });
      //do something when mouse enters shape
      hexagons[i].on('mouseover touchstart', function() {
        this.setFill('blue');
        this.setOpacity(1);
        layer.draw();
      });
      //do something when mouse exits shape
      hexagons[i].on('mouseout touchend', function() {
        this.setFill('red');
        this.setOpacity(0);
        layer.draw();
      });
      //add the shape to the layer
      layer.add(hexagons[i]);
  }//end j
}//end i

// add the layer to the stage
stage.add(layer);
