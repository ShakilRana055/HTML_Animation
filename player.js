
let man;
let canvas;
let context;
let images = {};
let totalResources = 9;
let numResourcesLoaded = 0;
let fps = 20;
let charX = 205;
let charY = 200;
let breathInc = 0.1;
let breathDir = 1;
let breathAmt = 0;
let breathMax = 2;
let breathInterval = setInterval(updateBreath, 1000 / fps);
let maxEyeHeight = 14;
let curEyeHeight = maxEyeHeight;
let eyeOpenTime = 0;
let timeBtwBlinks = 4000;
let blinkUpdateTime = 200;                    
let blinkTimer = setInterval(updateBlink, blinkUpdateTime);
let fpsInterval = setInterval(updateFPS, 1000);
let numFramesDrawn = 0;
let curFPS = 0;
let jumping;
let throwing = false;
let i=0;
let framerate = 50; // Desired frames per second
let frame_interval = 1000/framerate;
let start_x = null; // desired starting x offset (from left of container)
let start_y = null; // desired starting y offset (from top of containter)
let v = 96.0;
let t = 0;
let angle = 45.0;
let g = 32.0;
let nh;
let nw;

function updateFPS() {
	curFPS = numFramesDrawn;
	numFramesDrawn = 0;
}

class BuildPlayer{
  constructor(){this.context = null;}

  PrepareCanvas(canvasDiv, width, height){
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if(typeof G_vmlCanvasManager != 'undefined') {
      canvas = G_vmlCanvasManager.initElement(canvas);
    }
    this.context = canvas.getContext("2d");
    canvas.width = canvas.width;
    this.PlayerBuilding();
  }
  PlayerBuilding(){
    let playerDress = ["leftArm-jump","legs-jump", "rightArm-jump","leftArm", 
                        "legs", "torso", "rightArm", "head", "hair", "rod"
                      ];
    playerDress.forEach(image => this.LoadImage(image));
  }
  LoadImage(name){
    images[name] = new Image();
    images[name].onload = function() { 
      resourceLoaded();
    }
    images[name].src = "Images/player/" + name + ".png";
  }

  ReBuildPlayer(clickValue){
    let x_axis = clickValue;
    let y_axis = charY;
    let jumpHeight = 2;
    canvas.width = canvas.width;

    if(jumping === true){
      y_axis -= jumpHeight;
	    y_axis += jumpHeight;

      this.DrawEllipse(x_axis+30,y_axis+30,200-breathAmt,4);
      
	    this.context.drawImage(images["leftArm-jump"], x_axis + 45, y_axis - 42 - breathAmt);
      this.context.drawImage(images["rod"], x_axis + 87, y_axis - 150 - breathAmt);
	    this.context.drawImage(images["legs-jump"], x_axis, y_axis- 6);
   	  this.context.drawImage(images["rightArm-jump"], x_axis - 35, y_axis - 42 - breathAmt);
      this.context.drawImage(images["torso"], x_axis, y_axis - 50);
	    this.context.drawImage(images["head"], x_axis - 10, y_axis - 125 - breathAmt);
	    this.context.drawImage(images["hair"], x_axis - 37, y_axis - 138 - breathAmt);

    }
    else{
      this.DrawEllipse(x_axis+30,y_axis+30,200-breathAmt,4);

      this.context.drawImage(images["leftArm"], x_axis + 35, y_axis -35 - breathAmt);
  	  this.context.drawImage(images["rod"], x_axis + 67, y_axis -120 - breathAmt);
	    this.context.drawImage(images["legs"], x_axis, y_axis);
	    this.context.drawImage(images["rightArm"], x_axis -19, y_axis - 42 - breathAmt);
	    this.context.drawImage(images["torso"], x_axis, y_axis - 50);
  	  this.context.drawImage(images["head"], x_axis - 10, y_axis - 125 - breathAmt);
  	  this.context.drawImage(images["hair"], x_axis - 37, y_axis - 138 - breathAmt);
    }
    this.DrawEllipse(x_axis + 46, y_axis - 68 - breathAmt, 8, curEyeHeight); // Left Eye
    this.DrawEllipse(x_axis + 59, y_axis - 68 - breathAmt, 8, curEyeHeight); // Right Eye  
  }

  DrawEllipse(centerX, centerY, width, height) {
    let context = this.context;
    context.beginPath();
    
    context.moveTo(centerX, centerY - height/2);
    
    context.bezierCurveTo(
    centerX + width/2, centerY - height/2,
    centerX + width/2, centerY + height/2,
    centerX, centerY + height/2);
  
    context.bezierCurveTo(
    centerX - width/2, centerY + height/2,
    centerX - width/2, centerY - height/2,
    centerX, centerY - height/2);
   
    context.fillStyle = "black";
    context.fill();
    context.closePath();	
  }
  Sleeper(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
  async Jump(){
    jumping = !jumping ? true : false;
    await this.Sleeper(50);
    this.Land();
  }
  async Land(){
    jumping = jumping ? false : true;
    await Sleeper(50);
    this.Jump();
  }
}

class HookActivity {
  constructor(){}

  
}

function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");
	
