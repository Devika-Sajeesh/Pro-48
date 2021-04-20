var bg1;

//gameStates
var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;

var cycle,track;

//group variables
var pGroup,cGroup,oGroup;

//boundaries
var boundary1,boundary2;

//variables (images for score)
var air,Coin;
var diamond;

//image variables
var bg,cycleImg;
var pumpImg,coinImg;
var dmndImg,rdImg;
var coneImg,trackImg;

//score variables
var Air = 0;
var cn = 0;
var dmnd = 0;

//sound variables
var bgSound,tingSound,flrSnd;

function preload(){
  bg        = loadImage("track.png");
  cycleImg  = loadAnimation("cycle.png","1.png");
  pumpImg   = loadImage("pump.png");
  coinImg   = loadAnimation("coin.gif");
  dmndImg   = loadImage("diamond.png");
  rdImg     = loadImage("road.png");
  coneImg   = loadImage("cone.png");
  trackImg  = loadImage("track.jpg");

  bgSound   = loadSound("hill climb racing.mp3");
  tingSound = loadSound("ting.mp3");
  flrSnd    = loadSound("Oh No.mp3");
}


function setup() {

  createCanvas(displayWidth,700);
  
  //track
  bg1 = createSprite(750,200);
  bg1.addImage(bg);
  bg1.scale = 1.2;

  //end track
  track = createSprite(750,30);
  track.addImage(trackImg);
  track.scale = 1.2;
  track.visible = false;

  //creating boundaries
  boundary1 = createSprite(545,300,10,1300);
  boundary1.shapeColor = "red";
  boundary1.visible = false;

  boundary2 = createSprite(960,300,10,1300);
  boundary2.shapeColor = "red";
  boundary2.visible = false;

  //creating pump group
  pGroup = createGroup();
  cGroup = createGroup();
  oGroup = createGroup();

  //cycle
  cycle = createSprite(displayWidth/2,580,20,20);
  cycle.addAnimation("cycle",cycleImg);
  cycle.scale = 0.8;

  //air pump for score
  air = createSprite(493,30);
  air.addImage(pumpImg);
  air.scale = 0.4;

  //coin img for coin
  Coin = createSprite(493,80);
  Coin.addAnimation("coin",coinImg);
  Coin.scale = 0.05;

  //diamond image for score
  diamond = createSprite(493,130);
  diamond.addImage(dmndImg);
  diamond.scale = 0.04;

  }

function draw() {
  
  background("black");
  drawSprites();

  if (gameState === START) {
       
   if (keyDown("space")) {
     gameState = PLAY;
     bgSound.play();

   }

   fill("white");
   textSize(40);
   text("Press Space To Play",displayWidth/2-200,700/2);
  }

if(gameState === PLAY){
  cycle.velocityX = 0;

  //air pump collected
  fill("black");
  textSize(20);
  text(":" + Air,505,35);

  //coins collected
  fill("#FFFB7F");
  textSize(20);
  text(":" + cn,505,87);

  //diamond collected
  fill("#95D4F0");
  textSize(20);
  text(":" + dmnd,507,137);

  spawnPump();
  spawnCoins();
  spawnObstacles1();
  spawnObstacles2();

  //touching air pump
  if(pGroup.isTouching(cycle)){
    pGroup.destroyEach();
    Air = Air + 1;
    tingSound.play();
  }

  //touching coins
  if (cGroup.isTouching(cycle)) {
    cGroup.destroyEach();
    cn = cn + 1;
    tingSound.play();

}

  //touching obstacles
  if (oGroup.isTouching(cycle)) {
      gameState = END;
      flrSnd.play();
      fill("white");
      textSize(40);
      text("You Lost The Game",displayWidth/2-200,700/2);

}

  //collecting diamonds
  if (cn === 20) {
    dmnd = dmnd = 1;
    tingSound();
  }

  bg1.velocityY = 9;

  //moving background
  if (bg1.y > 400){

     bg1.y = bg1.height/4;
     
    }

  //left key
  if(keyDown(LEFT_ARROW)){
    cycle.velocityX = -6;
  }

  //right key
  if(keyDown(RIGHT_ARROW)){
    cycle.velocityX = 6;
  }

  //touchingi boundary
  if (boundary1.isTouching(cycle)) {
      gameState = END;
      flrSnd.play();
      fill("white");
      textSize(40);
      text("You Lost The Game",displayWidth/2-200,700/2);
  }

  //touching boundary
  if (boundary2.isTouching(cycle)) {
      gameState = END;
      flrSnd.play();
      fill("white");
      textSize(40);
      text("You Lost The Game",displayWidth/2-200,700/2);
  }

  //winning the game 
  if(cn === 50 && pGroup === 5){
    fill("white");
    textSize(40);
    text("You Won The Game",displayWidth/2-200,700/2);
    gameState = END;
    track.visible = true;
    
  }
}

//gamestate end
if(gameState === END){
  cycle.visible = false;
  bg1.velocityY = 0
  oGroup.destroyEach();
  pGroup.destroyEach();
  cGroup.destroyEach();
  bgSound.stop();

}
  

}

//spawning air pump
function spawnPump(){

  if(frameCount % 400 === 0){
    var pump = createSprite(displayWidth/2,10);
    pump.velocityY = 4;

    pump.depth = cycle.depth+1;

    pump.x = Math.round(random(displayWidth/2-40,690));
  
    pump.addImage(pumpImg);
    pump.scale = 0.6;
  
    pump.lifetime = -300;
    console.log();
    pGroup.add(pump);

    }

  }

  function spawnCoins() {
   if(frameCount % 50 === 0){

    var rand = (Math.round(random(1,3)));

    var coin = createSprite(650,30);
      coin.velocityY = 7;
  
      coin.depth = cycle.depth;

      coin.addAnimation("coin",coinImg);
      coin.scale = 0.1;

      coin.lifetime = -300;
      cGroup.add(coin);

    switch(rand){

      case 1: coin.y = 30;
              coin.x = 850;
              break;
      default:break;
      
      }
    }
  }

  function spawnObstacles1(){
    if(frameCount % 300 === 0){

      var rand = (Math.round(random(1,3)));
  
      var road = createSprite(650,30);
        road.velocityY = 7;
    
        road.depth = cycle.depth;
  
        road.addImage("road",rdImg);
        road.scale = 0.5;
  
        road.lifetime = -300;
        oGroup.add(road);
  
      switch(rand){
  
        case 1: road.y = 30;
                road.x = 850;
                break;
        default:break;
  }

}
  }

  function spawnObstacles2(){
    if(frameCount % 400 === 0){

      var rand = (Math.round(random(1,3)));
  
      var cone = createSprite(650,30);
        cone.velocityY = 7;
    
        cone.depth = cycle.depth;
  
        cone.addImage("cone",coneImg);
        cone.scale = 0.2;
  
        cone.lifetime = -300;
        oGroup.add(cone);
  
      switch(rand){
  
        case 1: cone.y = 30;
                cone.x = 850;
                break;
        default:break;
  }

}
  }