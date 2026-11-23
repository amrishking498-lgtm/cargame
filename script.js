let player = document.getElementById("player");
let enemy = document.getElementById("enemy");

let scoreText = document.getElementById("score");
let bestText = document.getElementById("best");
let message = document.getElementById("message");

let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");

let lanes = [25, 127, 229];
let laneNumber = 1;

let enemyLane = 0;
let enemyTop = -80;

let score = 0;
let bestScore = 0;
let speed = 5;

let gameRunning = false;
let gameLoop;

function startGame() {

    if (gameRunning) {
        return;
    }

    score = 0;
    speed = 5;
    laneNumber = 1;
    enemyTop = -80;

    player.style.left = lanes[laneNumber] + "px";

    enemyLane = Math.floor(Math.random() * 3);
    enemy.style.left = lanes[enemyLane] + "px";
    enemy.style.top = enemyTop + "px";

    scoreText.innerHTML = score;

    message.style.display = "none";

    gameRunning = true;
    startBtn.innerHTML = "Game Running";

    gameLoop = setInterval(playGame, 20);
}

function playGame() {

    enemyTop = enemyTop + speed;

    enemy.style.top = enemyTop + "px";

    let playerTop = 365;
    let playerLeft = lanes[laneNumber];
    let enemyLeft = lanes[enemyLane];

    // Check collision

    if (
        enemyTop + 70 > playerTop &&
        enemyTop < playerTop + 70 &&
        enemyLeft === playerLeft
    ) {
        endGame();
        return;
    }

    // When enemy car passes

    if (enemyTop > 450) {

        score++;

        scoreText.innerHTML = score;

        if (score > bestScore) {
            bestScore = score;
            bestText.innerHTML = bestScore;
        }

        enemyTop = -80;

        enemyLane = Math.floor(Math.random() * 3);

        enemy.style.left = lanes[enemyLane] + "px";

        if (score % 5 === 0) {
            speed = speed + 1;
        }
    }
}

document.addEventListener("keydown", function(event) {

    if (!gameRunning) {
        return;
    }

    if (event.key === "ArrowLeft" && laneNumber > 0) {
        laneNumber--;
    }

    if (event.key === "ArrowRight" && laneNumber < 2) {
        laneNumber++;
    }

    player.style.left = lanes[laneNumber] + "px";

});

function endGame() {

    clearInterval(gameLoop);

    gameRunning = false;

    message.innerHTML =
        "<h2>Game Over!</h2>" +
        "<p>Your Score: " + score + "</p>" +
        "<p>Click Restart to Play Again</p>";

    message.style.display = "block";

    startBtn.innerHTML = "Start Game";
}

function restartGame() {

    clearInterval(gameLoop);

    gameRunning = false;

    startGame();
}

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", restartGame);