// ===============================
// 糸通しゲーム 
// タイトル / リトライ / ハイスコア / HARDモード
// GitHub Pages対応 完成版
// ===============================

// 状態
let state = "title"; // "title", "play", "gameover"

// フォント
let gameFont;

// 糸の先端（見えない）
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
// フォント読み込み
// ===============================
function preload() {
  gameFont = loadFont(
    "https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euG6d9k6G9Y.woff"
  );
}

// ===============================
// 初期化
// ===============================
function setup() {
  const c = createCanvas(400, 400);
  c.parent(document.body);

  pixelDensity(1); // ← 見た目ズレ防止（超重要）
  textFont(gameFont);
  textAlign(CENTER, CENTER);
  strokeWeight(3);

  let saved = localStorage.getItem("thread_highscore");
  if (saved) {
    highScore = int(saved);
  }
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
// タイトル画面
// ===============================
function drawTitle() {
  fill(0);
  noStroke();

  textSize(28);
  text("THREAD MASTER", width / 2, 120);

  textSize(14);
  text("Tap to Start", width / 2, 200);

  textSize(10);
  text("Hold = Up / Release = Down", width / 2, 230);
  text("Press H = HARD MODE", width / 2, 260);

  text("Best: " + highScore, width / 2, 300);
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
  ellipse(headX, y, 6, 6);

  // 針
  fill(100);
  rect(needleX, needleY - needleGap / 2 - 40, 10, 40);
  rect(needleX, needleY + needleGap / 2, 10, 40);

  // UI
  fill(0);
  textSize(12);
  textAlign(LEFT, CENTER);
  text("Score: " + score, 10, 20);
  text("Best: " + highScore, 110, 20);

  if (hardMode) {
    textAlign(RIGHT, CENTER);
    text("HARD", width - 10, 20);
  }
}

// ===============================
// ゲームオーバー画面
// ===============================
function drawGameOver() {
  background(240);
  fill(0);
  textAlign(CENTER, CENTER);

  textSize(28);
  text("GAME OVER", width / 2, 150);

  textSize(14);
  text("Score: " + score, width / 2, 200);
  text("Best: " + highScore, width / 2, 230);

  textSize(12);
  text("Tap to Retry", width / 2, 280);
}

// ===============================
// ゲーム制御
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
  if (state === "title") {
    resetGame();
  } else if (state === "gameover") {
    resetGame();
  }
}

function keyPressed() {
  if (key === "h" || key === "H") {
    hardMode = !hardMode;
  }
}
