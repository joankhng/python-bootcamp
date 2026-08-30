from turtle import Turtle
import random

# Detect collision with food
class Food(Turtle):

    def __init__(self):
        super().__init__()
        self.shape("circle")
        self.penup()
        self.shapesize(stretch_len=1,stretch_wid=1) # stretch by 0.5x0.5 -> 10 by 10
        self.color("blue")
        self.speed("fastest")
        self.refresh() # avoid reset because it is an att in turtle class

    def refresh(self):
        new_random_x = random.randint(-260, 260)
        new_random_y = random.randint(-260, 260)
        self.goto(new_random_x, new_random_y)

