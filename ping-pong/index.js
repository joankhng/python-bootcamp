// This is the pong project (main.py, paddle.py, ball.py, scoreboard.py)
// re-created in JavaScript, so the game can run in a web page.
// Same rules: paddles move 20 per press, ball bounces at y +/-280,
// paddle hits within distance 50 past x +/-320, miss at +/-380 scores,
// and the ball speeds up 10% on every bounce.

const runButton = document.getElementById("run-button");
const canvas = document.getElementById("game");
const resultBox = document.getElementById("race-result");
const ctx = canvas.getContext("2d");

// Turtle coords: (0,0) at canvas centre (400, 300), y axis pointing up
function px(x) { return 400 + x; }
function py(y) { return 300 - y; }

// paddle.py
const r_paddle = { x: 350, y: 0 };
const l_paddle = { x: -350, y: 0 };
const PADDLE_STEP = 20;

// ball.py
const ball = { x: 0, y: 0, x_move: 10, y_move: 10, move_speed: 100 };

function ball_move() {
  ball.x += ball.x_move;
  ball.y += ball.y_move;
}

function bounce_y() {
  ball.y_move *= -1;
  ball.move_speed *= 0.9;
}

function bounce_x() {
  ball.x_move *= -1;
  ball.move_speed *= 0.9;
}

function reset_position() {
  ball.x = 0;
  ball.y = 0;
  ball.move_speed = 100;
  bounce_x();
}

// scoreboard.py
let l_score = 0;
let r_score = 0;

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

let is_game_on = false;

// main.py's key bindings
document.addEventListener("keydown", (event) => {
  if (!is_game_on) return;
  if (["ArrowUp", "ArrowDown"].includes(event.key)) {
    event.preventDefault();
  }
  if (event.key === "ArrowUp") r_paddle.y += PADDLE_STEP;
  if (event.key === "ArrowDown") r_paddle.y -= PADDLE_STEP;
  if (event.key === "w") l_paddle.y += PADDLE_STEP;
  if (event.key === "s") l_paddle.y -= PADDLE_STEP;
});

function drawFrame() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // scoreboard
  ctx.fillStyle = "#fff";
  ctx.font = "20px Courier";
  ctx.textAlign = "left";
  ctx.fillText(`P1: ${l_score}`, px(-200), py(200));
  ctx.textAlign = "right";
  ctx.fillText(`P2: ${r_score}`, px(200), py(200));

  // paddles: 20 wide, 100 tall
  ctx.fillRect(px(r_paddle.x) - 10, py(r_paddle.y) - 50, 20, 100);
  ctx.fillRect(px(l_paddle.x) - 10, py(l_paddle.y) - 50, 20, 100);

  // ball
  ctx.beginPath();
  ctx.arc(px(ball.x), py(ball.y), 10, 0, Math.PI * 2);
  ctx.fill();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// main.py's game loop
async function runProgram() {
  canvas.hidden = false;
  is_game_on = true;
  drawFrame();

  while (is_game_on) {
    await sleep(ball.move_speed);
    ball_move();

    // Detect collision with top and bottom walls and bounce
    if (ball.y > 280 || ball.y < -280) {
      bounce_y();
    }

    // Detect collision with paddle
    if ((distance(ball, r_paddle) < 50 && ball.x > 320 && ball.x_move > 0)
      || (distance(ball, l_paddle) < 50 && ball.x < -320 && ball.x_move < 0)) {
      bounce_x();
    }

    // Detect when a paddle misses
    if (ball.x > 380) {
      reset_position();
      l_score += 1;
    } else if (ball.x < -380) {
      reset_position();
      r_score += 1;
    }

    drawFrame();
  }
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
});
