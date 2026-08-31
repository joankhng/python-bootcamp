from turtle import Turtle
import random

# Detect collision with food
class Food:
    def __init__(self):
        self.all_foods = []
        self.food_count = 1

    def placement(self):
        for i in range(self.food_count):
            new_food = Turtle()
            new_food.shape("circle")
            new_food.penup()
            new_food.color("green")
            new_food.speed("fastest")

            # pass new_food into refresh method
            self.refresh(new_food) # avoid reset because it is an att in turtle class

            self.all_foods.append(new_food)

    def refresh(self,turtle_food):
        new_random_x = random.randint(-280, 280)
        new_random_y = random.randint(-280, 280)

        # passes goto command to turtle_food instead of self
        turtle_food.goto(new_random_x, new_random_y)

