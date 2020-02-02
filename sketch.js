var police,police_img;
var culprit_1,culprit_stand_img,culprit_run_img_1,boy_stand;
var border_left,border_right,border_up,border_down;
var backround,background_img;
var Story = 2;
var PLAY = 1;
var END = 0;
var WON = 3;
var INSTRUCT = 4;
var GameState = INSTRUCT;
var right_edge;
var left_edge;
var bottom_edge;
var top_edge;
var score = 10;
var text_box;
var reset,reset_img;
var ohnoSound,whistleSound;
var win_box;
var continue_box;




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
  police.scale = 0.8;
  police.velocityX = 3;
  police.velocityY = -1;
  
  reset = createSprite(width/2,height/2+100,30,30);
  reset.addImage("again",reset_img)
  reset.visible = false;
  
  
  border_left = createSprite(width/width+30,height/2-100,450,3);
     border_left.visible  = false;


border_right = createSprite(width-210,height/4-50,3,250);
     border_right.visible  = false;

  border_top = createSprite(width/2+30,height/4-50,150,3);
     border_top.visible  = false;

  border_down = createSprite(width/2,height,width,3);
   border_down.visible  = false;
  
  continue_box = createSprite(width/2,height/2,width,height);
  continue_box.visible = false;


  
  
  
  culprit_1 = createSprite(width - 300,height - 150,20,20);
  culprit_1.scale = 0.8;
  culprit_1.addImage("badboy!",culprit_stand_img);
    culprit_1.addAnimation("turning",boy_stand);
  culprit_1.addAnimation("culprit",culprit_run_img_1);

  culprit_1.visible = true;

  
  culprit_2 = createSprite(culprit_1.x,culprit_1.y,20,20);
  culprit_2.visible = false;
  
  vanish_box = createSprite(width/2+20,255,70,70)
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
  
      police.bounceOff(border_top);

    police.bounceOff(border_down);
    police.bounceOff(border_left);
      police.bounceOff(border_right);
  
        culprit_1.bounceOff(border_top);

    culprit_1.bounceOff(border_down);
    culprit_1.bounceOff(border_left);
      culprit_1.bounceOff(border_right);

  
  
  textSize(15);
        fill(255,255,255); 
   // text("Fine collected: "+ score, 500,50);


  
  
  
  
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
  
  if (GameState === INSTRUCT){
  background(255);
    police.visible = false;
    culprit_1.visible = false;
    fill(255,0,0);
    text("YOUR AIM IS TO CATCH THE CULPRIT.",width/2-100,height/2);
    text("use arrow keys to move!",width/2-100,height/2+50);
    text("your character is police!",width/2-100,height/2+100)
    if (mousePressedOver(continue_box)){
    GameState = Story
                police.visible = true;
    culprit_1.visible = true;
    }
  }
  
  
  
  
  
  
  
  
  
  

  if (GameState === Story){
    
    if (police.x >= 100){
    police.velocityX = 5;
          police.visible = true;
    culprit_1.visible = true;

    }
    

    
    
    //  text("Press spacebar to move to the thief",width/3,height /3);
  
  if (police.isTouching(win_box)){
  whistleSound.play();  
  culprit_1.velocityY = -2;
  culprit_1.velocityX = -1;
    culprit_1.changeAnimation("turning",boy_stand);
    culprit_1.changeAnimation("culprit",culprit_run_img_1);

   

    
 


    GameState = PLAY;
  }
  }
  
  if (GameState === PLAY){
    if (GameState === PLAY && police.isTouching(culprit_1)){
      culprit_2.visible = true;
    }  
     culprit_1.setCollider('rectangle',0,0,50,50);
    
    police.visible = true;
    culprit_1.visible = true;



  
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
      
      culprit_1.x = width - 700;
      culprit_1.y  = height-150;
      police.x = 0-10;
      police.y = height-100;
      police.velocityX = 0;
      culprit_1.velocityY = -0;
      culprit_1.velocityX = -0;
      score += 10;
      
  culprit_1.changeAnimation("badboy!",culprit_stand_img);
      
      
    }

  }
  
    if (GameState === WON){
           background(rgb(0,0,0,0.5));
      police.visible = false;
      culprit_2.visible = false;
      culprit_1.visible = false;
          reset.visible = true;

      
      score  = score += 110;

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
      
      culprit_1.x = width - 700;
      culprit_1.y  = height-150;
      police.x = 0-10;
      police.y = height-100;
      police.velocityX = 0;
      culprit_1.velocityY = -0;
      culprit_1.velocityX = -0;
      
       culprit_1.changeAnimation("badboy!",culprit_stand_img);
      
      
    }
      


    }
console.log(police.x,police.y);
  drawSprites();
 
}
