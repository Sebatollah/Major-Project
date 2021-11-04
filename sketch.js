// Major Project
// Seb
// October 19, 2021
// The ideas for this project come from Brandon Sanderson's Mistborn books

let player;
let playerX;
let playerY;
let rectY;
let rectH;
let radius = 25;
let speed = 5;
let grav = 0.1;
let dy = 1;
let airtime = false;
let flooring;
let pushingLine;
let startGame = false;
let levelEditor = false;
let d;
let pushSpeed = 5;
let level1;
let rows = 21;
let cols = 16;
let cellwidth;
let cellHeight;
let grid;
let playerCellYU;
let playerCellXL;
let playerCellYD;
let playerCellXR;
let newPlayerCellYU;
let newPlayerCellXL;
let newPlayerCellYD;
let newPlayerCellXR;
let jumpPlayerCellYU;
let idle1;
let idle2;
let idle3;
let idletime = 5000;
let isIdle = false;
let tutorialLevel = false;

function preload() {
  player = loadImage("assets/Old hero1.png"); //load player image
  level1 = loadJSON("assets/starting-level.json");
  idle1 = loadImage("assets/old-hero-idle2.png");
  idle2 = loadImage("assets/old-hero-idle3.png");
  idle3 = loadImage("assets/old-hero-idle4.png");
}

function setup() {
  createCanvas(1599,788);
  rectY = height * 0.9;
  rectH = height * 0.1;
  flooring = rectY;
  grid = level1;
  cellwidth = width / rows;
  cellHeight = height / cols;
}

let floorhit = false;
let leftwallhit = false;
let roofhit = false;
let rightwallhit = false;

function draw() {
  background(156, 140, 132);
  makeStartingScreen();
  //
  displayGrid();
  //
  d = dist(width * 0.45 - 25, rectY + 5, playerX + radius, playerY + radius);
  //
  playerCellXL = Math.floor(playerX/cellwidth);
  playerCellYU = Math.floor(playerY/cellHeight);
  playerCellXR = Math.floor((playerX+radius+radius)/cellwidth);
  playerCellYD = Math.floor((playerY+radius+radius)/cellHeight);

  newPlayerCellXL = Math.floor((playerX-speed)/cellwidth);
  newPlayerCellYU = Math.floor((playerY-speed)/cellHeight);
  newPlayerCellXR = Math.floor((playerX+radius+radius+speed)/cellwidth);
  newPlayerCellYD = Math.floor((playerY+radius+radius+speed)/cellHeight);
  //
  //
  handleKeys(); //player movement
  //
  drawPlayer();
  //
  floorhitbox();
  //
  leftwallhitbox();
  //
  roofhitbox();
  //
  rightwallhitbox();
  //
  gravity();
  //
  //createPushingLine();
  //
  editor();
  //
  tutorial();
  //
  if (mouseIsPressed === true) {
    if (mouseButton === LEFT) {
      if (mouseX >= width * 0.45 - 50 && mouseX <= width * 0.45) {
        if (mouseY >= rectY && mouseY <= rectY + 10) {
          steelPush();
        }
      }
    }
    else if (mouseButton === RIGHT) {
      if (mouseX >= width * 0.45 - 50 && mouseX <= width * 0.45) {
        if (mouseY >= rectY && mouseY <= rectY + 10) {
          ironPull();
        }
      }
    }
  }
  //
}
function createPushingLine() {
  if (startGame === true) {
    push();
    translate(width * 0.45 - 25, rectY + 5);
    pushingLine = atan2(playerY-(rectY + 5) + radius, playerX-(width * 0.45 - 25) + radius);
    rotate(pushingLine);
    stroke (0,123,255, 240);
    line(0, 0, d, 0);
    pop();
  }
}

