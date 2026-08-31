// This is the snake project (main.py, snake.py, food.py, scoreboard.py, wall.py)
// re-created in JavaScript, so the game can run in a web page.
// Same rules: 20px steps every 0.1s, food within +/-260, death past +/-265,
// no reversing into yourself. Dying resets the snake and play continues.
// The browser cannot write high_score.txt, so the high score is kept in
// localStorage - the web equivalent of a small local file.

const runButton = document.getElementById("run-button");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Turtle coords: (0,0) at canvas centre (300, 300), y axis pointing up
function px(x) { return 300 + x; }
function py(y) { return 300 - y; }

const MOVE_DISTANCE = 20;
const UP = 90, DOWN = 270, LEFT = 180, RIGHT = 0;

const snake = { segments: [], heading: RIGHT };
const food = { x: 0, y: 0 };
let score = 0;
let high_score = 0;
let is_game_on = false;

// scoreboard.py's file read, in browser form
function load_high_score() {
  try {
    high_score = parseInt(localStorage.getItem("snake_high_score")) || 0;
  } catch (e) {
    high_score = 0;
  }
}

function save_high_score() {
  if (score > high_score) {
    high_score = score;
  }
  try {
    localStorage.setItem("snake_high_score", String(high_score));
  } catch (e) {
    // storage unavailable - the high score just lives for this visit
  }
}

function randint(low, high) {
  return low + Math.floor(Math.random() * (high - low + 1));
}

// snake.py
function create_snake() {
  snake.segments = [{ x: 0, y: 0 }, { x: -20, y: 0 }, { x: -40, y: 0 }];
  snake.heading = RIGHT;
}

function move() {
  for (let i = snake.segments.length - 1; i > 0; i--) {
    snake.segments[i] = { ...snake.segments[i - 1] };
  }
  const head = snake.segments[0];
  const rad = (snake.heading * Math.PI) / 180;
  snake.segments[0] = {
    x: head.x + MOVE_DISTANCE * Math.cos(rad),
    y: head.y + MOVE_DISTANCE * Math.sin(rad),
  };
}

function extend() {
  const last = snake.segments[snake.segments.length - 1];
  snake.segments.push({ ...last });
}

// food.py
function refresh_food() {
  food.x = randint(-260, 260);
  food.y = randint(-260, 260);
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function drawFrame() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // wall.py: white square from (-280,-280), sides of 560
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.strokeRect(px(-280), py(280), 560, 560);

  // scoreboard.py
  ctx.fillStyle = "#fff";
  ctx.font = "18px Courier";
  ctx.textAlign = "center";
  ctx.fillText(`Score: ${score} High Score: ${high_score}`, px(0), py(250));

  // food
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(px(food.x), py(food.y), 10, 0, Math.PI * 2);
  ctx.fill();

  // snake
  ctx.fillStyle = "#fff";
  for (const seg of snake.segments) {
    ctx.fillRect(px(seg.x) - 9, py(seg.y) - 9, 18, 18);
  }
}

// main.py's event listeners, with snake.py's no-reversing rules
document.addEventListener("keydown", (event) => {
  if (!is_game_on) return;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
  }
  if (event.key === "ArrowUp" && snake.heading !== DOWN) snake.heading = UP;
  if (event.key === "ArrowDown" && snake.heading !== UP) snake.heading = DOWN;
  if (event.key === "ArrowLeft" && snake.heading !== RIGHT) snake.heading = LEFT;
  if (event.key === "ArrowRight" && snake.heading !== LEFT) snake.heading = RIGHT;
});

// scoreboard.reset() + snake.reset() from the Python
async function reset_after_death() {
  save_high_score();
  score = 0;
  create_snake();
  drawFrame();
  await sleep(700);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// main.py's game loop - endless, like the Python
async function runProgram() {
  canvas.hidden = false;
  load_high_score();
  create_snake();
  refresh_food();
  score = 0;
  is_game_on = true;
  drawFrame();

  while (is_game_on) {
    await sleep(100);
    move();

    const head = snake.segments[0];

    // Detect collision with food
    if (distance(head, food) < 15) {
      refresh_food();
      extend();
      score += 1;
    }

    // Detect collision with wall
    if (head.x > 265 || head.x < -265 || head.y < -265 || head.y > 265) {
      await reset_after_death();
      continue;
    }

    // Detect collision with tail
    for (const segment of snake.segments.slice(1)) {
      if (distance(head, segment) < 10) {
        await reset_after_death();
        break;
      }
    }

    drawFrame();
  }
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
});
