from turtle import Turtle
FONT = ("Courier", 20, "normal")

class Scoreboard(Turtle):
    # Create a scoreboard
    def __init__(self):
        super().__init__()
        self.color("white")
        self.penup()
        self.hideturtle()

        self.l_score = 0
        self.r_score = 0

        self.update_scoreboard()

    def update_scoreboard(self):
        self.clear()

        self.goto(-200,200) # Positions text at top
        self.write(f"P1: {self.l_score}", move=False, align="left", font=FONT)

        self.goto(200, 200)  # Positions text at top
        self.write(f"P2: {self.r_score}", move=False, align="right", font=FONT)

    # every refresh, score += 1
    def add_l_point(self):
        self.l_score += 1
        self.clear()  # Clears old text before writing new text
        self.update_scoreboard()

    def add_r_point(self):
        self.r_score += 1
        self.clear()
        self.update_scoreboard()