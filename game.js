document.getElementById("askButton").addEventListener("click", showFirstPopup);

function showFirstPopup() {
    document.getElementById("popup1").style.display = "block";
}

function showSecondPopup() {
    document.getElementById("popup1").style.display = "none";
    document.getElementById("popup2").style.display = "block";
}

function showFinalPopup() {
    document.getElementById("popup2").style.display = "none";
    document.getElementById("popup3").style.display = "block";
}

function startGame() {
    document.getElementById("popup3").style.display = "none";
    document.getElementById("game-container").style.display = "block";  // Show the game area
    startGameLogic(); // Call the game logic function to start the game
}

// Game code
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let basket = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 20,
    dx: 5
};

let hearts = [];
let score = 0;
let isGameOver = false;

function drawBasket() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawHearts() {
    for (let i = 0; i < hearts.length; i++) {
        let heart = hearts[i];
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(heart.x, heart.y, 10, 0, Math.PI * 2, false);
        ctx.fill();
        heart.y += heart.dy;

        if (heart.y > canvas.height - 50 && heart.x > basket.x && heart.x < basket.x + basket.width) {
            hearts.splice(i, 1);
            score++;
            document.getElementById('score').innerText = score;
        }

        if (heart.y > canvas.height) {
            hearts.splice(i, 1);
        }
    }
}

function generateHeart() {
    let x = Math.random() * (canvas.width - 20) + 10;
    hearts.push({ x: x, y: 0, dy: 3 });
}

function moveBasket() {
    if (rightPressed && basket.x < canvas.width - basket.width) {
        basket.x += basket.dx;
    } else if (leftPressed && basket.x > 0) {
        basket.x -= basket.dx;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGameArea() {
    if (isGameOver) return;
    clearCanvas();
    drawBasket();
    drawHearts();
    moveBasket();

    if (Math.random() < 0.05) {
        generateHeart();
    }

    requestAnimationFrame(updateGameArea);
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'ArrowLeft') {
        leftPressed = true;
    }
});

document.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'ArrowLeft') {
        leftPressed = false;
    }
});

// Start the game
function startGameLogic() {
    updateGameArea();
}
