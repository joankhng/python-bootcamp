// This is main.py re-created in JavaScript, so the project can run in a web page.
// The real Python version lives next to this file: main.py
// Same intervals as the Python: 25 minute work sessions, 5 minute
// short breaks, a 20 minute long break every 4th work session.

const PINK = "#e2979c";
const RED = "#e7305b";
const GREEN = "#9bdeac";

const WORK_MIN = 25;
const SHORT_BREAK_MIN = 5;
const LONG_BREAK_MIN = 20;

let reps = 0;
let timer = null;

const titleLabel = document.getElementById("title");
const timeText = document.getElementById("time");
const checkMarks = document.getElementById("checks");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");

// ---------------------------- TIMER RESET ---------------------------- //
function resetTimer() {
  clearTimeout(timer);
  timeText.textContent = "00:00";
  titleLabel.textContent = "Timer";
  titleLabel.style.color = GREEN;
  checkMarks.textContent = "";
  reps = 0;
}

// -------------------------- TIMER MECHANISM -------------------------- //
function startTimer() {
  reps += 1;

  const work_sec = WORK_MIN * 60;
  const short_break_sec = SHORT_BREAK_MIN * 60;
  const long_break_sec = LONG_BREAK_MIN * 60;

  if (reps % 8 === 0) {
    countDown(long_break_sec);
    titleLabel.textContent = "Break (20 MIN)";
    titleLabel.style.color = RED;
  } else if (reps % 2 === 0) {
    countDown(short_break_sec);
    titleLabel.textContent = "Break (5 MIN)";
    titleLabel.style.color = PINK;
  } else {
    countDown(work_sec);
    titleLabel.textContent = "Work";
    titleLabel.style.color = GREEN;
    // one ✔ per completed work session
    checkMarks.textContent = "✔".repeat(Math.floor(reps / 2));
  }
}

// ------------------------ COUNTDOWN MECHANISM ------------------------ //
function countDown(count) {
  const count_min = Math.floor(count / 60);
  let count_sec = count % 60;
  if (count_sec < 10) {
    count_sec = `0${count_sec}`;
  }
  timeText.textContent = `${count_min}:${count_sec}`;

  if (count > 0) {
    timer = setTimeout(countDown, 1000, count - 1);
  } else {
    startTimer();
  }
}

startButton.addEventListener("click", () => {
  // avoid stacking timers if Start is clicked twice
  clearTimeout(timer);
  startTimer();
});

resetButton.addEventListener("click", resetTimer);
