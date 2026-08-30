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

// The same program as main.py:
async function runProgram() {
  print("Singapore restaurant bill splitter based on 9% GST and 10% service charge");
  const base_bill = parseFloat(await input("What was the base bill amount? $"));
  const pax = parseInt(await input("How many people are splitting the bill?"));

  // In Singapore, a 10% service charge is typically applied first.
  const service_charge_rate = 0.10;
  // The GST rate is 9%, applied to the subtotal (base bill + service charge).
  const gst_rate = 0.09;

  const subtotal = base_bill * (1 + service_charge_rate);
  const total_bill = subtotal * (1 + gst_rate);

  const total_per_pax = total_bill / pax;

  print(`Each person should pay: $${total_per_pax.toFixed(2)}`);
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
  print("");
  print("(refresh the page to run it again)", "dim");
});
