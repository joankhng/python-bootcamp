from turtle import Screen, Turtle

screen = Screen()
screen.tracer(0)

class Paddle(Turtle):
    # Remember to add position to the initialiser
    def __init__(self,position):
        super().__init__()
        self.create_paddle(position)

    def create_paddle(self, position):
        self.shape("square")
        self.setheading(90)
        self.shapesize(stretch_wid=1,stretch_len=5) # width = 20 | height = 100. Standard turtles are 20x20 px and face East (right) by default
        self.color("white")
        self.penup()
        self.setpos(position) # x_pos, y_pos
        screen.update()

    def up(self):
        self.goto(self.xcor(),self.ycor() + 20)

    def down(self):
        self.goto(self.xcor(), self.ycor() - 20)