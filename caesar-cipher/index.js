// This is main.py re-created in JavaScript, so the project can run in a web page.
// The real Python version lives next to this file: main.py

const output = document.getElementById("terminal-output");
const runButton = document.getElementById("run-button");

const alphabet = "abcdefghijklmnopqrstuvwxyz";

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

// The same program as main.py:
function caeser(start_text, shift_amount, direction) {
  let end_text = "";
  if (direction === 0) {
    shift_amount *= -1;
  }

  for (const letter of start_text) {
    if (!alphabet.includes(letter)) {
      end_text += letter;
    } else {
      const current_position = alphabet.indexOf(letter);
      // (x % 26 + 26) % 26 because JS % can return negatives, unlike Python's
      const new_position = ((current_position + shift_amount) % 26 + 26) % 26;
      end_text += alphabet[new_position];
    }
  }

  const action = direction === 1 ? "encrypt" : "decrypt";
  print(`The ${action}ed text is ${end_text}\n`);
}

async function runProgram() {
  print("This is Caesar Cipher (Shift Cypher)");

  let continue_game = true;

  while (continue_game) {
    const message = (await input("Enter your message:")).toLowerCase();
    const shift = parseInt(await input("Enter the shift number:"));
    const direction = parseInt(await input("Type '1' to encrypt, type '0' to decrypt:"));

    caeser(message, shift, direction);

    const repeat = parseInt(await input("Type '1' if you want to go again. Type '0' if you want to quit."));
    if (repeat !== 1) {
      continue_game = false;
    }
  }
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
  print("");
  print("(refresh the page to run it again)", "dim");
});
