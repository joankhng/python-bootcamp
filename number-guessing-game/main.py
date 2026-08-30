import art
# Global Scope
EASY_LEVEL_TURNS = 10
HARD_LEVEL_TURNS = 5

turns = 0

# Choosing a random number between 1 and 100.
from random import randint
answer = randint(1,100)

# Let the user guess a number

# Function to check users' guess against actual answer
def check_answer(user_guess, actual_answer, turns):
    """Checks user guesses against actual answer, returns number of remaining turns."""
    if user_guess < actual_answer:
        print(f"Too low.\nGuess again.")
        return turns - 1
    elif user_guess > actual_answer:
        print(f"Too high.\nGuess again.")
        return turns - 1
    else:
        print(f"You got it! The answer was {answer}")

# Function to set difficulty
def set_difficulty():
    level = input("Choose a difficulty. Type 'easy' or 'hard':")
    if level == "easy":
        return EASY_LEVEL_TURNS
    else:
        return HARD_LEVEL_TURNS

def game():
    print(art.logo)
    print("Welcome to the Number Guessing Game!\n"
          "I'm thinking of a number between 1 and 100.")
    turns = set_difficulty()

    # Repeat the guessing functionality if they get it wrong.
    guess = 0
    while guess != answer:
        print(f"You have {turns} attempts remaining to guess the number.")
        guess = int(input("Make a guess:"))

        turns = check_answer(guess, answer, turns)
        if turns == 0:
            print("You've run out of guesses, you lose.")
            return # exits the function i.e., end game
        elif guess != answer:
            print("Guess again.")

game()