var N = 6;
var RADII = 100;

var points = [];
var lines = [];

function generatePoints() {
  console.log('generatePoints');
  var alpha = 0;
  for(var i=0; i<N; ++i) {
    var x = sin(alpha) * RADII;
    var y = cos(alpha) * RADII;
    points.push({x: x, y: y})
    alpha += TWO_PI/N;
  }
}

function generateLines() {
  for(var i=0; i<points.length; ++i) {
    for(var j=i+1; j<points.length; ++j) {
      lines.push({a: points[i], b: points[j]});
    }
  }
}

function setup() {
  console.log('setup');
  createCanvas(300, 300);
  generatePoints();
  generateLines();
}

function drawPoints() {
  for(point of points) {
    ellipse(point.x, point.y, 4, 4);
  }
}

function drawLine(l) {
  line(l.a.x, l.a.y, l.b.x, l.b.y);
}

function drawLines(_lines) {
  for(l of _lines) {
    drawLine(l);
  }
}

function takeRandomElement(array) {
  return array[Math.floor(Math.random()*array.length)];
}

function shuffleArrayInplace(array) {
  // http://stackoverflow.com/a/2450976/433685
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function drawRandomLines() {
  var cloned = lines.slice(0);
  cloned = shuffleArrayInplace(cloned);
  cloned = cloned.slice(0, 6);
  drawLines(cloned);
  /*var r = random(N);
  for(var i=0; i<N; ++i) {
    drawLine( takeRandomElement(lines) );
  }*/
}

function doDraw() {
  background(255);
  push();
  translate(width/2, height/2);
  stroke(0, 50);
  drawPoints();
  stroke(0, 10);
  drawLines(lines);
  stroke(0);
  drawRandomLines();
  pop();
}

function draw() {
  
  doDraw();
  noLoop();
  
  setInterval(function() {
    doDraw();
  }, 1000);
}