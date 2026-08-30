from turtle import Turtle, Screen

screen = Screen()
screen.tracer(0)

class Wall(Turtle):
    # Create a wall
    def __init__(self):
        super().__init__()
        self.color("white")
        self.penup()
        self.hideturtle()
        self.pendown()
        self.draw_square()
        self.screen.update()

    def draw_square(self):
        self.penup()
        self.goto(-280,-280)
        self.pendown()
        self.pensize(2)

        for _ in range(4):
            self.forward(560)
            self.left(90)