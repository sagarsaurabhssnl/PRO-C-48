function nitroSpawn() {
    if (frameCount % 300 === 0) {
        nitro = createSprite(random(playerX), playerCar.car.y - 400);
        nitro.addImage(nitroImg);
        nitro.setCollider("rectangle", 0, 0, 100, 200);
        nitro.scale = 0.4;
        nitro.lifetime = 100;
        nitroSpawned = true;
    }
    if (nitroSpawned && playerCar.car.isTouching(nitro)) {
        nitro.destroy();
        nitroTime += 5;
        lives+=1;
        if (nitroTime > 20) {
            nitroTime = 20;
        }
    }
}