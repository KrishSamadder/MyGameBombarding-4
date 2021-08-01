var PLAY=1;
var END=0;
var gameState=1;

var bomb1, bomb2, bomb3;
var boomimg, boom, gameover, gameOver, restart, Restart, reStart;
var healthdrink, healthkit;
var runningleftboy, runningboy, runningrightboy, deadboy, deadBoy;
var runningleftgirl, runninggirl, runningrightgirl, deadgirl, deadGirl;
var standingboy, standingBoy;
var standinggirl, standingGirl;
var youWon, youwon;
var backgroundimg;
var invisibleground;

var backgroundsound;
var explosionsound;
var healthkitordrinkcollected;
var screeminggirlsound, screemingmansound;

var life, score;
var edges;

var bombGroup, refresherGroup;

function preload(){
  
bomb1=loadImage("images/bomb1.png");
bomb2=loadImage("images/bomb2.png");
bomb3=loadImage("images/bomb3.png");

boomimg=loadImage("images/boomimage.jpg");
gameover=loadImage("images/gameover.png");
restart=loadImage("images/restart.png");

healthdrink=loadImage("images/healthdrink.png");
healthkit=loadImage("images/healthkit.png");

runningleftboy=loadAnimation("images/runningleftboy2.png", "images/runningleftboy3.png", "images/runningleftboy4.png", "images/runningleftboy5.png");
runningrightboy=loadAnimation("images/runningrightboy2.png", "images/runningrightboy3.png", "images/runningrightboy4.png", "images/runningrightboy5.png");
deadboy=loadImage("images/deadboy.png");

runningrightgirl=loadAnimation("images/runningrightgirl2.png", "images/runningrightgirl3.png", "images/runningrightgirl4.png","images/runningrightgirl5.png","images/runningrightgirl6.png","images/runningrightgirl7.png","images/runningrightgirl8.png","images/runningrightgirl9.png","images/runningrightgirl10.png");
runningleftgirl=loadAnimation("images/runningleftgirl2.png", "images/runningleftgirl3.png", "images/runningleftgirl4.png", "images/runningleftgirl5.png", "images/runningleftgirl6.png", "images/runningleftgirl7.png", "images/runningleftgirl8.png", "images/runningleftgirl9.png", "images/runningleftgirl10.png");
deadgirl=loadImage("images/deadgirl.png");

standingboy=loadImage("images/standingboy.png");
standinggirl=loadImage("images/standinggirl.png");

backgroundimg=loadImage("images/underworld.jpg");

youwon=loadImage("images/youwon.jpg");

backgroundsound=loadSound("sounds/backgroundsound.mp3");
explosionsound=loadSound("sounds/explosionsound.mp3");
healthkitordrinkcollected=loadSound("sounds/healthkitordrinkcollected.mp3");

screeminggirlsound=loadSound("sounds/screeminggirlsound.wav");
screemingmansound=loadSound("sounds/screemingmansound.wav");

}

function setup() {
  createCanvas(1365,625);

  score = 0;
  life = 2;

  invisibleground=createSprite(682.5, 490, 1365, 5);

  standingGirl=createSprite(682.5, 440, 10, 10);

  runninggirl=createSprite(682.5, 400, 1, 1);
  runningboy=createSprite(682.5, 400, 1, 1);

  deadGirl=createSprite(682.5, 400, 1, 1);
  deadBoy=createSprite(682.5, 400, 1, 1);

  standingBoy=createSprite(682.5, 10, 1, 1);

  Boom=createSprite(682.5, 312.5, 1, 1);
  Restart=createSprite(1260, 525, 1, 1); 
gameOver=createSprite(110, 80, 1, 1);

youWon=createSprite(682.5, 312.5, 1, 1);
reStart=createSprite(645, 390, 1, 1);

edges=createEdgeSprites();

bombGroup = new Group();
refresherGroup = new Group();

backgroundsound.play();
backgroundsound.loop();
}

