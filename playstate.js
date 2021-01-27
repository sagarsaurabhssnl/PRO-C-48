function playState() {
    if (gameState === "play") {
        frame.style.display="none";
        playerCar.controls();
        police.controls();
        nitroSpawn();
    }
}