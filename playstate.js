function playState() {
    if (gameState === "play") {
        frame.style.display = "none";
        policeCarDiffrence = police.car1.y - playerCar.car.y;
        policeCarDiffrence = Math.round(policeCarDiffrence);
        playerCar.controls();
        police.controls();
        nitroSpawn();
    }
}