function displayGrid() {
  if (startGame === true) {
    for (let y=0; y<cols; y++) {
      for (let x=0; x<rows; x++) {
        if (grid[y][x] === 0) {//empty space
          fill(156, 140, 132);
          stroke(156, 140, 132);
          rect(x*cellwidth, y*cellHeight, cellwidth, cellHeight);
        }
        else if (grid[y][x] === 1) {//block
          fill(200);
          stroke(200);
          rect(x*cellwidth, y*cellHeight, cellwidth, cellHeight);
        }
        else if (grid[y][x] === 2) {//metal
          fill(255);
          stroke(255);
          rect(x*cellwidth, y*cellHeight, cellwidth, cellHeight);
        }
        else if (grid[y][x] === 3) {//starting point
          playerX = x*cellwidth;
          playerY = y*cellHeight - 10;
          fill(156, 140, 132);
          stroke(156, 140, 132);
          rect(x*cellwidth, y*cellHeight, cellwidth, cellHeight);
          grid[y][x] = 0;
        }
        else if (grid[y][x] === 4) {//finish line
          fill(0);
          stroke(0);
          rect(x*cellwidth, y*cellHeight, cellwidth, cellHeight);
        }
      }
    }
  }
}

function gravity() {
  if (floorhit === true) { //increases the velocity with the gravity (grav) until the player hits the floor
    playerY -= dy;
    dy = 0;
    airtime = false;
  }
  else {
    playerY += dy;
    dy += grav;
  }
}

function editor() {
  if (levelEditor === true) {
    window.location = "https://sebatollah.github.io/gridbased-game/";
  }
}
function tutorial() {
  if (tutorialLevel === true) {
    window.location = "https://sebatollah.github.io/interactive-scene/";
  }
}

function makeStartingScreen() {
  if (startGame === false) {
    if (levelEditor === false) {
      background("grey");

      fill("darkgrey");
      rect(width/2 - 250, height/2 - 10, 500, 130);//start button
  
      textSize(80);
      fill("blue");
      text("SEBASTIAN'S MISTBORN GAME", width/2 - 600, height*0.3, 1250, 1000);//title
      
      textSize(40);
      fill("black");
      text("CLICK TO START", width/2 - 150, height/2 + 30, 500, 130);//start button
  
      fill("darkgrey");
      rect(width/2 - 250, height*0.75 - 10, 500, 130);// level maker button
  
      textSize(40);
      fill("black");
      text("LEVEL EDITOR", width/2 - 150, height*0.75 + 30, 500, 130);

      fill("darkgrey");
      rect(width/2 - 550, height/2 - 10, 250, 130);// tutorial level button

      textSize(40);
      fill("black");
      text("TUTORIAL", width/2 - 520, height/2 + 35, 250, 130);
    }
  }
}

function steelPush() {
  playerX += cos(pushingLine) * pushSpeed;
  playerY += sin(pushingLine) * pushSpeed;
}

function ironPull() {
  playerX -= cos(pushingLine) * pushSpeed;
  playerY -= sin(pushingLine) * pushSpeed;
}

function mouseClicked() {
  if (startGame === false) {
    if (mouseX >= width/2 - 250 && mouseX <= width/2 + 250) {
      if (mouseY >= height/2 - 10 && mouseY <= height/2 +120) {
        startGame = true;
      }
    }
  }
  if (levelEditor === false) {
    if (startGame === false) {
      if (mouseX >= width/2 - 250 && mouseX <= width/2 + 250) {
        if (mouseY >= height*0.75 - 10 && mouseY <= height*0.75 + 120) {
          levelEditor = true;
        }
      }
    }
  }
  if (tutorialLevel === false) {
    if (startGame === false) {
      if (mouseX >= width/2 - 550 && mouseX <= width/2 - 420) {
        if (mouseY >= height/2 - 10 && mouseY <= height/2 +240) {
          tutorialLevel = true;
        }
      }
    }
  }
}

function drawMetal() {
  if (startGame === true) {
    fill(255);
    rect(width * 0.45 - 50, rectY, 50, 10);
  }
}

