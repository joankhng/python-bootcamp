// This is main.py re-created in JavaScript, so the project can run in a web page.
// The real Python version lives next to this file: main.py

const output = document.getElementById("terminal-output");
const runButton = document.getElementById("run-button");

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

// The same four lines as main.py:
async function runProgram() {
  print("Welcome to the Band Name Generator.");
  const name_1 = await input("What's the name of the city you grew up in?");
  const name_2 = await input("What's your pet's name?");
  print(`Your band name could be ${name_1} ${name_2}`);
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
  print("");
  print("(refresh the page to run it again)", "dim");
});
