// Created based on The Nature of Code by Daniel Shiffman
// http://natureofcode.com

// A fixed boundary class

  // A boundary is a simple rectangle with x,y,width,and height
function Boundary(colorName) {
  // But we also have to make a body for box2d to know about it
  // Body b;
  this.points = [];
  this.colorName = "red";

  //tone.js initialize a MonoSynth instrument
  this.instrument = new Tone.MonoSynth();
  this.instrument.toMaster();

  this.r = 231;
  this.g = 76;
  this.b = 60;

  //if clicked the button 1, surface is red
  if(b1){
          this.r = 231;
          this.g = 76;
          this.b = 60;
          this.colorName = "red";
        } 
  //if clicked the button 2, surface is green
  if(b2){
          this.r = 130;
          this.g = 191;
          this.b = 86;
          this.colorName = "green";
        }
  //if clicked the button 3, surface is blue
  if(b3){
          this.r = 102;
          this.g = 51;
          this.b = 204;
          this.colorName = "purple";
        }
  //if clicked the button 4, surface is bright blue
  if(b4){
          this.r = 242;
          this.g = 207;
          this.b = 102;
          this.r = 51;
          this.g = 204;
          this.b = 255;
          this.colorName = "lightBlue";
        }
  //if clicked the button 5, surface is bright yellow
  if(b5){
          this.r = 242;
          this.g = 207;
          this.b = 102;
          this.colorName = "yellow";
        }

  this.bcol = color(this.r, this.g, this.b);
  
}

Boundary.prototype.addPoint = function(pX, pY){
  this.points.push(new box2d.b2Vec2(pX, pY));
}

Boundary.prototype.makeShape = function(){
  var scaled_points = [this.points.length];
  for (var i = 0; i < this.points.length; i++) {
    scaled_points[i] = scaleToWorld(this.points[i]);
  }
  // This is what box2d uses to put the surface in its world
  var chain = new box2d.b2ChainShape();
  chain.CreateChain(scaled_points, scaled_points.length);

  var fd = new box2d.b2FixtureDef();
  fd.density = 1.0;
  fd.friction = 0.5;
  fd.restitution = 0.7;
  fd.shape = chain; 
  var bd = new box2d.b2BodyDef();
 
  bd.type = box2d.b2BodyType.b2_staticBody;

  // Create the body
  this.body = world.CreateBody(bd);
  // Attach the fixture
  this.body.CreateFixture(fd);

  //give user data
  this.body.SetUserData(this);
}

  // Draw the boundary, if it were at an angle we'd have to do something fancier
Boundary.prototype.display = function() {
  fill(127);
  stroke(this.bcol);
  beginShape();
  for (var i = 0; i < this.points.length; i++) {
    vertex(this.points[i].x, this.points[i].y);
  }
  endShape();

  // strokeWeight(1);
  // stroke(this.bcol);
  // console.log(this.bcol);
  // fill(200);

  // beginShape();

  // var vLast = scaleToPixels(this.points[this.points.length -1]);
  // var vFirst = scaleToPixels(this.points[0]);
  // vertex(vFirst.x, vFirst.y);
  // vertex(vLast.x, vLast.y);
  // vertex(vLast.x, vLast.y + 1);
  // vertex(vFirst.x, vFirst.y + 1);
  // endShape(CLOSE);
}

Boundary.prototype.play = function(){

  var scale = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
  var lengthOfLine = this.points.length;
  var maxLength = 45;
  var notePos = Math.round(map(lengthOfLine, 0, maxLength, 0, scale.length, 0));
  //var notePos = Math.round(map(lengthOfLine, 0, scale.length, 0));
  var note = scale[notePos];
  var preset;
  var volume;
  var velocity;
  console.log(lengthOfLine);
  //play note C2 now for 8n amount of time
  if(this.colorName === "red"){
    preset = "Pianoetta";
    velocity = 0.6;
    volume = -10;
    console.log(note);
   }else if(this.colorName === "green"){
    preset = "Pizz";
    velocity = 0.6;
    volume = -10;
    console.log(note);
     
   }else if(this.colorName === "purple"){
    preset = "Barky";
    velocity = 1;
    volume = 2;
    console.log(note);
     
   }else if(this.colorName === "lightBlue"){
    preset = "Bassy";
    velocity = 1;
    volume = 2;
    console.log(note);
     
   }else if(this.colorName === "yellow"){
    preset = "Kick";
    velocity = 1;
    volume = 2;
    console.log(note);

   }

   this.instrument.setVolume(volume);
   this.instrument.setPreset(preset);
   this.instrument.triggerAttackRelease(note, "8n", Tone.Transport.now(), velocity);
   //console.log(this.colorName);
  
}