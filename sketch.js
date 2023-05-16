const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImg;

var cannon;
var angle;

var cannonball;

var balls = [];

var boat;
var boats = [];

var boatAnimation = [];
var boatSpritedata, boatSpritesheet;

var broken_boatAnimation = [];
var broken_boatSpritedata, broken_boatSpritesheet;

function preload(){
  backgroundImg = loadImage("assets/background.gif");
  
  boatSpritedata = loadJSON("assets/boat/boat.json");
  boatSpritesheet = loadImage("assets/boat/boat.png");

  broken_boatSpritedata = loadJSON("assets/boat/broken_boat.json");
  broken_boatSpritesheet = loadImage("assets/boat/broken_boat.png");
}

function setup() {
  createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  var boatFrames = boatSpritedata.frames;
  for (var i = 0; i < boatFrames.length; i++){
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  var broken_boatFrames = broken_boatSpritedata.frames;
  for (var i = 0; i < broken_boatFrames.length; i++){
    var pos = broken_boatFrames[i].position;
    var img = broken_boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    broken_boatAnimation.push(img);
  }

  angle = -PI/4;

  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 130, 100, angle);

  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);

  image(backgroundImg, 0, 0, width, height);
  tower.display();
  cannon.display();

  for (var i = 0; i < balls.length; i++){
    showCannonBalls(balls[i], i);
  }

  showBoats();

  Engine.update(engine);
}

function keyReleased() {
  if (keyCode == DOWN_ARROW){
    balls[balls.length - 1].shoot();
  }
}

function keyPressed() {
  if (keyCode == DOWN_ARROW){
    cannonball = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonball);
  }
}

function showCannonBalls(ball, index){
ball.display();
if( ball.body.position.x >= width || ball.body.position.y >= height - 50){
  World.remove(world, ball.body);
  balls.splice(index, 1);
}
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(
        width,
        height - 100,
        170,
        170,
        position,
        boatAnimation
      );

      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.9,
        y: 0
      });

      boats[i].display();
      boats[i].animate();
     
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
    boats.push(boat);
  }
}