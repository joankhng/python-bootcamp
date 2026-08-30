// This is main.py re-created in JavaScript, so the project can run in a web page.
// The real Python version lives next to this file: main.py

const output = document.getElementById("terminal-output");
const runButton = document.getElementById("run-button");

const machine_menu = {
  espresso: { ingredients: { water: 50, coffee: 18, milk: 0 }, cost: 1.0 },
  latte: { ingredients: { water: 200, coffee: 24, milk: 150 }, cost: 2.5 },
  cappuccino: { ingredients: { water: 250, coffee: 24, milk: 100 }, cost: 3.0 },
};

const machine_resources = { water: 300, milk: 200, coffee: 100 };

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
function print_report(current_profit) {
  print(`Water: ${machine_resources.water}ml`);
  print(`Milk: ${machine_resources.milk}ml`);
  print(`Coffee: ${machine_resources.coffee}g`);
  print(`Money: $${current_profit.toFixed(2)}`);
}

function check_resources(drink_name) {
  if (machine_resources.water < machine_menu[drink_name].ingredients.water) {
    print("Sorry there is not enough water.");
    return false;
  }
  if (machine_resources.coffee < machine_menu[drink_name].ingredients.coffee) {
    print("Sorry there is not enough coffee.");
    return false;
  }
  if (machine_resources.milk < machine_menu[drink_name].ingredients.milk) {
    print("Sorry there is not enough milk.");
    return false;
  }
  return true;
}

async function machine_coins(drink_cost) {
  let money = 0;
  print(`Please insert coins. This drink costs $${drink_cost.toFixed(2)}`);
  const quarters = parseInt(await input("How many quarters?"));
  const nickels = parseInt(await input("How many nickels?"));
  const dimes = parseInt(await input("How many dimes?"));
  const pennies = parseInt(await input("How many pennies?"));
  money += quarters * 0.25;
  money += nickels * 0.05;
  money += dimes * 0.1;
  money += pennies * 0.01;
  return Math.round(money * 100) / 100;
}

function machine_calculator(money_entered, money_required) {
  if (money_entered === money_required) {
    return true;
  } else if (money_entered > money_required) {
    const change_amount = Math.round((money_entered - money_required) * 100) / 100;
    print(`Here is $${change_amount.toFixed(2)} in change.`);
    return true;
  } else {
    print("Sorry that's not enough money. Money refunded.");
    return false;
  }
}

function make_coffee(drink_name, order_ingredients) {
  for (const i in order_ingredients) {
    machine_resources[i] -= order_ingredients[i];
  }
  print(`Here is your ${drink_name}☕. Enjoy!`);
}

async function runProgram() {
  let is_on = true;
  let profit = 0;

  while (is_on) {
    const user_choice = await input("What would you like? (espresso/latte/cappuccino):");
    if (user_choice === "off") {
      is_on = false;
    } else if (user_choice === "report") {
      print_report(profit);
    } else if (user_choice in machine_menu) {
      const drink = machine_menu[user_choice];
      if (check_resources(user_choice)) {
        const payment = await machine_coins(drink.cost);
        if (machine_calculator(payment, drink.cost)) {
          profit += drink.cost;
          make_coffee(user_choice, drink.ingredients);
        }
      }
    } else {
      print("Sorry that's not an option.");
    }
  }

  print("(machine off - refresh the page to restart it)", "dim");
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  await runProgram();
});
