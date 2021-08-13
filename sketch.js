var PLAY=1;
var END=0;
var GameState=PLAY;
var bgImg;
var sky;
var earth,earth_running;
var rover,rover_running;
var astro,astroImage;
var astroGroup,rockGroup,atomGroup,cubeGroup,solarGroup,ufoGroup;
var rock,rockImage;
var rover_Down;
var atom,atomImage;
var cube,cubeImage;
var solar,solarImage;
var ufo,ufoImage;
var score;
var spaceSound;
var gameover,gameoverImage;
var restart,restartImage;
var YourScore;


function preload(){
  bgImg = loadImage("sky.png");
  rover_running=loadAnimation("Rover(1).png","Rover(2).png","Rover(3).png","Rover(4).png");
  astroImage=loadImage("astro.jpg");
  earth_running = loadAnimation("earth1.png","earth2.png","earth3.png","earth4.png","earth5.png","earth6.png","earth7.png","earth8.png","earth9.png");
  rockImage = loadImage("rock.png")
  rover_Down = loadAnimation("Rover_Down.png");
  atomImage = loadImage("atom.png");
  cubeImage = loadImage("cube.png");
  solarImage = loadImage("Solar System.png")
  ufoImage = loadImage("Ufo.png")
  spaceSound = loadSound("space.mp3")
  gameoverImage = loadImage("gameover.png");
  restartImage = loadImage("restart.png")
}
 
function setup() {
  createCanvas(1365,655,);

  sky = createSprite(700,327);
  sky.addImage(bgImg);
  sky.scale=3.9;
  sky.velocityX=-9;

  earth = createSprite(50,55);
  earth.addAnimation("earth_waikling",earth_running);
  earth.scale=0.2;
 
  score = 0;
  
  rover=createSprite(200,350,20,20);
  rover.addAnimation("rover_waiking",rover_running);
  rover.addAnimation("rover_went",rover_Down);
  rover.scale=0.5;

  gameover = createSprite(700,327) ;
  gameover.addImage(gameoverImage) ;
  gameover.scale=2.5;
  gameover.visible=false;

  restart= createSprite(700,527);
  restart.addImage(restartImage);
  restart.visible=false;



 

  invisibleGround = createSprite(683,445,1365,20);
  invisibleGround.visible = false
  

 
  astroGroup=new Group();
  //astroGroup.visible=false;
  rockGroup=new Group();
  atomGroup=new Group();
  cubeGroup=new Group();
  solarGroup=new Group();
  ufoGroup=new Group();

  
}

function draw() {
  //background("gray");  
  
  
  
  
if(GameState===PLAY){


  //groundVelocityX
  if(sky.x < 0 ){
    sky.x = sky.width/2;
  }



  //jumping
  if(keyDown("space")&& rover.y >= 100) {
  rover.velocityY = -12;
  }
  //gravity
  rover.velocityY = rover.velocityY + 0.8
  
  //ROVER DOWN
  if(keyDown("down")) {
    rover.changeAnimation("rover_went", rover_Down);
   }
   else{
     rover.changeAnimation("rover_waiking",rover_running);
   }
 
 

   if (atomGroup.isTouching(rover)) {
    atomGroup.destroyEach();
    score = score+60;
    spaceSound.play();
  }
  else if (cubeGroup.isTouching(rover)) {
    cubeGroup.destroyEach();
    score = score+150;
    spaceSound.play();
  }

  else if (solarGroup.isTouching(rover)) {
    solarGroup.destroyEach();
    score = score+100;
    spaceSound.play();
  }

  spawnAstro();
  spwanRock();
  spawnAtom();
  spawnCube();
  spawnSolar();
  spawnUfo();

 
  

  
  
  
 
  if(ufoGroup.isTouching(rover)||rockGroup.isTouching(rover)) {
   
   GameState=END;
  }


  }
 //colide
 rover.collide(invisibleGround);

 

if(GameState===END){
 
  gameover.visible=true;
  restart.visible=true;
  rockGroup.setVelocityXEach(0);
  rockGroup.setLifetimeEach(0);

  astroGroup.setVelocityXEach(0);
  astroGroup.setLifetimeEach(0);

  atomGroup.setVelocityXEach(0);
  atomGroup.setLifetimeEach(0);

  cubeGroup.setVelocityXEach(0);
  cubeGroup.setLifetimeEach(0);

  solarGroup.setVelocityXEach(0);
  solarGroup.setLifetimeEach(0);

  ufoGroup.setVelocityXEach(0);
  ufoGroup.setLifetimeEach(0);
  
  //YourScore = score;
  if(mousePressedOver(restart)) {
    Reset();
  }
 // ("Your Score"+YourScore,700,100);
}
  
drawSprites();

textSize(50);
stroke ("red")
strokeWeight (5);
fill("yellow");
text("Score: "+ score, 1000,50);



}


function Reset(){
  GameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  rover.changeAnimation("rover_waiking",rover_running);
  
  rockGroup.destroyEach();
  astroGroup.destroyEach();
  atomGroup.destroyEach();
  cubeGroup.destroyEach();
  solarGroup.destroyEach();
  ufoGroup.destroyEach();
  score=0;
  sky.velocityX = -9 ;
}



function spawnAstro(){
  if (frameCount % 200 === 0){
    var astro = createSprite(600,150,10,40);
    astro.velocityY= 7;
    astro.x = Math.round(900,1365);
    astro.addImage( astroImage);
    astro.scale=.15;
    astro.lifeTime = 200;
    astroGroup.add(astro);
    }
  var invisibleGround= createSprite(680,360,1365,20);
  invisibleGround.visible= false;
  if(astroGroup.isTouching(invisibleGround)){
    astroGroup.destroyEach();
  }
 }
 

 function spwanRock(){
  if (frameCount % 200 === 0){
    var rock = createSprite(1370,395,10,40);
    rock.velocityX = -9;
    rock.addImage(rockImage);
    rock.lifeTime = 200;
    rockGroup.add(rock);
  }
 }


 function spawnAtom(){
  if (frameCount % 200 === 0){
    var atom = createSprite(1270,200,10,40);
    atom.velocityX = -10;
    atom.addImage(atomImage);
    atom.scale = 0.2;
    atom.lifeTime = 200;
    atomGroup.add(atom);
  }
 }

 function spawnCube(){
  if (frameCount % 200 === 0){
    var cube = createSprite(8000,50,10,40);
    cube.velocityX = -7;
    cube.addImage(cubeImage);
    cube.scale = 0.2;
    cube.lifeTime = 200;
    cubeGroup.add(cube);
  }
 }

 function spawnSolar(){
  if (frameCount % 200 === 0){
    var solar = createSprite(2000,290,10,40);
    solar.velocityX = -8;
    solar.addImage(solarImage);
    solar.scale = 0.2;
    solar.lifeTime = 200;
    solarGroup.add(solar);
  }
 }

 function spawnUfo(){
  if (frameCount % 200 === 0){
    var ufo = createSprite(20000,180,10,40);
    ufo.velocityX = -10;
    ufo.addImage(ufoImage);
    ufo.scale = 0.2;
    ufo.lifeTime = 200;
    ufoGroup.add(ufo);
  }
 }

