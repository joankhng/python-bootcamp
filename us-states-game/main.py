import turtle
import pandas

screen = turtle.Screen()
screen.setup(width=600, height=600)
screen.title("U.S. States Game")
image = "blank_states_img.gif"
screen.addshape(image)
turtle.shape(image)

data = pandas.read_csv("50_states.csv")
all_states = data["state"].to_list()
guessed_states = []

class Scoreboard():
    def __init__(self):
        self.score = 0

    def add_score(self):
        self.score += 1

scoreboard = Scoreboard()

game_is_on = True
while game_is_on:
    all_states = data["state"].to_list()
    # Convert the guess to Title case
    answer_state = screen.textinput(title=f"{len(guessed_states)}/50 States Correct", prompt= "What's another state's name?").title()
    # Break code
    if answer_state == "Exit":
        missing_states = []
        for state in all_states:
            if state not in guessed_states:
                missing_states.append(state)
        new_data = pandas.DataFrame(missing_states)
        new_data.to_csv("states_to_learn.csv")
        break
    # Check if guess is among the 50 states
    if answer_state in all_states:
        # Create a turtle to write the name of the state at the state's x and y coordinate
        t = turtle.Turtle()
        t.hideturtle()
        t.penup()
        state_data = data[data.state == answer_state]
        t.goto(state_data.x.item(), state_data.y.item())
        t.write(answer_state)
        # Record correct guesses in a list
        guessed_states.append(answer_state)

        # Keep track of the score
        scoreboard.add_score()
        print(guessed_states)

