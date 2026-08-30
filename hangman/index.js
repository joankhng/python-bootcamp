// This is main.py re-created in JavaScript, so the project can run in a web page.
// The real Python version lives next to this file: main.py
// (One difference: main.py prints the secret word for debugging - the demo keeps it secret.)

const output = document.getElementById("terminal-output");
const runButton = document.getElementById("run-button");

// hangman_words.py
const word_list = "abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar boxful buckaroo buffalo buffoon buxom buzzard buzzing buzzwords caliph cobweb cockiness croquet crypt curacao cycle daiquiri dirndl disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled fuchsia funny gabby galaxy galvanize gazebo giaour gizmo glowworm glyph gnarly gnostic gossip grogginess haiku haphazard hyphen iatrogenic icebox injury ivory ivy jackpot jaundice jawbreaker jaywalk jazziest jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole khaki kilobyte kiosk kitsch kiwifruit klutz knapsack larynx lengths lucky luxury lymph marquis matrix megahertz microwave mnemonic mystify naphtha nightclub nowadays numbskull nymph onyx ovary oxidize oxygen pajama peekaboo phlegm pixel pizazz pneumonia polka pshaw psyche puppy puzzling quartz queue quips quixotic quiz quizzes quorum razzmatazz rhubarb rhythm rickshaw schnapps scratch shiv snazzy sphinx spritz squawk staff strength strengths stretch stronghold stymied subway swivel syndrome thriftless thumbscrew topaz transcript transgress transplant triphthong twelfth twelfths unknown unworthy unzip uptown vaporize vixen vodka voodoo vortex voyeurism walkway waltz wave wavy waxy wellspring wheezy whiskey whizzing whomever wimpy witchcraft wizard woozy wristwatch wyvern xylophone yachtsman yippee yoked youthful yummy zephyr zigzag zigzagging zilch zipper zodiac zombie".split(" ");

// hangman_art.py
const stages = [String.raw`
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========
`, String.raw`
  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========
`, String.raw`
  +---+
  |   |
  O   |
 /|\  |
      |
      |
=========
`, String.raw`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`, String.raw`
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
`, String.raw`
  +---+
  |   |
  O   |
      |
      |
      |
=========
`, String.raw`
  +---+
  |   |
      |
      |
      |
      |
=========
`];

const logo = String.raw`
 _
| |
| |__   __ _ _ __   __ _ _ __ ___   __ _ _ __
| '_ \ / _' | '_ \ / _' | '_ ' _ \ / _' | '_ \
| | | | (_| | | | | (_| | | | | | | (_| | | | |
|_| |_|\__,_|_| |_|\__, |_| |_| |_|\__,_|_| |_|
                    __/ |
                   |___/    `;

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
  let lives = 6;
  print(logo);

  const chosen_word = word_list[Math.floor(Math.random() * word_list.length)];

  let placeholder = "";
  for (let i = 0; i < chosen_word.length; i++) {
    placeholder += "_";
  }
  print("Word to guess: " + placeholder);

  let game_over = false;
  const correct_letters = [];

  while (!game_over) {
    print(`****************************<${lives}>/6 LIVES LEFT****************************`);
    const guess = (await input("Guess a letter: ")).toLowerCase();

    if (correct_letters.includes(guess)) {
      print(`You've already guessed ${guess}.`);
    }

    let display = "";
    for (const letter of chosen_word) {
      if (letter === guess) {
        display += letter;
        correct_letters.push(guess);
      } else if (correct_letters.includes(letter)) {
        display += letter;
      } else {
        display += "_";
      }
    }

    print("Word to guess: " + display);

    if (!chosen_word.includes(guess)) {
      lives -= 1;
      print(`You guessed ${guess}, that's not in the word. You lose a life.`);

      if (lives === 0) {
        game_over = true;
        print(`The correct word was ${chosen_word}.`);
        print("***********************YOU LOSE**********************");
      }
    }

    if (!display.includes("_")) {
      game_over = true;
      print("****************************YOU WIN****************************");
    }

    print(stages[lives]);
  }

  print("(refresh the page to run it again)", "dim");
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
});
