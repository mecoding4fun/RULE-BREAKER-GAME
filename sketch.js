var police,police_img;
var culprit_1,culprit_stand_img,culprit_run_img_1,boy_stand;
var culprit_2;
var backround,background_img;
var Story = 2;
var PLAY = 1;
var END = 0;
var WON = 3;
var GameState = Story;
var right_edge;
var left_edge;
var bottom_edge;
var top_edge;
var score = 10;
var text_box;
var reset,reset_img;
var ohnoSound,whistleSound;
var win_box;




function preload(){
  
  culprit_stand_img = loadImage("man-1.png","man-3.png");  
  culprit_run_img_1 = loadAnimation("man-2.png","man-3.png","man-4.png","man-5.png");
  background_img = loadImage("bg-img.jpg");
  police_img = loadAnimation("police-1.png","police-6.png","police-7.png");
  reset_img = loadImage("reset.png");
ohnoSound = loadSound('oh no.mp3');
  whistleSound = loadSound("POLWHST2.mp3");
  boy_stand = loadImage("man-1b.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  police = createSprite(0-10,height-100,20,20);
  police.setCollider('rectangle',0,0,50,50);
  police.addAnimation("police_img",police_img);
  police.scale = 0.5;
  police.velocityX = 3;
  police.velocityY = -1;
  
  reset = createSprite(width/2,height/2+100,30,30);
  reset.addImage("again",reset_img)
  reset.visible = false;


  
  
  
  culprit_1 = createSprite(width - 220,height - 150,20,20);
  culprit_1.scale = 0.5;
  culprit_1.addImage("badboy!",culprit_stand_img);
    culprit_1.addAnimation("turning",boy_stand);
  culprit_1.addAnimation("culprit",culprit_run_img_1);

  culprit_1.setCollider('rectangle',0,0,50,50);
  culprit_1.visible = true;

  
  culprit_2 = createSprite(culprit_1.x,culprit_1.y,20,20);
  culprit_2.visible = false;
  
  vanish_box = createSprite(width-400,255,100,100)
  vanish_box.visible = false;
  
  win_box = createSprite(120,height/2,50,height);
   win_box.visible  = false;
 // vanish_box.visible = false;
  


  
  right_edge = createSprite(width,height/2,3,height);

  left_edge = createSprite(0,height/2,3,height);

  bottom_edge = createSprite(width/2,height,width,3);
  
  top_edge = createSprite(width/2,0,width,3);
  
  
  
  

  
  
}

function draw() {
  background(background_img);
  
  
    culprit_1.setCollider('rectangle',0,0,500,500);

      culprit_1.bounceOff(right_edge);
    culprit_1.bounceOff(left_edge);
    culprit_1.bounceOff(top_edge);
    culprit_1.bounceOff(bottom_edge);

    culprit_2.bounceOff(right_edge);
    culprit_2.bounceOff(left_edge);
    culprit_2.bounceOff(top_edge);
    culprit_2.bounceOff(bottom_edge);
  
    police.bounceOff(right_edge);

    police.bounceOff(top_edge);
    police.bounceOff(bottom_edge);
  textSize(15);
        fill(255,255,255); 
   text("Score: "+ score, 500,50);


  
  
  
  
  if(keyDown(RIGHT_ARROW)){
  police.velocityX= 6;
  police.velocityY= 0;

  }
    if(keyDown(LEFT_ARROW)){
  police.velocityX= -6;
  police.velocityY= 0;

  }
    if(keyDown(UP_ARROW)){
  police.velocityY= -6;
  police.velocityX= 0;

      
  }
    if(keyDown(DOWN_ARROW)){
  police.velocityY= 6;
  police.velocityX= 0;

  }

  if (GameState === Story){
    
    if (police.x >= 100){
    police.velocityX = 5;

    }
    

    
    
    //  text("Press spacebar to move to the thief",width/3,height /3);
  
  if (police.isTouching(win_box)){
  whistleSound.play();  
  culprit_1.velocityY = -2;
  culprit_1.velocityX = -1;
    culprit_1.changeImage()
    culprit_1.changeAnimation("turning",boy_stand);
    culprit_1.changeAnimation("culprit",culprit_run_img_1);

   

    
  culprit_1.setCollider('rectangle',0,0,50,50);


    GameState = PLAY;
  }
  }
  
  if (GameState === PLAY){
    if (GameState === PLAY && police.isTouching(culprit_1)){
      culprit_2.visible = true;
    }  
     culprit_1.setCollider('rectangle',0,0,50,50);



  
  if (culprit_1.isTouching(vanish_box)){
GameState = END;

  }   
      if (culprit_1.isTouching(police)){
GameState = WON;

  } 
    
  
  }          
    
  if (GameState === END){
 background(rgb(0,0,0,0.5));
    police.visible = false;
    culprit_2.visible = false;
    culprit_1.visible = false;
    reset.visible = true;
    
    
    score = 0;
    

      fill(255,255,255); 
    text("OH NO!! YOU HAVE LOST THE CULPRIT",width/3-50,height/2);
    text(" HE IS THE CAUSE OF OUR ENVIRONMENT DESTRUCTION!!!",width/3-80,height/2+20);
    

    text("BETTER LUCK NEXT TIME!!!!!",width/3,height/2+40);
    
    
    if (mousePressedOver(reset)&& GameState === END){
    GameState = Story;
      score = 0;
          police.visible = true;
    culprit_2.visible = false;
    culprit_1.visible = true;
    reset.visible = false;
      
      culprit_1.x = width - 220;
      culprit_1.y  = height-150;
      police.x = 100;
      police.y = height-150;
      police.velocityX = 0;
      culprit_1.velocityY = -0;
      culprit_1.velocityX = -0;
      score = 10;
      
  culprit_1.changeAnimation("badboy!",culprit_stand_img);
      
      
    }

  }
  
    if (GameState === WON){
           background(rgb(0,0,0,0.5));
      police.visible = false;
      culprit_2.visible = false;
      culprit_1.visible = false;
          reset.visible = true;

      
      score = 110;

     textSize(15);
      fill(255,255,255); 
    text("CONGRATULATIONS!! YOU HAVE CAUGHT THE CULPRIT",width/20,150);
      text("THE CRIME HE HAD CAUSED IS HOLDING PLASTIC BAGS OR USING IT!",width/20,170);
     
         text("1,00,000 MARINE ANIMALS DIE BECAUSE OF THIS PLASTIC",width/20,210);
      text("SO, STOP USING PLASTIC",width/20,230);
      
          if (mousePressedOver(reset)&& GameState === WON){
    GameState = Story;
      score = 10;
          police.visible = true;
    culprit_2.visible = false;
    culprit_1.visible = true;
    reset.visible = false;
      
      culprit_1.x = width - 220;
      culprit_1.y  = height-150;
      police.x = 100;
      police.y = height-150;
      police.velocityX = 0;
  culprit_1.velocityY = -0;
  culprit_1.velocityX = -0;
      
       culprit_1.changeAnimation("badboy!",culprit_stand_img);
      
      
    }
      
      Score = 500;

    }

  drawSprites();
 
}

