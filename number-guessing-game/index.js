// This is main.py re-created in JavaScript, so the project can run in a web page.
// The real Python version lives next to this file: main.py
// (The demo plays the intended game; main.py still has a couple of bugs to fix.)

const output = document.getElementById("terminal-output");
const runButton = document.getElementById("run-button");

// art.py
const logo = String.raw`
  / _ \_   _  ___  ___ ___  /__   \ |__   ___    /\ \ \_   _ _ __ ___ | |__   ___ _ __
 / /_\/ | | |/ _ \/ __/ __|   / /\/ '_ \ / _ \  /  \/ / | | | '_ ' _ \| '_ \ / _ \ '__|
/ /_\\| |_| |  __/\__ \__ \  / /  | | | |  __/ / /\  /| |_| | | | | | | |_) |  __/ |
\____/ \__,_|\___||___/___/  \/   |_| |_|\___| \_\ \/  \__,_|_| |_| |_|_.__/ \___|_|
`;

const EASY_LEVEL_TURNS = 10;
const HARD_LEVEL_TURNS = 5;

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

// Works like Python's random.randint(1, 100) - inclusive on both ends
function randint(low, high) {
  return low + Math.floor(Math.random() * (high - low + 1));
}

// The same game as main.py:
async function runProgram() {
  print(logo);
  print("Welcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 100.");

  const answer = randint(1, 100);

  const level = await input("Choose a difficulty. Type 'easy' or 'hard':");
  let turns = level === "easy" ? EASY_LEVEL_TURNS : HARD_LEVEL_TURNS;

  let guess = 0;
  while (guess !== answer) {
    print(`You have ${turns} attempts remaining to guess the number.`);
    guess = parseInt(await input("Make a guess:"));

    if (guess < answer) {
      print("Too low.\nGuess again.");
      turns -= 1;
    } else if (guess > answer) {
      print("Too high.\nGuess again.");
      turns -= 1;
    } else {
      print(`You got it! The answer was ${answer}`);
      break;
    }

    if (turns === 0) {
      print("You've run out of guesses, you lose.");
      break;
    }
  }

  print("");
  print("(refresh the page to run it again)", "dim");
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
});
