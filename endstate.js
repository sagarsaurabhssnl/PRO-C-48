function endState() {
    if (gameState === "end") {
        if (reward === "win") {

        } else if (reward === "gameover") {

        }
    }
}

function destroyEverything() {
    playerCar.car.destroy();
    for (var o = 0; o < obs.length; o++) {
        obs[o].destroyEach();
    }
}