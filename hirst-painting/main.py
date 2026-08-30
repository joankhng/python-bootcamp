import os
# Map directly to the base Python 3.14 tcl/tk directories
os.environ['TCL_LIBRARY'] = r"C:\Users\joank\AppData\Local\Programs\Python\Python314\tcl\tcl8.6"
os.environ['TK_LIBRARY'] = r"C:\Users\joank\AppData\Local\Programs\Python\Python314\tcl\tk8.6"
import random
import turtle as t
t.colormode(255)
turtle = t.Turtle()
screen = t.Screen()
turtle.penup()
turtle.hideturtle()
turtle.setpos(-200, -200)
turtle.setheading(0)


color_list = [(241, 203, 219), (183, 207, 225), (236, 228, 221), (240, 161, 190), (218, 136, 164), (73, 25, 31), (55, 36, 34), (216, 155, 126), (212, 84, 112), (122, 24, 38), (128, 69, 83), (96, 85, 72), (161, 184, 200), (10, 36, 22), (93, 163, 59), (121, 181, 112), (240, 170, 152), (220, 232, 222), (121, 158, 59), (69, 129, 52), (81, 54, 52), (178, 191, 211), (166, 199, 213), (90, 95, 103), (194, 205, 150), (40, 43, 49), (179, 106, 93), (162, 216, 147), (44, 90, 34), (68, 91, 22)]

# 10 by 10 rows of dots
def draw_dots():
    for _ in range(1,10):
        turtle.dot(20, random.choice(color_list))  # turtle.dot(size, color)
        turtle.forward(50)
    turtle.dot(20, random.choice(color_list)) # 10th dot before turning

def next_row_anticlockwise():
    n = 1 # 1 turn only
    for _ in range(n):
        turtle.lt(90)
        turtle.forward(50)
        turtle.lt(90)

def next_row_clockwise():
    n = 1 # 1 turn only
    for _ in range(n):
        turtle.rt(90)
        turtle.forward(50)
        turtle.rt(90)

for _ in range(1,6):
    draw_dots()
    next_row_anticlockwise()
    draw_dots()
    next_row_clockwise()

screen.exitonclick()