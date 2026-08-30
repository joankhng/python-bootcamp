// This is main.py re-created in JavaScript, so the project can run in a web page.
// The real Python version lives next to this file: main.py
// Same phases in the same order: filled square, dashed line, nested shapes
// with 3 to 10 sides, a 200-step random walk, then a spirograph.

const runButton = document.getElementById("run-button");
const canvas = document.getElementById("drawing");
const resultBox = document.getElementById("race-result");
const ctx = canvas.getContext("2d");

// Turtle state: (0,0) at canvas pixel (200, 350), y axis pointing up
const ORIGIN_X = 200;
const ORIGIN_Y = 350;
const turtle = { x: 0, y: 0, heading: 0, pensize: 1, color: "#000" };

function px() { return ORIGIN_X + turtle.x; }
function py() { return ORIGIN_Y - turtle.y; }

function random_color() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Works like turtle.forward(): draws when pen_down is true
function fd(distance, pen_down = true) {
  const rad = (turtle.heading * Math.PI) / 180;
  const startX = px();
  const startY = py();
  turtle.x += distance * Math.cos(rad);
  turtle.y += distance * Math.sin(rad);
  if (pen_down) {
    ctx.strokeStyle = turtle.color;
    ctx.lineWidth = turtle.pensize;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(px(), py());
    ctx.stroke();
  }
}

function lt(angle) { turtle.heading += angle; }
function rt(angle) { turtle.heading -= angle; }

async function runProgram() {
  canvas.hidden = false;
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw a square (filled, like begin_fill/end_fill)
  ctx.fillStyle = random_color();
  ctx.fillRect(px(), py() - 100, 100, 100);
  await sleep(400);

  // Draw a dashed line - pen control
  turtle.color = random_color();
  turtle.pensize = 3;
  for (let i = 0; i < 15; i++) {
    fd(10, true);
    fd(10, false);
    await sleep(20);
  }

  // Drawing different shapes: triangle up to decagon
  turtle.pensize = 1;
  for (let n = 3; n <= 10; n++) {
    turtle.color = random_color();
    const angle = 360 / n;
    for (let i = 0; i < n; i++) {
      fd(100);
      rt(angle);
      await sleep(15);
    }
  }

  // Generate a random walk
  const directions = [0, 90, 180, 270];
  turtle.pensize = 5;
  for (let i = 0; i < 200; i++) {
    turtle.color = random_color();
    fd(30);
    turtle.heading = directions[Math.floor(Math.random() * directions.length)];
    await sleep(8);
  }

  // Spirograph
  const gap_size = 20;
  const radius = 25;
  turtle.pensize = 1;
  for (let i = 0; i < 360 / gap_size; i++) {
    ctx.strokeStyle = random_color();
    ctx.lineWidth = 1;
    const rad = ((turtle.heading + 90) * Math.PI) / 180;
    const cx = px() + radius * Math.cos(rad) * -1;
    const cy = py() - radius * Math.sin(rad) * -1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
    turtle.heading += gap_size;
    await sleep(40);
  }

  const done = document.createElement("p");
  done.textContent = "(refresh the page to draw it again)";
  done.className = "dim";
  resultBox.appendChild(done);
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
});
