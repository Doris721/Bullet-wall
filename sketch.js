const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var bullet,wall;
var speed,weight,thickness;

function setup(){
    var canvas = createCanvas(1600,400);
    
    engine = Engine.create();
    world = engine.world;
 
  speed=random(55,90);
  weight=random(30,52);
  thickness=random(223,321);

var bullet_options={
  isStatic: false
}

  bullet_options=Bodies.cirlce(50, 200, 50, bullet_options);
  World.add(world,bullet_options);
  bullet_options.velocityX=speed;

var wall_options={
  isStatic=true
}

  wall=Bodies.rectangle(1200,200,thickness,height/2,wall_options);
  wall.shapeColor=color(80,80,80);
  World.add(world,wall);

  if(wall.x-bullet_options.x<(bullet_options.width+wall.width)/2)
  {
    bullet_options.velocityX=0;
    var deformation=0.5 * weight * speed* speed/22509;
    if(deformation>180)
    {
      bullet_options.shapeColor=color(255,0,0);
    }
    if(deformation<180 && deformation>100)
    {
      bullet_options.shapeColor=color(230,230,0);
    }
    if(deformation<100)
    {
      bullet_options.shapeColor=color(0,255,0);
    }
  }

if(hasCollided(bullet, wall))
{
  bullet.velocityX=0;
  var damage=0.5 * weight * speed* speed/(thickness *thickness *thickness);

  if(damage>10)
  {
    wall.shapeColor=color(255,0,0);
  }

  if(damage<10)
  {
    wall.shapeColor=color(0,255,0);
  }
}

}

function draw(){
    background(255,255,255);
    Engine.update(engine);
    ellipseMode(RADIUS);
    ellipse(bullet_options.position.x,bullet_options.position.y,20,20)
    rectMode(CENTER);
    rect(wall.position.x,wall.position.y,20,50)
    bullet_options.display();
    wall.display();
}

function hasCollided(bullet,wall)
{
  bulletRightEdge=bullet.x +bullet.width;
  wallLeftEdge=wall.x;
  if(bulletRightEdge>=wallLeftEdge)
  {
    return true
  }
  return false;
}



