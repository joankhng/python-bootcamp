// This is the turtle crossy road project (main.py, player.py, car_manager.py,
// food.py, scoreboard.py) re-created in JavaScript, so the game can run in a web page.
// Same rules: arrow keys move 10px, cars spawn on the right with a 1-in-6 chance
// per tick, reaching the top levels up, cars cost a life, green food adds one.

const runButton = document.getElementById("run-button");
const canvas = document.getElementById("game");
const resultBox = document.getElementById("race-result");
const ctx = canvas.getContext("2d");

// Turtle coords: (0,0) at canvas centre (300, 300), y axis pointing up
function px(x) { return 300 + x; }
function py(y) { return 300 - y; }

function randint(low, high) {
  return low + Math.floor(Math.random() * (high - low + 1));
}

// car_manager.py
const COLORS = ["#FF7951", "#62C9ED", "#A9ED71", "#FE7199", "#FFC170", "#7FA9E6", "#CE7CFF"];
const STARTING_MOVE_DISTANCE = randint(5, 19);
const ROAD_LANES = [-260, -240, -200, -160, -120, -80, -40, 0, 40, 80, 120, 160, 200, 240, 260];
const all_cars = [];

function create_car() {
  const random_chance = randint(1, 6);
  const random_y = ROAD_LANES[Math.floor(Math.random() * ROAD_LANES.length)];

  let lane_is_clear = true;
  for (const existing_car of all_cars) {
    if (existing_car.x === random_y && existing_car.x > 220) {
      lane_is_clear = false;
    }
  }

  if (random_chance === 1 && lane_is_clear) {
    all_cars.push({
      x: randint(280, 310),
      y: random_y,
      length: [2, 3, 4][Math.floor(Math.random() * 3)] * 20,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
  }
}

function move_cars() {
  for (const car of all_cars) {
    car.x -= STARTING_MOVE_DISTANCE;
  }
  for (let i = all_cars.length - 1; i >= 0; i--) {
    if (all_cars[i].x < -320) {
      all_cars.splice(i, 1);
    }
  }
}

// player.py
const STARTING_POSITION = { x: 0, y: -280 };
const MOVE_DISTANCE = 10;
const player = { ...STARTING_POSITION };

function reset_position() {
  player.x = STARTING_POSITION.x;
  player.y = STARTING_POSITION.y;
}

// food.py
const food = { x: 0, y: 0 };

function refresh_food() {
  food.x = randint(-280, 280);
  food.y = randint(-280, 280);
}

// scoreboard.py
let level = 0;
let lives = 1;

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

let is_game_on = false;

// main.py's key bindings
document.addEventListener("keydown", (event) => {
  if (!is_game_on) return;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
  }
  if (event.key === "ArrowUp") player.y += MOVE_DISTANCE;
  if (event.key === "ArrowDown") player.y -= MOVE_DISTANCE;
  if (event.key === "ArrowLeft") player.x -= MOVE_DISTANCE;
  if (event.key === "ArrowRight") player.x += MOVE_DISTANCE;
});

function drawFrame(game_over = false) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // scoreboard
  ctx.fillStyle = "#000";
  ctx.font = "20px Courier";
  ctx.textAlign = "left";
  ctx.fillText(`Level: ${level} Lives: ${lives}`, px(-270), py(250));

  // food
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(px(food.x), py(food.y), 10, 0, Math.PI * 2);
  ctx.fill();

  // cars
  for (const car of all_cars) {
    ctx.fillStyle = car.color;
    ctx.fillRect(px(car.x) - car.length / 2, py(car.y) - 10, car.length, 20);
  }

  // player: a turtle-ish triangle pointing up
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(px(player.x), py(player.y) - 12);
  ctx.lineTo(px(player.x) - 8, py(player.y) + 8);
  ctx.lineTo(px(player.x) + 8, py(player.y) + 8);
  ctx.closePath();
  ctx.fill();

  if (game_over) {
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", px(0), py(0));
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// main.py's game loop
async function runProgram() {
  canvas.hidden = false;
  refresh_food();
  is_game_on = true;
  drawFrame();

  while (is_game_on) {
    await sleep(100);

    create_car();
    move_cars();

    // Detect collision with any car
    for (const car of all_cars) {
      if (distance(player, car) < 20) {
        create_car();
        lives -= 1;
        reset_position();
      }
    }

    // Detect collision with any food
    if (distance(player, food) < 25) {
      refresh_food();
      lives += 1;
    }

    // Detect if the player reaches the top of the screen
    if (player.y > 280) {
      reset_position();
      level += 1;
    }

    // Detect if the player loses all lives
    if (lives <= 0) {
      is_game_on = false;
    }

    drawFrame(!is_game_on);
  }

  const done = document.createElement("p");
  done.textContent = `Final level: ${level} (refresh the page to play again)`;
  done.className = "dim";
  resultBox.appendChild(done);
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
});
