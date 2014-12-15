// Created based on The Nature of Code by Daniel Shiffman
// http://natureofcode.com

// ContactListener to listen for collisions!

function CustomListener() {

}

var o1;
var o2;
// Collision event functions!
CustomListener.prototype.BeginContact = function(contact) {
  // Get both fixtures
  var f1 = contact.GetFixtureA();
  var f2 = contact.GetFixtureB();
  // Get both bodies
  var b1 = f1.GetBody();
  var b2 = f2.GetBody();

  // Get our objects that reference these bodies
  o1 = b1.GetUserData();
  o2 = b2.GetUserData();

  //if (o1 instanceof Particle && o2 instanceof Particle) {
  if (o1 instanceof Boundary && o2 instanceof Particle) {
    // o1.change();
    o2.change();
    console.log("collide");
    //boundary.play();
    o1.play();
  }
}

// Objects stop touching each other
CustomListener.prototype.EndContact = function(contact) {
  if (o1 instanceof Boundary && o2 instanceof Particle) {
    o2.changeBack();
  }
}

CustomListener.prototype.PreSolve = function(contact,manifold) {
}

CustomListener.prototype.PostSolve = function(contact,manifold) {
}