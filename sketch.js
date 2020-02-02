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

var coin_1,coin_2,coin_3,coin_4,coin_img;




function preload(){
  
  culprit_stand_img = loadImage("man-1.png","man-3.png");  
  culprit_run_img_1 = loadAnimation("man-2.png","man-3.png","man-4.png","man-5.png");
  background_img = loadImage("bg-img.jpg");
  police_img = loadAnimation("police-1.png","police-6.png","police-7.png");
  reset_img = loadImage("reset.png");
ohnoSound = loadSound('oh no.mp3');
  whistleSound = loadSound("POLWHST2.mp3");
  boy_stand = loadImage("man-1b.png");
  coin_img = loadImage("coin.png");

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
  
  
  
  coin_1 = createSprite(width/2,height/6,20,20);
  coin_1.addImage("gold",coin_img);
  coin_1.scale = 0.7;
  coin_1.visible = false;
  
    coin_2 = createSprite(width/2+50,height/6,20,20);
    coin_2.addImage("gold1",coin_img);
    coin_2.scale = 0.7;
  coin_2.visible = false;
  
    coin_3 = createSprite(width/2+100,height/6,20,20);
    coin_3.addImage("gold2",coin_img);
    coin_3.scale = 0.7;
  coin_3.visible = false;
  
    coin_4 = createSprite(width/2+150,height/6,20,20);
    coin_4.addImage("gold3",coin_img);
    coin_4.scale = 0.7;
  coin_4.visible = false;


  
  
  
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

  bottom_edge = createSprite(width/2,height,width+width,3);
  
  top_edge = createSprite(width/2,0,width+width,3);
  
  
  
  

  
  
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
  
       if( culprit_1.isTouching(border_top)||culprit_1.isTouching(border_down)||culprit_1.isTouching(border_left)||culprit_1.isTouching(border_right)
){
    GameState = END;   
       }

    
      
  
  
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
      coin_1.visible = true;
  coin_2.visible = true;
  coin_3.visible = true;
  coin_4.visible = true;
    
    

    fill(0,0,0);
    text("WELCOME TO 'ENVIRONMENT RULE BREAKER CAUGHT' GAME .",width/2-200,height/2-100);
    text("The Game Developed for Creating awareness to Public against Environment Distruction",width/2-250,height/2-50);
    text("HOW TO PLAY THE GAME : ",width/2-250,height/2);
    text("- Use Arrow Keys (Up/ Down/ Right / Left) Catch the Culprit who Distruct Our enviroment and Save our Earth ",width/2-250,height/2+50)
    text("- As a Environment Saving Police men Be proud to save your Earth.",width/2-250,height/2+100);
    text("'HAPPY PLAYING'",width/2-250,height/2+150);
    text("Thank you, Ramachandran (VIII B), BNM Public School, Bangalore ",width/2-250,height/2+200);
    if (mousePressedOver(continue_box)){
    GameState = Story
                police.visible = true;
    culprit_1.visible = true;
  coin_1.visible = false;
  coin_2.visible = false;
  coin_3.visible = false;
  coin_4.visible = false;
    }
  }
  
  
  
  
  
  
  
  
  
  

  if (GameState === Story){
    
    if (police.x >= 100){
    police.velocityX = 5;
          police.visible = true;
    culprit_1.visible = true;
        coin_1.visible = false;
  coin_2.visible = false;
  coin_3.visible = false;
  coin_4.visible = false;

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
      coin_1.visible = false;
  coin_2.visible = false;
  coin_3.visible = false;
  coin_4.visible = false;



  
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
    text("you lost two coins!!",width/3,height/2+60);
    
    
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
      
        coin_1.visible = true;
  coin_2.visible = true;
  coin_3.visible = false;
  coin_4.visible = false;

      
      score  = score += 110;

     textSize(15);
      fill(255,255,255); 
    text("CONGRATULATIONS!! YOU HAVE CAUGHT THE CULPRIT",width/20,150);
      text("THE CRIME HE HAD CAUSED IS HOLDING PLASTIC BAGS OR USING IT!",width/20,170);
     
         text("1,00,000 MARINE ANIMALS DIE BECAUSE OF THIS PLASTIC",width/20,210);
      text("SO, STOP USING PLASTIC",width/20,230);
      text("YOU GOT TWO COINS!!",width/2,250);
      
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