	canvas.width = canvas.width; // clears the canvas 
	//context.fillText("m2n", 140, 240);
	
	
	loadImage("leftArm-jump");
	loadImage("legs-jump");
	loadImage("rightArm-jump");
	loadImage("leftArm");
	loadImage("legs");
	loadImage("torso");
	loadImage("rightArm");
	loadImage("head");
	loadImage("hair");
  loadImage("rod");
}

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
	  resourceLoaded();
  }
  images[name].src = "Images/player/" + name + ".png";
}

function resourceLoaded() {

  numResourcesLoaded += 3;
  //redraw();
  if(numResourcesLoaded === totalResources) {
  
	//setInterval(redraw, 1000 / fps);
	//setInterval(throwdraw, 1000 / fps);
	//redraw();
	//throwdraw();
  }
}
function Sleeper(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function redraw(mamun) {
  var x = mamun;
  var y = charY;
  var jumpHeight = 2;
  
  canvas.width = canvas.width; // clears the canvas 

  // Draw shadow
  if(jumping)
  {
    drawEllipse(x+30,y+30,200-breathAmt,4);
  }
  else
   drawEllipse(x+30,y+30,200-breathAmt,4);

 if (jumping) {
 	y -= jumpHeight;
	y += jumpHeight;
 	  //drawEllipse(x + 40, y + 29, 100 - breathAmt, 6);
	context.drawImage(images["leftArm-jump"], x + 45, y - 42 - breathAmt);
    context.drawImage(images["rod"], x + 87, y - 150 - breathAmt);
	context.drawImage(images["legs-jump"], x, y- 6);
   	context.drawImage(images["rightArm-jump"], x - 35, y - 42 - breathAmt);
    context.drawImage(images["torso"], x, y - 50);
	context.drawImage(images["head"], x - 10, y - 125 - breathAmt);
	context.drawImage(images["hair"], x - 37, y - 138 - breathAmt);
  } 
  else {
  	//drawEllipse(x + 40, y + 29, 100 - breathAmt, 4);
	context.drawImage(images["leftArm"], x + 35, y -35 - breathAmt);
  	context.drawImage(images["rod"], x + 67, y -120 - breathAmt);
	context.drawImage(images["legs"], x, y);
	context.drawImage(images["rightArm"], x -19, y - 42 - breathAmt);
	context.drawImage(images["torso"], x, y - 50);
  	context.drawImage(images["head"], x - 10, y - 125 - breathAmt);
  	context.drawImage(images["hair"], x - 37, y - 138 - breathAmt);
  }
  
  drawEllipse(x + 46, y - 68 - breathAmt, 8, curEyeHeight); // Left Eye
  drawEllipse(x + 59, y - 68 - breathAmt, 8, curEyeHeight); // Right Eye

  await Sleeper(200);

  }

function throwdraw(shihan) {

  var x1 = shihan;
  var y1 = charY;
  var throwHeight = 1;
  
  canvas.width = canvas.width; // clears the canvas 

  // Draw shadow
  if (throwing) {
  	y1 -= throwHeight;
	//drawEllipse(x1 + 40, y + 29, 100 - breathAmt, 4);
	context.drawImage(images["leftArm-jump"], x1 + 40, y1 - 42 - breathAmt);
	context.drawImage(images["rod"], x1 + 87, y1 - 150 - breathAmt);
	context.drawImage(images["legs"], x1, y1);
	context.drawImage(images["rightArm-jump"], x1 - 35, y1 - 42 - breathAmt);
	context.drawImage(images["torso"], x1, y1 - 50);
  	context.drawImage(images["head"], x1 - 10, y1 - 125 - breathAmt);
  	context.drawImage(images["hair"], x1 - 37, y1 - 138 - breathAmt);
  } else {
	//drawEllipse(x + 40, y + 29, 100 - breathAmt, 4);
	context.drawImage(images["leftArm"], x1 + 35, y1 -35 - breathAmt);
  	context.drawImage(images["rod"], x1 + 67, y1 -120 - breathAmt);
	context.drawImage(images["legs"], x1, y1);
	context.drawImage(images["rightArm"], x1 -19, y1 - 42 - breathAmt);
	context.drawImage(images["torso"], x1, y1 - 50);
  	context.drawImage(images["head"], x1 - 10, y1 - 125 - breathAmt);
  	context.drawImage(images["hair"], x1 - 37, y1 - 138 - breathAmt);
	}
	
  drawEllipse(x1 + 47, y1 - 68 - breathAmt, 8, curEyeHeight); // Left Eye
  drawEllipse(x1 + 58, y1- 68 - breathAmt, 8, curEyeHeight); // Right Eye
}


function drawEllipse(centerX, centerY, width, height) {

  context.beginPath();
  
  context.moveTo(centerX, centerY - height/2);
  
  context.bezierCurveTo(
	centerX + width/2, centerY - height/2,
	centerX + width/2, centerY + height/2,
	centerX, centerY + height/2);

  context.bezierCurveTo(
	centerX - width/2, centerY + height/2,
	centerX - width/2, centerY - height/2,
	centerX, centerY - height/2);
 
  context.fillStyle = "black";
  context.fill();
  context.closePath();	
}

function updateBreath() { 
				
  if (breathDir === 1) {  // breath in
	breathAmt -= breathInc;
	if (breathAmt < -breathMax) {
	  breathDir = -1;
	}
  } else {  // breath out
	breathAmt += breathInc;
	if(breathAmt > breathMax) {
	  breathDir = 1;
	}
  }
}

function updateBlink() { 
				
  eyeOpenTime += blinkUpdateTime;
	
  if(eyeOpenTime >= timeBtwBlinks){
	blink();
  }
}

function blink() {

  curEyeHeight -= 1;
  if (curEyeHeight <= 0) {
	eyeOpenTime = 0;
	curEyeHeight = maxEyeHeight;
  } else {
	setTimeout(blink, 10);
  }
}

function PromiseReturn(fnName, time){
  return new Promise((resolve, reject)=>{
    resolve(land);
  });
}

function jump() {
if(!jumping)
{
	jumping=true;
 // land();
	setTimeout(land, 300);
  //await Sleeper(300);
	}
}

function land() {
if(jumping)
{
  jumping = false;
  setTimeout(jump, 300);
  }
}

function throwrod() {
if(!throwing)
{
	throwing=true;
	setTimeout(stopthrow, 300);
	//setTimeout(function() { gofish('projectile'); }, 300);
  setTimeout("gofish('projectile')", 300);
  setTimeout("goRandom('fish')", 6800);
	//gofish('projectile');
	}
}

function stopthrow() {
	
  throwing = false;

}

function gofish(projectile_id){
    projectile = $('#' + projectile_id);
    projectile.css("visibility", "visible");
    start_x = projectile.offset().left;
    start_y = projectile.offset().top;
      
    var anim_interval = setInterval(function() {
        t = t+ frame_interval;
        updatePosition(t/1000, start_x, start_y);
        if (t > 5500) {
            clearInterval(anim_interval);
        }
    }, frame_interval);
}

function updatePosition(t, start_x, start_y) {
    
    change_x = v *t*Math.cos(angle);
    change_y = (v *t*Math.sin(angle)) - (0.5*g * Math.pow(t, 2));    
    
    projectile.css({
        left: start_x + change_x + 'px',
        top: start_y -  change_y + 'px'
    });    
    
    i++;
    /*if (i % 15 == 0) {
        c = projectile.clone();
        c.css("opacity", "0.3");
        $("#content").append(c);
    } */
}

function randomPosition(limitzone_id){
    limitzone = $('#' + limitzone_id);
    // Get viewport dimensions (remove the dimension of the div)
    var h = limitzone.height() - 50;
    var w = limitzone.width() - 50;
    
    nh = Math.floor(Math.random() * h);
    nw = Math.floor(Math.random() * w);
    //$("#scoreboard").html(nw);
    
    return [nh,nw];    
    
}

function goRandom(enemy_id){
    obj_enemy = $('#' + enemy_id);
    obj_enemy.css("visibility", "visible");
    var newq = randomPosition('fishzone');
    $("#rodthread").css("visibility", "visible");

    obj_enemy.animate({ top: newq[0], left: newq[1] }, function(){
    goRandom(enemy_id);        
    });
    
}

function disableClick(){
        document.onclick=function(event){
          if (event.button == 2) {
            alert('Right Click Message');
            return false;
          }
        }
      }

/*function makeDiv(enemy_id, zone_id){
    var enemy_obj = $('#' + enemy_id);
    var fixedzone = $('#' + zone_id);
    //var divsize = ((Math.random()*100) + 50).toFixed();
    //var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
    var posx = (Math.random() * (fixedzone.width() - enemy_obj.width())).toFixed();
    var posy = (Math.random() * (fixedzone.height() - enemy_obj.height())).toFixed();
    
    enemy_obj.css({
        'position':'absolute',
        'left':posx+'px',
        'top':posy+'px',
        'display':'none'
    }).appendTo(fixedzone).fadeIn(500).delay(500).fadeOut(500, function(){
       //$(this).remove();
       makeDiv('fish', 'fishzone'); 
    }); 
}

function rodline() {
  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(10,30);
  ctx.lineTo(110,10);
  ctx.lineTo(190,100);
  ctx.stroke();
}*/