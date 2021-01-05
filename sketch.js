var sword, swordImage, fruit, fruitImage1, fruitImage2, fruitImage3, fruitImage4;

var alien, alienImage;

var gameOver, gameOverImage, score = 0;

var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  
  swordImage = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  gameOverImage = loadImage("gameover.png");
  
  alienImage = loadAnimation("alien1.png","alien2.png");
}

function setup(){
  createCanvas(300,300);
  
  sword = createSprite(150,150,10,20);
  sword.addImage(swordImage);
  sword.scale = 0.25
  
  gameOver = createSprite(150,150,10,10);
  gameOver.addImage(gameOverImage);
  
  //sword.debug = true;
  
  fruits = createGroup();
  enemy = createGroup();
}

function draw(){
  background(0,70,100);
  
  if(gameState === PLAY){
    if(World.mouseX > 0){
      sword.y = World.mouseY;
      sword.x = World.mouseX;
    }
    
    if(sword.isTouching(fruits)){
      fruits.destroyEach();
      score = score + 2;
    }
    
    
    spawnFruit();
    monster();
    
    
    if(sword.isTouching(enemy)){
      gameState = END;
    }
    
    gameOver.visible = false;
    
  }else if(gameState === END){
    enemy.setVelocityXEach(0);
    fruits.setVelocityXEach(0);
    enemy.setLifetimeEach(-1);
    fruits.setLifetimeEach(-1);
    
    gameOver.visible = true;
    
    if(keyDown("r")){
      reset();
    } 
  }
  
  text("score " + score, 240,10);
  
  fruits.setVelocityYEach = fruits.setVelocityYEach + 1.5; 
  
  drawSprites();
  
}

function reset(){
  score = 0;
  gameState = PLAY;
  enemy.destroyEach();
  fruits.destroyEach();
}

function spawnFruit(){
  if(frameCount % 40 === 0){
    fruit = createSprite(200,100,20,20);
    var rand = Math.round(random(1,4));

    switch(rand){
      case 1: fruit.addImage(fruit1);
          break;
        case 2: fruit.addImage(fruit2);
          break;
        case 3: fruit.addImage(fruit3);
          break;
        case 4: fruit.addImage(fruit4);
          break;
        default: break;
    }

    var spawnSide = Math.round(random(1,3));

    if(spawnSide === 1){
      fruit.y = random(200,250);
      fruit.x = 0;
      fruit.velocityX = 6;
      fruit.velocityY = -2;
    }else if(spawnSide === 2){
      fruit.y = 300;
      fruit.x = random(100,200);
      fruit.velocityX = 0;
      fruit.velocityY = -3;
    }else if(spawnSide === 3){
      fruit.y = random(200,250);
      fruit.x = 300;
      fruit.velocityX = -6;
      fruit.velocityY = -2;
    }

    fruit.scale = 0.25;
    fruit.lifetime = 120;

    fruits.add(fruit);
  }
}

function monster(){
  if(frameCount % 100 === 0){
    alien = createSprite(300,100,30,30);
    alien.addAnimation("move",alienImage);
    alien.y = Math.round(random(100,250));
    alien.velocityX = -8
    alien.lifetime = 50;
    
    enemy.add(alien);
  }
}
