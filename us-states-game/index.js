// This is main.py re-created in JavaScript, so the project can run in a web page.
// The real Python version lives next to this file: main.py
// The browser reads 50_states.csv with fetch() instead of pandas, and since a
// web page cannot write states_to_learn.csv, typing Exit prints the list instead.

const output = document.getElementById("terminal-output");
const runButton = document.getElementById("run-button");
const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");

// Turtle coords: (0,0) at canvas centre (300, 300), y axis pointing up
function px(x) { return 300 + x; }
function py(y) { return 300 - y; }

// Works like Python's print()
function print(text, className) {
  const line = document.createElement("p");
  line.textContent = text;
  if (className) {
    line.className = className;
  }
  output.appendChild(line);
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

// Works like Python's str.title()
function title(s) {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

// pandas.read_csv("50_states.csv"), browser style
async function read_states() {
  const text = await fetch("50_states.csv").then((r) => r.text());
  const rows = text.trim().split("\n").slice(1);
  return rows.map((row) => {
    const [state, x, y] = row.split(",");
    return { state: state.trim(), x: parseInt(x), y: parseInt(y) };
  });
}

function draw_map(img) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, (canvas.width - img.width) / 2, (canvas.height - img.height) / 2);
}

// The same game as main.py:
async function runProgram() {
  const data = await read_states();
  const all_states = data.map((row) => row.state);
  const guessed_states = [];

  const img = new Image();
  img.src = "blank_states_img.gif";
  await new Promise((resolve) => { img.onload = resolve; });

  canvas.hidden = false;
  draw_map(img);
  ctx.fillStyle = "#000";
  ctx.font = "10px Arial";
  ctx.textAlign = "center";

  while (true) {
    const answer_state = title(await input(`${guessed_states.length}/50 States Correct - What's another state's name?`));

    if (answer_state === "Exit") {
      const missing_states = all_states.filter((s) => !guessed_states.includes(s));
      print(`States to learn (${missing_states.length}):`);
      print(missing_states.join(", "), "dim");
      break;
    }

    if (all_states.includes(answer_state) && !guessed_states.includes(answer_state)) {
      const state_data = data.find((row) => row.state === answer_state);
      ctx.fillText(answer_state, px(state_data.x), py(state_data.y));
      guessed_states.push(answer_state);
    }
  }

  print("(refresh the page to play again)", "dim");
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
});
