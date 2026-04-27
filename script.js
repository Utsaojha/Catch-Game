const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let player = {
    x: 180,
    y: 550,
    width: 40,
    height: 20,
    speed: 6
};

let blocks = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
    if (e.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    }
    if (e.key === "ArrowRight" && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

function spawnBlock() {
    blocks.push({
        x: Math.random() * (canvas.width - 20),
        y: 0,
        size: 20,
        speed: 2 + score * 0.1
    });
}

function updateBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].y += blocks[i].speed;

        // collision
        if (
            blocks[i].y + blocks[i].size >= player.y &&
            blocks[i].x < player.x + player.width &&
            blocks[i].x + blocks[i].size > player.x
        ) {
            blocks.splice(i, 1);
            score++;
            document.getElementById("score").innerText = "Score: " + score;
        }

        // missed block
        else if (blocks[i].y > canvas.height) {
            gameOver = true;
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBlocks() {
    ctx.fillStyle = "red";
    blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, block.size, block.size);
    });
}

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 110, 300);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawBlocks();
    updateBlocks();

    requestAnimationFrame(gameLoop);
}

// spawn blocks repeatedly
setInterval(spawnBlock, 1000);

gameLoop();