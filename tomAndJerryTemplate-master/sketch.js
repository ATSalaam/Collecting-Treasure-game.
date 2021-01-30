var cat, catImage, catRunning;
var mouse, mouseStanding, mouseSword;
var background, backgroundImage;

function preload() {
    catImage = loadImage("cat1.png");
    catRunning = loadAnimation("cat2.png","cat3.png")
    mouseStanding = loadImage("mouse1.png");
    mouseSword = loadImage("mouse4.png");
    backgroundImage = loadImage("garden.png");
}

function setup(){
    createCanvas(1000,800);
    cat = createSprite(900,700,20,30);
    cat.addImage(catImage);

    mouse = createSprite(400,700,10,20);
    mouse.addImage(mouseStanding);

    background = createSprite(1000,800);
    background.addImage(backgroundImage);

}

function draw() {

    background(255);
    
    if(cat.x === mouse.x && cat.y === mouse.y){
        mouse.addImage(mouseSword);
        cat.velocity = 0;
    }

    keyPressed();

    drawSprites();
}


function keyPressed(){

    if(keyCode === LEFT_ARROW){
        cat.velocity = -5;
        cat.addAnimation("catRunning",);
        cat.chageAnimation("catRunning");
    }
  //For moving and changing animation write code here


}
