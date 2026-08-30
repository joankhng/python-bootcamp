# Create a ball and make it move constantly

from turtle import Screen, Turtle
import random

screen = Screen()
screen.tracer(0)

class Ball(Turtle):
    # Creates the ball
    def __init__(self):
        super().__init__()
        self.shape("circle")
        self.color("white")
        self.penup()

        # Define amount that ball is going to move
        self.x_move = 10
        self.y_move = 10
        self.move_speed = 0.1

    def move(self):
        # Add ball movement to x,y coord to move ball
        new_x = self.xcor() + self.x_move
        new_y = self.ycor() + self.y_move
        self.goto(new_x, new_y)

    def bounce_y(self):
        # reverse the direction on a bounce against top and bottom walls
        self.y_move *= -1
        self.move_speed *= 0.9

    def bounce_x(self):
        # reverse the direction on a bounce against left and right walls
        self.x_move *= -1
        self.move_speed *= 0.9

    def reset_position(self):
        self.home() # equiv to goto(0,0)
        self.move_speed = 0.1
        self.bounce_x()