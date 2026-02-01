// ===============================
// 糸通しゲーム（p5 Web Editor風）
// ===============================

// 状態
let state = "title"; // "title", "play", "gameover"

// 糸の先端
let headX = 80;
let y = 200;
let speedY = 0;
let gravity = 0.4;

// 針
let needleX;
let needleY;
let needleGap = 60;
let needleSpeed = 2;

// スコア
let score = 0;
let highScore = 0;

// HARDモード
let hardMode = false;

// ===============================
// 初期化
// ===============================
function setup() {
  createCanvas(windowWidth, windowHeight * 0.7); // ← スマホで画面いっぱい
  pixelDensity(1);

  textAlign(LEFT, TOP);
  strokeWeight(1); // ← 細い線（元と同じ）

  let saved = localStorage.getItem("thread_highscore");
  if (saved) {
    highScore = int(saved);
  }

  resetGame();
}

// ===============================
// リサイズ対応
// ===============================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight * 0.7);
}

// ===============================
// メインループ
// ===============================
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

// ===============================
// タイトル
// ===============================
function drawTitle() {
  fill(0);
  textSize(24);
  text("THREAD MASTER", 20, 40);

  textSize(14);
  text("Tap to Start", 20, 80);
  text("Hold = Up / Release = Down", 20, 110);
  text("Press H = HARD MODE", 20, 140);
  text("Best: " + highScore, 20, 180);
}

// ===============================
// ゲーム画面
// ===============================
function drawGame() {
  fill(0);

  // 糸の動き
  y += speedY;
  speedY += gravity;

  if (mouseIsPressed) {
    speedY = -4;
  }

  y = constrain(y, 20, height - 20);

  // 針移動
  needleX -= needleSpeed;
  if (needleX < -20) {
    needleX = width + random(100, 200);
    needleY = random(100, height - 100);
    score++;
  }

  // 当たり判定
  if (
    headX > needleX &&
    headX < needleX + 10 &&
    (y < needleY - needleGap / 2 ||
      y > needleY + needleGap / 2)
  ) {
    endGame();
  }

  // ==================
  // 描画
  // ==================
  stroke(0);

  // 糸
  line(headX - 40, y, headX, y);
  noStroke();
  ellipse(headX, y, 5, 5);

  // 針
  fill(120);
  rect(needleX, needleY - needleGap / 2 - 40, 10, 40);
  rect(needleX, needleY + needleGap / 2, 10, 40);

  // UI
  fill(0);
  textSize(14);
  text("Score: " + score, 10, 10);
  text("Best: " + highScore, width - 100, 10);

  if (hardMode) {
    text("HARD", width - 60, 40);
  }
}

// ===============================
// ゲームオーバー
// ===============================
function drawGameOver() {
  background(240);
  fill(0);

  textSize(32);
  text("GAME OVER", 20, 100);

  textSize(18);
  text("Score: " + score, 20, 150);
  text("Best: " + highScore, 20, 180);

  textSize(14);
  text("Tap to Retry", 20, 220);
}

// ===============================
// 制御
// ===============================
function resetGame() {
  y = height / 2;
  speedY = 0;
  score = 0;

  needleX = width + 100;
  needleY = height / 2;

  if (hardMode) {
    needleSpeed = 4;
    needleGap = 40;
  } else {
    needleSpeed = 2;
    needleGap = 60;
  }

  state = "play";
}

function endGame() {
  state = "gameover";

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("thread_highscore", highScore);
  }
}

// ===============================
// 入力
// ===============================
function mousePressed() {
  if (state === "title" || state === "gameover") {
    resetGame();
  }
}

function keyPressed() {
  if (key === "h" || key === "H") {
    hardMode = !hardMode;
  }
}
