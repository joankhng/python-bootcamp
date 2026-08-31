import time
from turtle import Screen
from player import Player
from car_manager import CarManager
from food import Food
from scoreboard import Scoreboard

screen = Screen()
screen.setup(width=600, height=600)
screen.title("Turtle Crossy Road")
screen.tracer(0)

player = Player()
car = CarManager()
food = Food()
scoreboard = Scoreboard()

screen.listen()
screen.onkey(fun=player.up,key="Up")
screen.onkey(fun=player.down,key="Down")
screen.onkey(fun=player.left,key="Left")
screen.onkey(fun=player.right,key="Right")

food.placement()

is_game_on = True
while is_game_on:
    time.sleep(0.1)
    screen.update()

    car.create_car()
    car.move()

    # Detect collision with any car
    for n in car.all_cars:
        if player.distance(n) < 20:
            car.create_car()
            scoreboard.lose_life()
            player.reset_position()

    # Detect collision with any food
    for n in food.all_foods:
        if player.distance(n) < 25:
            food.refresh(n)
            scoreboard.up_life()

    # Detect if the player reaches top of the screen.
    # If yes, reset the player to the bottom of the screen.
    if player.ycor() > 280:
        player.reset_position()
        car.next_level()
        scoreboard.up_level()

    # Detect if the player loses all lives
    if scoreboard.lives <= 0:
        is_game_on = False
        scoreboard.game_over()

screen.exitonclick()