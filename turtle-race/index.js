// This is main.py re-created in JavaScript, so the project can run in a web page.
// The real Python version lives next to this file: main.py
// The race logic mirrors main.py exactly: each turtle moves a random 0-10 steps
// per round, and the first one past x > 230 wins.

const output = document.getElementById("terminal-output");
const runButton = document.getElementById("run-button");
const canvas = document.getElementById("race-track");
const resultBox = document.getElementById("race-result");
const ctx = canvas.getContext("2d");

const colors = ["red", "yellow", "orange", "blue", "green", "purple"];
let all_turtles = [];

// Works like Python's print()
function print(text, className) {
  const line = document.createElement("p");
  line.textContent = text;
  if (className) {
    line.className = className;
  }
  output.appendChild(line);
}

function printResult(text) {
  const line = document.createElement("p");
  line.textContent = text;
  resultBox.appendChild(line);
}

// Works like Python's input(): shows the question, then waits
// until the visitor types an answer and presses Enter.
function input(question) {
  print(question);
  return new Promise((resolve) => {
    const field = document.createElement("input");
    field.className = "console-input";
    field.setAttribute("aria-label", question);
    output.appendChild(field);
    field.focus();
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        field.disabled = true;
        resolve(field.value);
      }
    });
  });
}

// Works like Python's random.randint(0, 10) - inclusive on both ends
function randint(low, high) {
  return low + Math.floor(Math.random() * (high - low + 1));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Same starting grid as main.py: x = -230, y = -100 + i * 40.
// Canvas pixels: turtle (0,0) is the canvas centre (250, 200).
function turtle_racers() {
  all_turtles = [];
  for (let i = 0; i < colors.length; i++) {
    all_turtles.push({ color: colors[i], x: -230, y: -100 + i * 40 });
  }
}

function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // finish line at x = 230
  ctx.strokeStyle = "#3fcf51";
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(230 + 250, 0);
  ctx.lineTo(230 + 250, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);

  // each turtle: a triangle pointing right, like turtle's arrow
  for (const t of all_turtles) {
    const px = t.x + 250;
    const py = 200 - t.y;
    ctx.fillStyle = t.color;
    ctx.beginPath();
    ctx.moveTo(px + 12, py);
    ctx.lineTo(px - 8, py - 8);
    ctx.lineTo(px - 8, py + 8);
    ctx.closePath();
    ctx.fill();
  }
}

// The same program as main.py:
async function runProgram() {
  print("Make your bet");
  print("(the racers are: red, yellow, orange, blue, green, purple)", "dim");
  const user_bet = await input("Which turtle will win the race? Enter a color: ");

  canvas.hidden = false;
  turtle_racers();
  drawFrame();

  let is_race_on = false;
  if (user_bet) {
    is_race_on = true;
  }

  while (is_race_on) {
    for (const turtle of all_turtles) {
      if (turtle.x > 230) {
        is_race_on = false;
        const winning_color = turtle.color;

        if (winning_color === user_bet) {
          printResult(`You win! The ${winning_color} turtle finished first.`);
        } else {
          printResult(`You lose. The ${winning_color} turtle finished first.`);
        }
        break;
      }

      // Turtle move if break not triggered
      turtle.x += randint(0, 10);
    }
    drawFrame();
    await sleep(40);
  }

  printResult("(refresh the page to race again)");
  resultBox.querySelector("p:last-child").className = "dim";
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
});
