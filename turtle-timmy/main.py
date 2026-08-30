# Turtle graphics, Tuples, Importing Modules
# print(another_module.another_variable)
# import turtle as t (import Module name as alias name)

import os
# Map directly to the base Python 3.14 tcl/tk directories
os.environ['TCL_LIBRARY'] = r"C:\Users\joank\AppData\Local\Programs\Python\Python314\tcl\tcl8.6"
os.environ['TK_LIBRARY'] = r"C:\Users\joank\AppData\Local\Programs\Python\Python314\tcl\tk8.6"

import turtle as t
import random

t.colormode(255)
turtle = t.Turtle() # new Class
turtle.shape("turtle")

def random_color():
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    return r,g,b

turtle.color(random_color(), random_color()) # (pen, fill colour)

screen = t.Screen()

# Draw a square
turtle.begin_fill()
for x in range(4):
    turtle.fd(100)
    turtle.lt(90)
turtle.end_fill()

# Draw a dashed line - Pen control
turtle.pencolor(random_color())
turtle.pensize(3)
for x in range(15):
    turtle.fd(10)
    turtle.penup()
    turtle.fd(10)
    turtle.pendown()

# Drawing different shapes: triangle, square, pentagon, hexagon, heptagon, octagon, nonagon, decagon

# triangle (n-2)*180-degrees; use exterior angle (360/n)
# for n in range(3,11):
#     angle = 360/n
#     for _ in range(n):
#         turtle.fd(100)
#         turtle.rt(angle) # always turn right to nest shapes downwards

def draw_shape(num_sides):
    angle = 360/num_sides
    for _ in range(num_sides):
        turtle.fd(100)
        turtle.rt(angle)

for shape_side_n in range(3,11):
    turtle.color(random_color(), random_color())
    draw_shape(shape_side_n)

# Generate a random walk (Sigma_{i=1} = X)

# Define X_i variables:
directions = [0, 90, 180, 270] # angles are diff directions East, North, West South

steps = 200

for _ in range(steps):
    turtle.color(random_color(), random_color())
    turtle.pensize(5)
    turtle.speed(3)
    turtle.fd(30)
    turtle.setheading(random.choice(directions))

# Spirograph
# Disable drawing animation
screen.tracer(0)
turtle.speed("fastest")

def draw_spirograph(gap_size,radius):
    interactions = int(360/gap_size) # E.g., 360 / 20 results in 18
    for i in range(interactions):
        turtle.color(random_color(), random_color())
        turtle.circle(radius)
        # Tilt turtle by gap size
        turtle.setheading(turtle.heading() + gap_size)

draw_spirograph(gap_size=20,radius=25)

# Renders final image instantly
screen.update()

screen.exitonclick()