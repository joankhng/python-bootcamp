// This is main.py re-created in JavaScript, so the project can run in a web page.
// The real Python version lives next to this file: main.py

const output = document.getElementById("terminal-output");
const runButton = document.getElementById("run-button");

// String.raw keeps the backslashes in Larry's whiskers intact
const larry = String.raw`                               /\
                               \ \
                                \ \
                                / /
                               / /
                              _\ \_/\/\
                             /  *  \@@ =
                            |       |Y/
                            |       |~
                             \ /_\ /
                              \\ //
                               |||
                              _|||_
                             ( / \ )-Larry`;

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
  print(larry);
  print("Welcome to Number 10 Downing Street. \nYour mission is to survive as Prime Minister.");

  const choice_1 = await input(
    "You are drafting your first major economic statement. Do you choose to 'fund' your tax cuts or 'borrow' to finance them? ");

  if (choice_1 !== "fund") {
    print(
      "You announce a mini-budget with sweeping unfunded tax cuts. \nThe bond markets panic, the pound crashes, and you are forced to resign. \nGame over.");
  } else {
    const choice_2 = await input(
      "The markets are stable, but you face pressure on income tax. Do you 'cut' the top rate of tax or 'maintain' it? ");

    if (choice_2 !== "maintain") {
      print(
        "Cutting the top rate of income tax during a cost-of-living crisis causes a severe backbench rebellion. \nYou are forced into a humiliating U-turn and lose political authority. \nGame over.");
    } else {
      const choice_3 = await input(
        "You receive a £5 million donation from a cryptocurrency billionaire. Do you 'declare' the gift or 'hide' it? ");

      if (choice_3 !== "declare") {
        print(
          "You face a parliamentary probe over the undeclared crypto funds and trigger a by-election. \nMajor parties boycott, leaving you to face off against intergalactic space warrior, Count Binface. \nYou endure the humiliation. \nGame over.");
      } else {
        const choice_4 = parseInt(await input(
          "You have survived the initial fiscal hurdles. Now, you must address public finances. Type '1' to introduce a heavy wealth tax, '2' to attend a restricted gathering, or '3' to apply a windfall tax on energy profits. "));

        if (choice_4 === 1) {
          print(
            "Your party fundamentally disagrees with a heavy wealth tax. \nYour MPs submit letters of no confidence, triggering a leadership contest. \nGame over.");
        } else if (choice_4 === 2) {
          print(
            "Photographs emerge of you attending a gathering during strict public health restrictions. \nFollowing a police investigation and mass cabinet resignations, you step down. \nGame over.");
        } else if (choice_4 === 3) {
          print(
            "The windfall tax stabilizes the economy. However, internal party divisions eventually force you out anyway. \nYou leave Downing Street. The Chief Mouser to the Cabinet Office remains. \nLarry the cat is the winner.");
        } else {
          print(
            "You hesitated and failed to pass a budget. The opposition calls a vote of no confidence. \nGame over.");
        }
      }
    }
  }
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
  print("");
  print("(refresh the page to run it again)", "dim");
});
