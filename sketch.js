// Created based on The Nature of Code by Daniel Shiffman
// http://natureofcode.com

// A reference to our box2d world
var world;

// A list for all of our particles
var particles = [];

var walls = [];

var b;

//buttons
var b1 = false;
var b2 = false;
var b3 = false;
var b4 = false;
var b5 = false;

//mobile touch point
var lastPt=null;


function setup() {
  //var w = window.innerWidth;
  //var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var w = document.documentElement.clientWidth;
  socket.emit('clientWidth',{w: w});

  //if it's computer, create a rectangle canvas
  if(w > 600){
    w = window.innerWidth;
    createCanvas(w,w/2);
  }else{
    //if it's a mobile browser, create a square canvas
    w = document.documentElement.clientWidth;
    createCanvas(w,w);
  }

  // Initialize box2d physics and create the world
  world = createWorld();

  Tone.Transport.start();

  world.SetContactListener(new CustomListener());

  walls.push(new Boundary(width/10, height-5, width/8, 10));

  //var sz = random(4,8);
  particles.push(new Particle(60, 20));
}

function draw() {
  background(0);
  // var step = 40 - 5*ballSpeed;
  // var timeStep = 1.0/step;
  // console.log(step);
  // // We must always step through time!
  var timeStep = 1.0/30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,10,10);

  //add more balls if the slider value changed
  if (random(1) <  0.02*ballSpeed) {
    particles.push(new Particle(60, 20));
  }
  
  // Display all balls
  for (var i = 0; i < particles.length; i++) {
    particles[i].display();
    // Particles that leave the screen, we delete them
    // (note they have to be deleted from both the box2d world and our list
    if (particles[i].done()) {
      particles.splice(i,1);
      particles.push(new Particle(60, 20)); 
    }
  }
  //display all walls
  for (var i = 0; i < walls.length; i ++) {
    walls[i].display();
  }

}

//when add a boundary when mouse pressed
function mousePressed(){
  b = new Boundary();
  b.x = mouseX;
  b.y = mouseY;
}
//save all the points alone mouse drag
function mouseDragged(){
  if(b){
    b.addPoint(mouseX, mouseY);
  }
  
}
//make the chainshape, add a boundary to walls
function mouseReleased(){
  if(b){
      b.makeShape();
      walls.push(b);
  }
  
}

function button1(){
  document.getElementById("touchText").innerHTML = "button1";
  b1 = true;
  b2 = false;
  b3 = false;
  b4 = false;
  b5 = false;
  // console.log(b1);
}

function button2(){
  document.getElementById("touchText").innerHTML = "button2";
  b1 = false;
  b2 = true;
  b3 = false;
  b4 = false;
  b5 = false;
  // console.log(b2);
}

function button3(){
  b1 = false;
  b2 = false;
  b3 = true;
  b4 = false;
  b5 = false;
  document.getElementById("touchText").innerHTML = "button3";
  // console.log(b3);
}

function button4(){
  b1 = false;
  b2 = false;
  b3 = false;
  b4 = true;
  b5 = false;
  document.getElementById("touchText").innerHTML = "button4";
  // console.log(b4);
}

function button5(){
  b1 = false;
  b2 = false;
  b3 = false;
  b4 = false;
  b5 = true;
  document.getElementById("touchText").innerHTML = "button5";
  // console.log(b5);
}

//mobile touchstart, touchmove, touchend
//when there is a touch, create a new boundary, save the first point
function touchStarted(){
    document.getElementById("touchText").innerHTML = "touchStarted";

    b = new Boundary();
    b.x = touches[0].x;
    b.y = touches[0].y;
    lastPt = {x:touches[0].x, y:touches[0].y};

    var possible = {savedEvent: 'touchStarted', data: {x: lastPt.x, y: lastPt.y}};
    toSend.push(possible);

    return false;
}

//when finger dragged, send all the points into boundary
function touchMoved() {
  document.getElementById("touchText").innerHTML = "touchMoved";

  if(lastPt!=null) {
    b.addPoint(touches[0].x, touches[0].y);
  }

  var possible = {savedEvent: 'touchMoved', data: {x: touches[0].x, y: touches[0].y}};
  toSend.push(possible);

  return false;
}

//when touch released, stop sending points, display the wall
function touchEnded() {
  document.getElementById("touchText").innerHTML = "touchEnded";

  b.makeShape();
  walls.push(b);
  
  var possible = {savedEvent: 'touchEnded', data: {x: lastPt.x, y: lastPt.y}};
  toSend.push(possible);

  // Terminate touch path
  lastPt=null;

  return false;
}



