# Functions as Inputs

# def function_a(something):
#     Do this with something
#     Then do this
#     Finally do this

# def function_b(): # b is the higher order function
#      Do this

from turtle import Turtle, Screen
import random

screen = Screen()
screen.setup(width=500,height=400)

user_bet = screen.textinput(title="Make your bet", prompt="Which turtle will win the race? Enter a color: ")

colors = ["red","yellow","orange","blue","green","purple"]
all_turtles = []

def turtle_racers():
    for i in range(len(colors)):
        new_turtle = Turtle(shape="turtle")
        new_turtle.color(colors[i])
        new_turtle.penup()
        new_turtle.goto(x=-230, y=-100 + i * 40)  # Recall width=500,height=400, 0,0 is at 250,200 pt
        all_turtles.append(new_turtle)

turtle_racers()

is_race_on = False

if user_bet:
    is_race_on = True

while is_race_on:
    for turtle in all_turtles:
        if turtle.xcor() > 230: # since turtle width = 20
            is_race_on = False
            winning_color = turtle.pencolor()

            if winning_color == user_bet:
                print(f"You win! The {winning_color} turtle finished first.")
            else:
                print(f"You lose. The {winning_color} turtle finished first.")
            break

        # Turtle move if break cmd not triggered
        random_distance = random.randint(0, 10)  # inclusive from 0 to 10
        turtle.forward(random_distance)

screen.exitonclick()