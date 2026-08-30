// This is main.py + quiz_brain.py re-created in JavaScript, so the project can run in a web page.
// The real Python version lives next to this file: main.py

const output = document.getElementById("terminal-output");
const runButton = document.getElementById("run-button");

// question_data.py, already html.unescape()d like main.py does
const question_bank = [
  { text: 'The Python programming language gets its name from the British comedy group "Monty Python."', answer: "True" },
  { text: "The first IBM PC was released in 1981.", answer: "True" },
  { text: "RAM stands for Random Access Memory.", answer: "True" },
  { text: 'The programming language "Python" is based off a modified version of "JavaScript".', answer: "False" },
  { text: "A Mac is not a PC", answer: "False" },
  { text: "The Windows 7 operating system has six main editions.", answer: "True" },
  { text: "The Windows ME operating system was released in the year 2000.", answer: "True" },
  { text: "Linus Torvalds created Linux and Git.", answer: "True" },
  { text: "Ada Lovelace is often considered the first computer programmer.", answer: "True" },
  { text: "Linux was first created as an alternative to Windows XP.", answer: "False" },
];

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

// The same program as main.py, with quiz_brain.py's QuizBrain class:
class QuizBrain {
  constructor(q_list) {
    this.question_number = 0;
    this.score = 0;
    this.question_list = q_list;
  }

  still_has_questions() {
    return this.question_number < this.question_list.length;
  }

  async next_question() {
    const current_question = this.question_list[this.question_number];
    this.question_number += 1;
    const user_answer = await input(`Q.${this.question_number}: ${current_question.text} (True/False): `);
    this.check_answer(user_answer, current_question.answer);
  }

  check_answer(user_answer, correct_answer) {
    if (user_answer.toLowerCase() === correct_answer.toLowerCase()) {
      this.score += 1;
      print(`You got it right! \n the correct answer was: ${correct_answer}. \n Your current score is ${this.score}/${this.question_number}`);
    } else {
      print(`You got it wrong! \n the correct answer was: ${correct_answer}. \n Your current score is ${this.score}/${this.question_number}`);
    }
  }
}

async function runProgram() {
  const quiz = new QuizBrain(question_bank);

  while (quiz.still_has_questions()) {
    await quiz.next_question();
  }

  print("You've completed the quiz.");
  print(`Your final score was ${quiz.score}/${quiz.question_number}`);
  print("");
  print("(refresh the page to run it again)", "dim");
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
});
