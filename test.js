
//mobile touchstart, touchmove, touchend
//when there is a touch, create a new surface, save the first point
function ttouchStarted(){
    document.getElementById("touchText").innerHTML = "touchStarted";

    return false;
}

function setup() {
    var c = createCanvas(200,200);
 // c.touchStarted(ttouchStarted);
 c.mousePressed(ttouchStarted);

}

function draw() {
  background(0);

}


function button1(){
  document.getElementById("touchText").innerHTML = "button1";
}



//when finger dragged, send all the points into surface
function ttouchMoved() {
  document.getElementById("touchText").innerHTML = "touchMoved";

  return false;
}

//when touch released, stop sending points, display the surface
function ttouchEnded() {
  document.getElementById("touchText").innerHTML = "touchEnded";

  return false;
}



