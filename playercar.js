class Player {
    constructor() {
        track1 = createSprite(590, 300);
        track2 = createSprite(590, -4000);
        playerxPos = Math.round(random(0, 5));
        this.flame = createSprite(playerX[playerxPos], 300 + 80);
        this.car = createSprite(playerX[playerxPos], 300);
        track1.addImage(trackImg);
        track2.addImage(trackImg);
        this.flame.addImage(flameImg);
        this.car.addImage(carImg);
        this.flame.scale = 0.1;
        this.car.scale = 0.5;
        this.flame.visible = false;
        this.car.visible = false;
        this.vel = this.car.velocityY;
        distCheck = this.car.y * (-1) + 500;
        trackSelector = track1;
    }
    controls() {
        if (this.car.y > -50000) {
            camera.position.y = this.car.y - 150;
        } else {
            gameState = "end";
            setTimeout(() => {
                enterEndStatewin();
            })
        }
        if (distanceCheck(obsDist, 500, distance)) {
            var obs1 = new Obstacle1(this.car.y - 600);
            obs[obsCount] = new Group();
            obs[obsCount].add(obs1.car);
            obsCount += 1;
            obsDist = this.car.y - 600;
        }
        for (var g = 0; g < obs.length; g++) {
            if (obs[g].isTouching(this.car)) {
                obs[g].destroyEach();
                lives -= 1;
                this.vel += 2;
            }
        }
        if (distanceCheck(trackDist, 2000, distance) === true) {
            trackSelector.y = this.car.y - 600;
            trackDist = this.car.y - 600;
            switchTrack();
        }
        this.car.x = playerX[playerxPos];
        if (keyIsDown(UP_ARROW) && this.vel > carSpeed) {
            started = true;
            this.vel -= 0.2;
        } else if (keyIsDown(DOWN_ARROW) && this.vel <= 0) {
            this.vel += 0.3;
        } else {
            if (this.vel < 0) {
                this.vel += 0.2;
            }
        }
        if (this.car.velocityY > 0) {
            this.car.velocityY -= 0.1;
        }
        this.car.velocityY = this.vel;
        speedometerHand.rotation = this.vel * -6.5;
        speedometer.y = camera.position.y + 250;
        speedometerHand.y = camera.position.y + 250;
        this.flame.x = this.car.x;
        this.flame.y = camera.position.y + 230;
    }
}