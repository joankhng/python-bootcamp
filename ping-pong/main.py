# Create the screen
from turtle import Screen
from paddle import Paddle
from ball import Ball
from scoreboard import Scoreboard
import time

r_paddle = Paddle((350,0))
l_paddle = Paddle((-350,0))

ball = Ball()
scoreboard = Scoreboard()

screen = Screen()
screen.setup(width=800, height=600)
screen.bgcolor("black")
screen.title("Ping Pong")
screen.tracer(0)

screen.listen()
screen.onkey(fun=r_paddle.up,key="Up")
screen.onkey(fun=r_paddle.down,key="Down")
screen.onkey(fun=l_paddle.up,key="w")
screen.onkey(fun=l_paddle.down,key="s")

is_game_on = True
while is_game_on:
    time.sleep(ball.move_speed) # frame rate 0.1 equiv 10 updates/second
    screen.update()
    ball.move()

    # Detect collision with wall and bounce
    # Collision with top wall
    # x continues to increase but y peaks at 300 and starts to decline
    if ball.ycor() > 280 or ball.ycor() < -280:
        ball.bounce_y()

    # Detect collision with paddle
    if (ball.distance(r_paddle) < 50 and ball.xcor() > 320 and ball.x_move > 0
            or ball.distance(l_paddle) < 50 and ball.xcor() < -320 and ball.x_move < 0):

        ball.bounce_x()

    # Detect if the ball goes out of bounds at the edge of the screen.
    # If yes, reset the ball to the center of the screen.
    # The ball should then start moving towards the other player.

    # Detect when R paddle misses

    if ball.xcor() > 380:
        ball.reset_position()
        scoreboard.add_l_point()

    elif ball.xcor() < -380:
        ball.reset_position()
        scoreboard.add_r_point()

screen.exitonclick()