from turtle import Turtle
self = Turtle()
# Moving hardcoded data—like starting coordinates out of your functions and placing them at
# the very top of your file separates your settings from your logic
STARTING_POSITIONS = [(0, 0), (-20, 0), (-40, 0)]  # python tuples (1,3,8)
MOVE_DISTANCE = 20
UP = 90
DOWN = 270
LEFT = 180
RIGHT = 0


class Snake:
    def __init__(self):
        self.segments = []
        self.create_snake()
        self.head = self.segments[0]
        self.move()

    # Create a snake body
    def create_snake(self):
        for position in STARTING_POSITIONS:
            self.add_segment(position)

    def add_segment(self,position):
        new_segment = Turtle("square")
        new_segment.color("white")
        new_segment.penup()
        new_segment.goto(position)
        self.segments.append(new_segment)

    # Add a new segment to the snake
    def extend(self):
        self.add_segment(self.segments[-1].position())

    def move(self):
        # Make segments follow the head using instance attribute
        for seg_num in range(len(self.segments)-1,0,-1): # range(start= 2, stop= 0, step= -1) moves the third seg (-40, 0) first
            # Get coordinates for 2nd to last segment for last seg to take its pos
            new_x = self.segments[seg_num-1].xcor()
            new_y = self.segments[seg_num-1].ycor()
            self.segments[seg_num].goto(new_x, new_y)
        # Move 1st segment to move forward by x paces
        self.head.forward(MOVE_DISTANCE)

    # Control the snake
    def up(self): # 90-degrees
        # If pointing down, restrict it from going up
        if not self.head.heading() == DOWN:
            self.head.setheading(UP)

    def down(self):  # 270-degrees
        # If pointing up, restrict it from going down
        if not self.head.heading() == UP:
            self.head.setheading(DOWN)

    def left(self): # 180-degrees
        if not self.head.heading() == RIGHT:
            self.head.setheading(LEFT)

    def right(self):  # 0-degrees
        if not self.head.heading() == LEFT:
            self.head.setheading(RIGHT)

    def tail(self):
        pass