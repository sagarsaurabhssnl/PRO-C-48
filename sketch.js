let playerCar, carImg, carSpeed = -30;
let track1, track2, trackImg, trackDist = 0;
let distCheck, trackSelector;
let distance, playerX = [75, 285, 500, 665, 880, 1095], playerxPos;
let obsImg1, obsImg2, obsImg3, obsImg4, obsImg5, obsImg6, obsImg7, obsImg8, obstacleImg = [];
let obs = [], obsCount = 0, obsDist = 0;
let gameState = "mainmenu";
let police, policeGroup, policeCarImg;
let started = false;
let policeCarDiffrence;
let changeCamera = false;
let nitro, nitroImg, nitroTime = 10, nitroTriggered = false, nitroSpawned = false, nitroBottleImg;
let blast, blastAnimation;
let instructionImg, instruction;
let lives = 10, livesImg;
let finishLine, finishLineImg;
let speedometer, speedometerImg, speedometerHand, speedometerHandImg;
let celebration, congratsImg, winnerImg, gameOverImg;
let flameImg, applaudSound, gameoverSound, ready=false;

function preload() {
    nitroImg = loadImage("img/nitro.png");
    carImg = loadImage("img/player.png");
    trackImg = loadImage("img/track.png");
    obsImg1 = loadImage("img/1.png");
    obsImg2 = loadImage("img/2.png");
    obsImg3 = loadImage("img/3.png");
    obsImg4 = loadImage("img/4.png");
    obsImg5 = loadImage("img/5.png");
    obsImg6 = loadImage("img/6.png");
    obsImg7 = loadImage("img/7.png");
    obsImg8 = loadImage("img/8.png");
    obstacleImg = [obsImg1, obsImg2, obsImg3, obsImg4, obsImg5, obsImg6, obsImg7, obsImg8];
    policeCarImg = loadImage("img/police.png");
    policeGroup = new Group();
    blastAnimation = loadAnimation("img/blast/1.png", "img/blast/2.png", "img/blast/3.png", "img/blast/4.png", "img/blast/5.png", "img/blast/6.png", "img/blast/7.png", "img/blast/8.png", "img/blast/9.png", "img/blast/10.png")
    instructionImg = loadImage("img/startins.png");
    livesImg = loadImage("img/tire.png");
    finishLineImg = loadImage("img/finishline.png");
    nitroBottleImg = loadImage("img/nitrobottle.png");
    speedometerImg = loadImage("img/speedometer.png");
    speedometerHandImg = loadImage("img/hand.png");
    congratsImg = loadImage("img/congratulation.png");
    winnerImg = loadImage("img/winner.png");
    gameOverImg = loadImage("img/gameover.png");
    flameImg = loadImage("img/flame.png");
    applaudSound = loadSound("audio/applaud.mp3");
    gameoverSound = loadSound("audio/gameover.mp3");
}

function setup() {
    var mainCanvas = createCanvas(1180, 600);
    finishLine = createSprite(590, -50000);
    finishLine.addImage(finishLineImg);
    playerCar = new Player();
    police = new Policecar(playerCar.car.y);
    policeCarDiffrence = police.car1.y - playerCar.car.y;
    camera.position.y = playerCar.car.y + 5000;
    camera.position.x = police.car3.x + 90;
    setTimeout(() => {
        changeCamera = true;
    }, 1000);
    blast = createSprite(playerCar.car.x, playerCar.car.y);
    blast.addAnimation("blast", blastAnimation);
    blast.visible = false;
    blast.pause();
    setTimeout(() => {
        blast.play();
        blast.visible = true;
        playerCar.car.visible = true;
        setTimeout(() => {
            blast.pause();
            blast.visible = false;
            speedometer = createSprite(1050, camera.position.y + 250);
            speedometerHand = createSprite(1050, camera.position.y + 250);
            speedometer.addImage(speedometerImg);
            speedometerHand.addImage(speedometerHandImg);
            speedometer.scale = 0.3;
            speedometerHand.scale = 0.3;
            speedometer.visible = false;
            speedometerHand.visible = false;
            ready=true;
        }, 1180);
        instruction = createSprite(camera.position.x, 500);
        instruction.addImage(instructionImg);
        instruction.scale = 0.5;
    }, 3500);
    distance = ((playerCar.car.y - 300) * -1);
}

