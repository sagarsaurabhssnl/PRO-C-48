function endState() {
    if (gameState === "end") {

    }
}

function destroyEverything() {
    playerCar.car.destroyEach();
    for (var o = 0; o < obs.length; o++) {
        obs[o].destroyEach();
    }
}