function drawPlayer() {
  if (startGame === true) {
    if (isIdle === false) {
      image(player, playerX, playerY, radius * 2, radius * 2);
    }
    if (isIdle === true) {
      image(player, playerX, playerY, radius * 2, radius * 2);
    }
  }
}

function leftwallhitbox() {
  if (playerCellYD >= 0 && playerCellYD <= cols && playerCellYU >= 0 && playerCellYU <= cols) {
    if (playerCellXL >= 0 && playerCellXL <= rows) {
      if (grid[playerCellYD][playerCellXL] === 1 || grid[playerCellYU][playerCellXL] === 1 || grid[playerCellYD][playerCellXL] === 2 || grid[playerCellYU][playerCellXL] === 2) {
        leftwallhit = true;
      }
      else {
        leftwallhit = false;
      }
    }
  }
}

function rightwallhitbox() {
  if (playerCellYD >= 0 && playerCellYD <= cols && playerCellYU >= 0 && playerCellYU <= cols) {
    if (playerCellXR >= 0 && playerCellXR <= rows) {
      if (grid[playerCellYD][playerCellXR] === 1 || grid[playerCellYU][playerCellXR] === 1 || grid[playerCellYD][playerCellXR] === 2 || grid[playerCellYU][playerCellXR] === 2) {
        rightwallhit = true;
      }
      else {
        rightwallhit = false;
      }
    }
  }
}

function roofhitbox() {
  if (playerCellYU >= 0 && playerCellYU <= cols) {
    if (playerCellXL >= 0 && playerCellXL <= rows && playerCellXR >= 0 && playerCellXR <= rows) {
      if (grid[playerCellYU][playerCellXL] === 1 || grid[playerCellYU][playerCellXR] === 1 || grid[playerCellYU][playerCellXL] === 2 || grid[playerCellYU][playerCellXR] === 2) {
        roofhit = true;
      }
      else {
        roofhit = false;
      }
    }
  }
}

function floorhitbox() {
  if (playerCellYD >= 0 && playerCellYD <= cols) {
    if (playerCellXL >= 0 && playerCellXL <= rows && playerCellXR >= 0 && playerCellXR <= rows) {
      if (grid[playerCellYD][playerCellXL] === 1 || grid[playerCellYD][playerCellXR] === 1 || grid[playerCellYD][playerCellXL] === 2 || grid[playerCellYD][playerCellXR] === 2) {
        floorhit = true;
      }
      else {
        floorhit = false;
      }
    }
  }
}

function handleKeys() { //allows movement
  // if (keyIsDown(87)) {
  // //w
  //   if (roofhit === false) {
  //     if (grid[newPlayerCellYU][playerCellXL] === 0 && grid[newPlayerCellYU][playerCellXR] === 0) {
  //       playerY -= speed;
  //     }
  //   }
  // }

  // if (keyIsDown(83)) {
  // //s
  //   if (floorhit === false) {
  //     if (grid[newPlayerCellYD][playerCellXL] === 0 && grid[newPlayerCellYD][playerCellXR] === 0) {
  //       playerY += speed;
  //     }
  //   }
  // } comment out all this to move up and down by a little bit

  if (keyIsDown(65)) {
    //a
    if (playerX > 0) {
      if (leftwallhit === false) {
        if (grid[playerCellYU][newPlayerCellXL] === 0 && grid[playerCellYD][newPlayerCellXL] === 0) {
          playerX -= speed;
        }
      }
    }
  }
  if (keyIsDown(68)) {
    //d
    if (playerX + radius*2 < width) {
      if (rightwallhit === false) {
        if (grid[playerCellYU][newPlayerCellXR] === 0 && grid[playerCellYD][newPlayerCellXR] === 0) {
          playerX += speed;
        }
      }
    }
  }
}

function keyPressed() { // checks if the player is on the ground and if he is then when the space bar is pressed jump
  if (airtime === false && dy <= 1) {
    if (key === " ") {
      //spacebar
      dy = -5;
      airtime = true;
    }
  }
}