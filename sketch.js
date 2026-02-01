let y;
let speed;
let score;
let highScore = 0;
let state = "title";

function setup() {
  createCanvas(400, 600);
  textAlign(CENTER, CENTER);

  let saved = localStorage.getItem("thread_highscore");
  if (saved !== null) {
    highScore = int(saved);
  }

  resetGame();
}

function draw() {
  background(30);

  if (state === "title") {
    drawTitle();
  } else if (state === "play") {
    updateGame();
    drawGame();
  } else if (state === "gameover") {
    drawGameOver();
  }
}

// =====================
// タイトル画面
// =====================
function drawTitle() {
  fill(255);
  textSize(32);
  text("Thread Game", width / 2, height / 2 - 40);

  textSize(16);
  text("Click to Start", width / 2, height / 2 + 20);
  text("High Score: " + highScore, width / 2, height / 2 + 60);
}

// =====================
// ゲーム中
// =====================
function updateGame() {
  speed += 0.3;
  y += speed;

  if (y > height - 20) {
    endGame();
  }

  score++;
}

function drawGame() {
  fill(255);
  ellipse(width / 2, y, 30, 30);

  textSize(16);
  text("Score: " + score, width / 2, 20);
  text("High: " + highScore, width / 2, 40);
}

// =====================
// ゲームオーバー
// =====================
function drawGameOver() {
  fill(255);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 40);

  textSize(16);
  text("Score: " + score, width / 2, height / 2);
  text("High Score: " + highScore, width / 2, height / 2 + 30);
  text("Click to Retry", width / 2, height / 2 + 70);
}

// =====================
// ゲーム制御
// =====================
function endGame() {
  state = "gameover";

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("thread_highscore", highScore);
  }
}

function resetGame() {
  y = height / 2;
  speed = 0;
  score = 0;
}

// =====================
// 入力
// =====================
function mousePressed() {
  if (state === "title") {
    resetGame();
    state = "play";
  } else if (state === "gameover") {
    resetGame();
    state = "play";
  }
}
