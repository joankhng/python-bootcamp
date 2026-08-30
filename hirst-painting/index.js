// This is main.py re-created in JavaScript, so the project can run in a web page.
// The real Python version lives next to this file: main.py

const runButton = document.getElementById("run-button");
const canvas = document.getElementById("painting");
const resultBox = document.getElementById("race-result");
const ctx = canvas.getContext("2d");

// The 30 colors main.py extracted from image.png with colorgram
const color_list = [[241, 203, 219], [183, 207, 225], [236, 228, 221], [240, 161, 190], [218, 136, 164], [73, 25, 31], [55, 36, 34], [216, 155, 126], [212, 84, 112], [122, 24, 38], [128, 69, 83], [96, 85, 72], [161, 184, 200], [10, 36, 22], [93, 163, 59], [121, 181, 112], [240, 170, 152], [220, 232, 222], [121, 158, 59], [69, 129, 52], [81, 54, 52], [178, 191, 211], [166, 199, 213], [90, 95, 103], [194, 205, 150], [40, 43, 49], [179, 106, 93], [162, 216, 147], [44, 90, 34], [68, 91, 22]];

function random_color() {
  const [r, g, b] = color_list[Math.floor(Math.random() * color_list.length)];
  return `rgb(${r}, ${g}, ${b})`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Same grid as main.py: dots of size 20, spaced 50 apart,
// 10 x 10 starting at turtle position (-200, -200).
// Canvas pixels: turtle (0,0) is the canvas centre (260, 260).
async function runProgram() {
  canvas.hidden = false;
  ctx.fillStyle = "#f5f2ec";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < 10; row++) {
    const y = -200 + row * 50;
    for (let col = 0; col < 10; col++) {
      const x = -200 + col * 50;
      ctx.fillStyle = random_color();
      ctx.beginPath();
      ctx.arc(x + 260, 260 - y, 10, 0, Math.PI * 2);
      ctx.fill();
      await sleep(15);
    }
  }

  const done = document.createElement("p");
  done.textContent = "(refresh the page to paint a new one)";
  done.className = "dim";
  resultBox.appendChild(done);
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
});
