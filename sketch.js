var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock
var special_door,special_doorImg
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  special_doorImg=loadImage("Special Door.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;

 
 doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw() {
  background("black");

  if(gameState==="play"){

   if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
    }
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
      }
      if(keyDown("space")){
       ghost.velocityY=-5;
        }
    ghost.velocityY=ghost.velocityY+0.8;
    
    if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
    }

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
    }

    if(frameCount%3000===0) {
      special_door=createSprite(200,20);
      special_door.addImage(special_doorImg);
      }

    spawnDoors();
  
      drawSprites();
  }

  if(gameState==="end"){
  stroke("red");
  fill("red");

  textSize(30);
  text("Game Over",230,250);
  }
if(ghost.isTouching(special_door)){
stroke("yellow");
fill("yellow");
textSize(30)
text("You Won",230,250);
}
}

function spawnDoors(){
if(frameCount%240===0){
door=createSprite(200,-50);
door.addImage(doorImg);



climber=createSprite(200,10);
climber.addImage(climberImg);

 invisibleBlock=createSprite(200,15);
 invisibleBlock.width=climber.width;
 invisibleBlock.height=2;

door.x=Math.round(random(120,400));
door.velocityY=2;

climber.x=door.x;
climber.velocityY=2;

ghost.depth=door.depth;
ghost.depth+=1;

invisibleBlock.x=door.x;
invisibleBlock.velocityY=2;

door.lifetime=800;
climber.lifetime=800;
invisibleBlock.lifetime=800;

doorsGroup.add(door);
climbersGroup.add(climber);
invisibleBlockGroup.add(invisibleBlock);
}
}






