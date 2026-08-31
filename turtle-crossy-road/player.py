from turtle import Turtle

STARTING_POSITION = (0,-280)
MOVE_DISTANCE = 10
FINISH_LINE_Y = 280 # NEED TO THINK WHY THIS IS HERE

class Player(Turtle):
    def __init__(self):
        super().__init__()
        self.shape("turtle")
        self.setheading(90)
        self.penup()
        self.goto(STARTING_POSITION)
        self.ycor()

    def up(self):
        self.goto(self.xcor(), self.ycor()+MOVE_DISTANCE)

    def down(self):
        self.goto(self.xcor(), self.ycor()-MOVE_DISTANCE)

    def left(self):
        self.goto(self.xcor()-MOVE_DISTANCE, self.ycor())

    def right(self):
        self.goto(self.xcor()+MOVE_DISTANCE, self.ycor())

    def reset_position(self):
        self.goto(STARTING_POSITION)
        self.setheading(90)