function draw() {
  background(backgroundimg);  

  textSize(12.5);
  fill("white");
  text("Press left and right arrow keys to collect the health drinks and health kits (to get scores) and avoid the bombs. Both the agents can slide as well as run. You have 2 lives. To win get a score of 10. Press on restart once your lives get exhausted.",  10, 13);
  text("They can slide because of less gravity!", 550, 26);

  runninggirl.velocityX=0;
  runningboy.velocityX=0;

  runninggirl.bounceOff(edges[1]);
  runningboy.bounceOff(edges[1]);

if(runningboy.x<=0){
  runningboy.x=230;
}

if(runninggirl.x<=0){
  runninggirl.x=100;
}

  if(gameState==PLAY){

    standingGirl.addImage(standinggirl);
    standingGirl.scale=0.2;

    
standingBoy.collide(invisibleground);

if(keyDown(LEFT_ARROW)){
  standingGirl.visible=false;
runninggirl.addAnimation("runninggirl", runningleftgirl);
  runninggirl.velocityX=-5;
}

if(keyDown(RIGHT_ARROW)){
  standingGirl.visible=false;
  runninggirl.addAnimation("runninggirl", runningrightgirl);
  runninggirl.velocityX=5;
}

if(refresherGroup.isTouching(runninggirl||standingGirl)){
  score+=1;
  healthkitordrinkcollected.play();
  refresherGroup.destroyEach();
  refresherGroup.setVelocityYEach(0);
  refresherGroup.setLifetimeEach(-1);
  }

if(bombGroup.isTouching(invisibleground)){
  boom.addImage(boomimg);
  explosionsound.play();
}

if(bombGroup.isTouching(runninggirl||standingGirl)){
  standingGirl.visible=false;
  runninggirl.visible=false;
  screeminggirlsound.play();
  deadGirl.addImage(deadgirl);
  deadGirl.lifetime=6;
deadGirl.scale=0.3;
  life=life-1;
  standingGirl.destroy();
  runninggirl.destroy();
  bombGroup.destroyEach();
  refresherGroup.destroyEach();
  bombGroup.setVelocityYEach(0);
  refresherGroup.setVelocityYEach(0);
  bombGroup.setLifetimeEach(-1);
  refresherGroup.setLifetimeEach(-1); 
  standingBoy.velocityY=10;
  standingBoy.addImage(standingboy);
  standingBoy.scale=0.2;
  gameState=END;
}


spawnBombs();
spawnRefreshers();

if(score>=10){
  youWon.addImage(youwon);
  standingGirl.visible=false;
  runninggirl.visible=false;
  bombGroup.destroyEach();
  refresherGroup.destroyEach();
  bombGroup.setVelocityYEach(0);
  refresherGroup.setVelocityYEach(0);
  refresherGroup.setLifetimeEach(-1);
  bombGroup.setLifetimeEach(-1); 
  reStart.addImage(restart);
}

if(mousePressedOver(reStart)){
  reset();
}
  }

  
  else if(gameState==END){

    if(bombGroup.isTouching(invisibleground)){
      boom.addImage(boomimg);
      explosionsound.play();
        }

    if(keyDown(LEFT_ARROW)){
      standingBoy.visible=false;
    runningboy.addAnimation("runningboy", runningleftboy);
    runningboy.scale=0.5;
    runningboy.velocityX=-5;
    }
    
    if(keyDown(RIGHT_ARROW)){
      standingBoy.visible=false;
      runningboy.addAnimation("runningboy", runningrightboy);
      runningboy.velocityX=5;
      runningboy.scale=0.5;
  }

  if(refresherGroup.isTouching(runningboy||standingBoy)){
    score+=1;
    healthkitordrinkcollected.play();
    refresherGroup.destroyEach();
    refresherGroup.setVelocityYEach(0);
    refresherGroup.setLifetimeEach(-1);
    }
  
  standingBoy.collide(invisibleground);

  if(bombGroup.isTouching(runningboy||standingBoy)){
    standingBoy.visible=false;
    runningboy.visible=false;
    screemingmansound.play();
    life=life-1;
    runningboy.destroy();
    standingBoy.destroy();
    bombGroup.destroyEach();
    refresherGroup.destroyEach();
    bombGroup.setVelocityYEach(0);
    refresherGroup.setVelocityYEach(0);
    bombGroup.setLifetimeEach(-1);
    refresherGroup.setLifetimeEach(-1); 
  deadBoy.addImage(deadboy);
  deadBoy.lifetime=6;
  deadBoy.scale=0.3;
  Boom.addImage(boomimg);
Boom.scale=3;
gameOver.addImage(gameover);
Restart.addImage(restart);
explosionsound.play();
  }

  if(mousePressedOver(Restart)){
    reset();
    }

    spawnBombs();
spawnRefreshers();

    if(score>=10){
      youWon.addImage(youwon);
      standingBoy.visible=false;
      runningboy.visible=false;
      bombGroup.destroyEach();
      refresherGroup.destroyEach();
      bombGroup.setVelocityYEach(0);
      refresherGroup.setVelocityYEach(0);
      refresherGroup.setLifetimeEach(-1);
      bombGroup.setLifetimeEach(-1); 
      reStart.addImage(restart);
    }

    if(mousePressedOver(reStart)){
      reset();
    }

}

invisibleground.visible=false;
  

textSize(20);
fill("white");
text("Score: "+score, 1250, 40);
text("Life: "+life, 1250, 60);

  drawSprites()
}

function spawnBombs(){
  if(life>=1){
  if(frameCount%60===0){
    var bomb=createSprite(Math.round(random(30, 1350) ), 60, 10, 10);
    bomb.velocityY=8;
    bomb.velocityX=0;

    bomb.lifetime=51;
    var rand=Math.round(random(1, 3));
    switch(rand){
      case 1:bomb.addImage(bomb1);
             break;
      case 2: bomb.addImage(bomb2);
        break;
        case 3: bomb.addImage(bomb3);
        break;
        default: break;
    }
    boom=createSprite(bomb.x, bomb.y+390, 0.1, 0.1);
boom.scale=0.1
boom.lifetime=60;
    bomb.scale=0.2;

    bombGroup.add(bomb);
  }
}
}

function spawnRefreshers(){
  if(life>=1){
 if(frameCount%200===0){
    var refresher=createSprite(Math.round(random(30, 1350)), 60, 10, 10);

    refresher.velocityY=7;
    refresher.velocityX=0;
  
    refresher.lifetime=60;

    var rand=Math.round(random(1, 2));
    switch(rand){
      case 1:refresher.addImage(healthdrink);
             break;
      case 2: refresher.addImage(healthkit);
        break;
        default: break;
    }
    
refresher.scale=0.125;
   
    refresherGroup.add(refresher);
  }
}
}

function reset(){
location.reload();
}