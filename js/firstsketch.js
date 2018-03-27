 function setup() {
    // var canvas = createCanvas(window.innerWidth, window.innerHeight);
    var canvas = createCanvas(window.innerWidth, window.innerHeight);

    canvas.parent("sketch-holder");

      background(0);

      stroke(255, 255, 255, 100);

      // create turtles starting form middle, looking opposite ways
      x1 = window.innerWidth/2;
      y1 = window.innerHeight/2;
      turtle1 = new Turtle(x1,y1,0);

      x2 = window.innerWidth/2;
      y2 = window.innerHeight/2;
      turtle2 = new Turtle(x2,y2,180);

      // COMPUTE THE L-SYSTEM
      for (var i = 0; i < numloops; i++) {
        thestring = lindenmayer(thestring);
      }
}

// function draw() {
//
//   if(mouseX != previousMouseX || mouseY != previousMouseY) {
//
//     line(mouseX, mouseY, mouseX+30, mouseY);
//     previousMouseX = mouseX;
//     previousMouseY = mouseY;
//
//   }
//
//   // var c = color(mouseX, mouseY, 1);
//   // fill(c);
//   // rect(0,0,width,height);
//
// }

// window.onresize = function() {
// var w = window.innerWidth;
// var h = window.innerHeight;
// resizeCanvas(w,h,true);
// width = w;
// height = h;
//
// };

// TURTLE STUFF
var turtle1 ={};
var turtle2 ={}; //turtle variables
var step = 20; // how much the turtle moves with each 'F'
var angle = 90; // how much the turtle turns with a '-' or '+'

// LINDENMAYER STUFF (L-SYSTEMS)
var thestring = 'A'; // "axiom" or start of the string
var numloops = 5; // how many iterations to pre-compute
var therules = []; // array for rules
therules[0] = ['A', '-BF+AFA+FB-']; // first rule
therules[1] = ['B', '+AF-BFB-FA+']; // second rule

var whereinstring = 0; // where in the L-system are we?


function draw() {

  // draw the current character in the string:
  drawIt(turtle1,thestring[whereinstring]);
  drawIt(turtle2,thestring[whereinstring]);

  // increment the point for where we're reading the string.
  // wrap around at the end.
  whereinstring++;
  if (whereinstring > thestring.length-1) whereinstring = 0;

}

// interpret an L-system
function lindenmayer(s) {
  var outputstring = ''; // start a blank output string

  // iterate through 'therules' looking for symbol matches:
  for (var i = 0; i < s.length; i++) {
    var ismatch = 0; // by default, no match
    for (var j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0])  {
        outputstring += therules[j][1]; // write substitution
        ismatch = 1; // we have a match, so don't copy over symbol
        break; // get outta this for() loop
      }
    }
    // if nothing matches, just copy the symbol over.
    if (ismatch == 0) outputstring+= s[i];
  }

  return outputstring; // send out the modified string
}

// this is a custom function that draws turtle commands
function drawIt(turtle, k) {
  if (k=='F') { // draw forward
    // polar to cartesian based on step and currentangle:
    var xaux = turtle.x + step*cos(radians(turtle.currentangle));
    var yaux = turtle.y + step*sin(radians(turtle.currentangle));
    line(turtle.x, turtle.y, xaux, yaux); // connect the old and the new

    // update the turtle's position:
    turtle.x = xaux;
    turtle.y = yaux;
  } else if (k == '+') {
    turtle.currentangle += angle; // turn left
  } else if (k == '-') {
    turtle.currentangle -= angle; // turn right
  }

  // give me some random color values:
  var r = random(128, 255);
  var g = random(0, 192);
  var b = random(0, 50);
  var a = random(50, 100);

  // pick a gaussian (D&D) distribution for the radius:
  var radius = 0;
  radius += random(0, 15);
  radius += random(0, 15);
  radius += random(0, 15);
  radius = radius/3;

      if (mouseIsPressed) {
        radius = radius *2;
      }
  // draw the stuff:
  fill(r, g, b, a);
  ellipse(turtle.x, turtle.y, radius, radius);
}

// Turtle class
function Turtle (x,y,startAngle) {
  this.x = x;
  this.y = y;
  this.currentangle = startAngle;
}
//
// Turtle.getX = function() {
//   return this.x;
// };
//
// Turtle.getY = function() {
//   return this.y;
// };
