var rocket ,rocketImage;

var star,starImage;

var space1 , spaceImage;

var asteriod, asteriodimage;

var PLAY=1;
var END=0;
var gameState=1;

var score = 0;

var starCollection = 0;

function preload(){
  
  rocketImage = loadImage("rocket.png");
  
  starImage = loadImage("star.png");
  
  spaceImage = loadImage("background.jpg");
  
  asteriodImage = loadImage("asteriod.jpg");

}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  
  space1 = createSprite(width/2,200);
 space1.addImage("space1",spaceImage);
  space1.velocityY = 2;
  
  rocket = createSprite(width/2,100);
  rocket.addImage("rocket",rocketImage);
  rocket.scale = 0.2;
  
  asteriodGroup = new Group();
  starGroup = new Group();
  
  score = 0
  
}
 
function draw() {
  
  if(gameState===PLAY){
  background(0);
    
  score = score + Math.round(getFrameRate()/60);
    
  rocket.x = World.mouseX;
    
    if(space1.y > height ){
    space1.y = height/2;
  }
    
  if(starGroup.isTouching(rocket)){
  starGroup.destroyEach();
  starCollection = starCollection + 1;
  }
    
  if(keyDown("space")){
  rocket.velocityY = -10;
  }
    
  rocket.velocityY += 1;
    
  
    
  makeAsteriods();
    
  makeStars();
  
  if(rocket.isTouching(asteriodGroup)){
  rocket.velocityY = 0;
  }
    
  if(asteriodGroup.isTouching(rocket)|| rocket.y>600){
  rocket.destroy();
  asteriodGroup.destroyEach();
  starGroup.destroyEach();
  gameState = END;
  }
    
 drawSprites()
    
  text("Score: "+ score, 10,50);
  textSize(20);
  fill(255);
  text("STAR: "+ starCollection,10,30);
  }
  
  if(gameState === END){
  stroke("yellow");
  fill("yellow");
  textSize (30);
  text("GAMEOVER",230,250);
  }
}

function makeAsteriods(){
  if(frameCount%250=== 0){
  asteriod = createSprite(200,50);
  asteriod.addImage("asteriod",asteriodImage);
  asteriod.scale = 0.2;
  asteriod.x=Math.round(random(400,100));
  asteriod.velocityY = 2;
  asteriod.lifetime = 220;
  asteriodGroup.add(asteriod);
  rocket.depth = space1.depth;
  rocket.depth += 1;
}
}

function makeStars(){
  if(frameCount%250=== 0){
  star = createSprite(400,100);
  star.scale = 0.5;
  star.addImage("star",starImage);
  star.x=Math.round(random(400,100));
  star.velocityY = 1;
  star.lifetime = 400;
  starGroup.add(star);   
  }
}