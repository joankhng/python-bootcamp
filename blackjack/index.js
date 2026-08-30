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

// Works like os.system('cls') in main.py
function clear_console() {
  output.innerHTML = "";
}

// Works like Python's str(list): [11, 10]
function show_hand(hand) {
  return `[${hand.join(", ")}]`;
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// The same program as main.py:
function create_deck(num_decks = 1) {
  const one_deck = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
  let shoe = [];
  for (let i = 0; i < 4 * num_decks; i++) {
    shoe = shoe.concat(one_deck);
  }
  return shuffle(shoe);
}

function deal_card(existing_hand, shoe) {
  existing_hand.push(shoe.pop());
  return existing_hand;
}

function deal_starting_hand(shoe) {
  return [shoe.pop(), shoe.pop()];
}

function calculate_score(hand) {
  const sum = hand.reduce((a, b) => a + b, 0);
  if (sum === 21 && hand.length === 2) {
    return 0; // natural Blackjack
  }
  while (hand.includes(11) && hand.reduce((a, b) => a + b, 0) > 21) {
    hand.splice(hand.indexOf(11), 1);
    hand.push(1);
  }
  return hand.reduce((a, b) => a + b, 0);
}

function compare_score(player_score, dealer_score) {
  if (dealer_score > 21 && player_score > 21) {
    return "Both bust. You lose!";
  }
  if (player_score > 21) {
    return "You went over 21. You lose 😭";
  }
  if (dealer_score > 21) {
    return "Dealer went over 21. You win!";
  }
  if (dealer_score === 0) {
    return "Dealer wins with a Blackjack 🖤. You lose 😭";
  } else if (player_score === 0) {
    return "You win with a Blackjack 🖤";
  } else if (player_score === dealer_score) {
    return "It's a draw!";
  } else if (player_score > dealer_score) {
    return "You win!";
  } else {
    return "You lose 😭";
  }
}

async function runProgram() {
  let shoe = create_deck(4);
  let is_playing = true;

  while (is_playing) {
    const player_choice = await input("Do you want to play a game of Blackjack? Type 'y' or 'n':");
    if (player_choice !== "y") {
      is_playing = false;
      print("End game");
    } else {
      clear_console();

      if (shoe.length < 20) {
        print("Deck is running low. Reshuffling the shoe...");
        shoe = create_deck(4);
      }

      const player_hand = deal_starting_hand(shoe);
      const dealer_hand = deal_starting_hand(shoe);

      let is_game_over = false;
      let player_score = 0;
      let dealer_score = 0;

      while (!is_game_over) {
        player_score = calculate_score(player_hand);
        dealer_score = calculate_score(dealer_hand);

        if (player_score === 0 || dealer_score === 0 || player_score > 21) {
          is_game_over = true;
        } else {
          print(`Your cards: ${show_hand(player_hand)}. Current score: ${player_score}`);
          print(`Computer's first card: ${dealer_hand[0]}`);

          const draw_another_card = await input("Type 'y' to hit, type 'n' to pass:");
          if (draw_another_card === "y") {
            deal_card(player_hand, shoe);
          } else {
            is_game_over = true;
          }
        }
      }

      // Dealer draws until 17, unless someone already has a Blackjack
      if (player_score <= 21 || dealer_score !== 0) {
        while (dealer_score !== 0 && dealer_score < 17) {
          deal_card(dealer_hand, shoe);
          dealer_score = calculate_score(dealer_hand);
        }
      }

      print(`Your final hand:${show_hand(player_hand)}. Final score: ${player_score}`);
      print(`Dealer's final hand:${show_hand(dealer_hand)}. Final score: ${dealer_score}`);
      print(compare_score(player_score, dealer_score));
    }
  }

  print("(refresh the page to run it again)", "dim");
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
});
