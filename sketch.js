let state = "title";
let score = 0;
let highScore = 0;

let y;
let speed;
let gravity = 0.5;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);

  let saved = localStorage.getItem("thread_highscore");
  if (saved) {
    highScore = int(saved);
  }

  resetGame();
}

function draw() {
  background(240);

  if (state === "title") {
    drawTitle();
  } else if (state === "play") {
    drawGame();
  } else if (state === "gameover") {
    drawGameOver();
  }
}

// =====================
// タイトル画面
// =====================
function drawTitle() {
  fill(0);

  textSize(32);
  text("THREAD MASTER", width / 2, 140);

  textSize(16);
  text("Tap to Play", width / 2, 200);

  textSize(12);
  text("Hold = Up / Release = Down", width / 2, 230);
}

// =====================
// ゲーム画面
// =====================
function drawGame() {
  fill(0);

  y += speed;
  speed += gravity;

  if (mouseIsPressed) {
    speed = -5;
  }

  ellipse(width / 2, y, 20, 20);

  score++;
  textSize(16);
  text("Score: " + score, width / 2, 30);

  if (y > height || y < 0) {
    endGame();
  }
}

// =====================
// ゲームオーバー画面
// =====================
function drawGameOver() {
  background(240);
  fill(0);

  textSize(32);
  text("GAME OVER", width / 2, 150);

  textSize(18);
  text("Score: " + score, width / 2, 200);
  text("Best: " + highScore, width / 2, 230);

  textSize(14);
  text("Tap to Retry", width / 2, 280);
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
