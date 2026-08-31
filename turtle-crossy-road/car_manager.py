from turtle import Turtle
import random

COLORS = ["#FF7951", "#62C9ED","#A9ED71","#FE7199","#FFC170","#7FA9E6","#CE7CFF"]
STARTING_MOVE_DISTANCE = random.randrange(5,20)
ROAD_LANES = [-260, -240, -200, -160, -120, -80, -40, 0, 40, 80, 120, 160, 200, 240, 260]

class CarManager:
    # Creates list of all cars
    def __init__(self):
        self.all_cars = []
        self.move_speed = STARTING_MOVE_DISTANCE
        self.car_count = 20  # Initialise starting number of cars

    # Cars are randomly generated along the y-axis and will move from the right edge of the screen to the left edge.
    def create_car(self):
        random_chance = random.randint(1,6)
        random_y = random.choice(ROAD_LANES)

        lane_is_clear = True
        for existing_car in self.all_cars:
            if existing_car.xcor() == random_y and existing_car.xcor() > 220:
                lane_is_clear = False

        if random_chance == 1 and lane_is_clear:
            new_car = Turtle("square")
            new_car_length = random.choice([2,3,4])
            new_car.shapesize(stretch_wid=1, stretch_len=new_car_length)  # default pointing East
            new_car.penup()
            new_car.color(random.choice(COLORS))

            random_x = random.randint(280, 310)
            new_car.goto(random_x, random_y)

            self.all_cars.append(new_car)

    def move(self):
        for car in self.all_cars:
            # since the default heading is East (Right)
            car.backward(STARTING_MOVE_DISTANCE)

        for car in self.all_cars:
            if car.xcor() < -320:
                car.hideturtle()
                self.all_cars.remove(car) # remove cars offscreen to managed memory

    def next_level(self):
        self.move_speed *= 1.2
        self.car_count *= 1.2
        self.create_car()