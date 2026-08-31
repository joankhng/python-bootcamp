from turtle import Screen
import time

from snake import Snake
from food import Food
from scoreboard import Scoreboard
from wall import Wall

snake = Snake()
food = Food()
scoreboard = Scoreboard()
wall = Wall()

screen = Screen()
screen.setup(width=600,height=600)
screen.bgcolor("black")
screen.title("Snake Game")
screen.tracer(0)
wall.draw_square()

# Event listener
screen.listen()
screen.onkey(fun=snake.up,key="Up")
screen.onkey(fun=snake.down,key="Down")
screen.onkey(fun=snake.left,key="Left")
screen.onkey(fun=snake.right,key="Right")

is_game_on = True
while is_game_on:
    screen.update()
    time.sleep(0.1)

    snake.move()

    # Detect collision with food
    # snake.distance(x,y) compare distance between a and b and returns distance between them
    if snake.head.distance(food) < 15:
        food.refresh()
        snake.extend()
        scoreboard.increase_score()
        scoreboard.update_scoreboard()

    # Detect collision with wall
    if snake.head.xcor() > 265 or snake.head.xcor() < -265 or snake.head.ycor() < -265 or snake.head.ycor() > 265:
        scoreboard.reset()
        snake.reset()
        screen.update()
        time.sleep(0.7)

    # Detect collision with tail
    for segment in snake.segments[1:]:
        if snake.head.distance(segment) < 10:
            scoreboard.reset()
            snake.reset()
            screen.update()
            time.sleep(0.7)

screen.exitonclick()