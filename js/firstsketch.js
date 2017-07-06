window.onload = function setup() {

    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("sketch-holder");



}

function draw() {
  background(0);
  stroke(100);
  for (var i = 0; i < 200; i += 20) {
    bezier(mouseX-(i/2.0), 40+i, mouseY-410, 20, 440, 300, 240-(i/16.0), 300+(i/8.0));

  }

}
