from turtle import Turtle
ALIGN = "left"
FONT = ("Courier", 20, "normal")

class Scoreboard(Turtle):
    def __init__(self):
        super().__init__()
        self.level = 0
        self.lives = 1 # Initialise starting lives
        self.color("black")
        self.penup()
        self.goto(-270, 250)  # Positions text at top
        self.write(f"Level: {self.level} Lives: {self.lives}", move=False, align=ALIGN, font=FONT)
        self.hideturtle()
        self.update_scoreboard()

    def update_scoreboard(self):
        self.write(f"Level: {self.level} Lives: {self.lives}", move=False, align=ALIGN, font=FONT)

        # every refresh, score += 1

    def up_level(self):
        self.level += 1
        self.clear()  # Clears old text before writing new text
        self.update_scoreboard()

    def up_life(self):
        self.lives += 1
        self.clear()
        self.update_scoreboard()

    def lose_life(self):
        self.lives -= 1
        self.clear()
        self.update_scoreboard()

    def game_over(self):
        self.goto(0, 0)
        self.write("Game Over!", move=False, align="center", font=FONT)