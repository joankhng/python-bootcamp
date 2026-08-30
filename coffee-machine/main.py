machine_menu = {
    "espresso": {
        "ingredients":{
            "water": 50,
            "coffee": 18,
            "milk": 0
        },
        "cost": 1.00
    },
    "latte":{
        "ingredients":{
            "water": 200,
            "coffee": 24,
            "milk": 150
        },
        "cost": 2.50
    },
    "cappuccino": {
        "ingredients":{
            "water": 250,
            "coffee": 24,
            "milk": 100
        },
        "cost": 3.00
    }
}

# Starting resources (water and milk in ml, coffee in g)
machine_resources = {
    "water": 300,
    "milk": 200,
    "coffee": 100
}

coin_value = {
    "penny": 0.01,
    "dime": 0.1,
    "nickel": 0.05,
    "quarter": 0.25
}

# Print report
def print_report(current_profit):
    print(f"Water: {machine_resources['water']}ml")
    print(f"Milk: {machine_resources['milk']}ml")
    print(f"Coffee: {machine_resources['coffee']}g")
    print(f"Money: ${current_profit:.2f}")

# Check resources sufficient
def check_resources(drink_name):
    water_available = machine_resources["water"]
    water_required = machine_menu[drink_name]["ingredients"]["water"]
    if water_available < water_required:
        print("Sorry there is not enough water.")
        return False

    coffee_available = machine_resources["coffee"]
    coffee_required = machine_menu[drink_name]["ingredients"]["coffee"]
    if coffee_available < coffee_required:
        print("Sorry there is not enough coffee.")
        return False

    milk_available = machine_resources["milk"]
    milk_required = machine_menu[drink_name]["ingredients"]["milk"]
    if milk_available < milk_required:
        print("Sorry there is not enough milk.")
        return False

    return True

# Process coins
def machine_coins(drink_cost):
    money = 0.00
    print(f"Please insert coins. This drink costs ${drink_cost:.2f}")
    quarters = int(input("How many quarters?"))
    nickels = int(input("How many nickels?"))
    dimes = int(input("How many dimes?"))
    pennies = int(input("How many pennies?"))
    money += quarters * 0.25
    money += nickels * 0.05
    money += dimes * 0.1
    money += pennies * 0.01
    return round(money,2)

# Check transaction successful
def machine_calculator(money_entered, money_required):
    if money_entered == money_required:
        return True
    elif money_entered > money_required:
        change_amount = round(money_entered - money_required,2)
        print(f"Here is ${change_amount:.2f} in change.")
        return True
    else:
        print("Sorry that's not enough money. Money refunded.")
        return False

# Make coffee
def make_coffee(drink_name, order_ingredients):
    # Deducts required ingredients from machine's resources
    for i in order_ingredients:
        # checks machine_resources dictionary and machine_menu recipe dictionary
        machine_resources[i] -= order_ingredients[i]
    print(f"Here is your {drink_name}☕. Enjoy!")

is_on = True
profit = 0

while is_on:
    # Print report
    user_choice = input("What would you like? (espresso/latte/cappuccino):")
    if user_choice == "off":
        is_on = False
    elif user_choice == "report":
        print_report(profit)
    elif user_choice in machine_menu:
        drink = machine_menu[user_choice]
        if check_resources(user_choice):
            payment = machine_coins(drink["cost"])
            if machine_calculator(payment, drink["cost"]):
                profit += drink["cost"]
                make_coffee(user_choice,drink["ingredients"])
    else:
        print("Sorry that's not an option.")