function draw() {
    background(trackImg);
    push();
    imageMode(CENTER);
    image(trackImg, 590, 5000);
    pop();
    finishLine.depth = (((track1.depth + track2.depth) / 2) + 1);
    distance = ((playerCar.car.y - 300));
    blast.y = playerCar.car.y;
    blast.x = playerCar.car.x;
    policeCarDiffrence = police.car1.y - playerCar.car.y;
    policeCarDiffrence = Math.round(policeCarDiffrence);
    playState();
    mainMenu();
    policeCatch();
    drawSprites();
    if (gameState === "play") {
        push();
        translate(camera.x - 570, camera.y + 250);
        fill(200);
        rect(0, 0, 200, 50);
        fill(0);
        text("Press C for Source Code", 5, 15);
        text("Press R to reload the game", 5, 30);
        text("Away From Police Car :" + policeCarDiffrence, 5, 45);
        pop();
        if (started === true) {
            if (nitroTime > 0) {
                fill("#ac518d");
                rect(1050, camera.position.y - 150, 50, nitroTime * -3);
                image(nitroBottleImg, 1050, camera.position.y - 250, 50, 100);
            }
        }
        for (var t = 0, x = 50; t < lives; t++) {
            image(livesImg, x, camera.position.y - 250, 50, 50);
            x += 50;
        }
        if (nitroTriggered) {
            playerCar.flame.visible = true;
            carSpeed = -40;
        } else {
            playerCar.flame.visible = false;
            carSpeed = -30;
        }
        speedometer.visible = true;
        speedometerHand.visible = true;
    } else {
        push();
        translate(camera.x - 570, camera.y + 250);
        fill(200);
        rect(0, 0, 200, 35);
        fill(0);
        text("Press C for Source Code", 5, 15);
        text("Press R to reload the game", 5, 30);
        pop();
        if (ready) {
            speedometer.visible = false;
            speedometerHand.visible = false;
        }
    }
}

function switchTrack() {
    if (trackSelector === track1) {
        trackSelector = track2;
    } else if (trackSelector === track2) {
        trackSelector = track1;
    }
}

function keyPressed() {
    if (keyCode === 67) {
        window.location.href
    }
    if (keyCode === 38 && gameState === "mainmenu" && blast.visible === false) {
        gameState = "play";
    }
    if (keyCode === 82) {
        window.location.reload(false);
    }
    if (keyCode === 37 && playerxPos > 0 && gameState === "play") {
        playerxPos -= 1;
    }
    if (keyCode === 39 && playerxPos < 5 && gameState === "play") {
        playerxPos += 1;
    }
    if (keyCode === 32 && nitroTriggered === false && gameState === "play" && nitroTime > 0) {
        nitroTriggered = true;
        setTimeout(() => {
            nitroTime -= 2.5;
            nitroTriggered = false;
        }, 2000);
    }
}
function distanceCheck(referencePoint1, referencePoint2, distanceParameter) {
    if (referencePoint1 - distanceParameter > referencePoint2) {
        return true;
    } else {
        return false;
    }
}
function policeCatch() {
    if (playerCar.car.y >= police.car1.y && gameState === "play" || lives <= 0 && gameState === "play") {
        playerCar.car.velocityY = 0;
        gameState = "end";
        playerCar.car.destroy();
        blast.play();
        blast.visible = true;
        playerCar.flame.visible = false;
        setTimeout(() => {
            blast.pause();
            blast.visible = false;
            for (var eobs = 0; eobs < obs.length; eobs++) {
                obs[eobs].destroyEach();
            }
            nitro.destroy();
            setTimeout(enterEndStateover(), 2000);
        }, 1180);
    }
}

function enterEndStatewin() {
    celebration = createSprite(camera.position.x, camera.position.y);
    celebration.addImage("congrats", congratsImg);
    celebration.addImage("winner", winnerImg);
    destroyEverything();
    applaudSound.play();
    setTimeout(() => {
        celebration.changeImage("winner");
    }, 2000);
}

function enterEndStateover() {
    celebration = createSprite(camera.position.x, camera.position.y);
    celebration.addImage(gameOverImg);
    destroyEverything();
    gameoverSound.play();
}
