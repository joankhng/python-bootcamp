from turtle import Turtle
ALIGN = "center"
FONT = ("Courier", 20, "normal")

class Scoreboard(Turtle):
    # Create a scoreboard
    def __init__(self):
        super().__init__()
        self.score = 0
        self.color("white")
        self.penup()
        self.goto(0,250) # Positions text at top
        self.write(f"Score: {self.score}", move=False, align=ALIGN, font=FONT)
        self.hideturtle()
        self.update_scoreboard()

    def update_scoreboard(self):
        self.write(f"Score: {self.score}", move=False, align=ALIGN, font=FONT)

    # every refresh, score += 1
    def increase_score(self):
        self.score += 1
        self.clear()  # Clears old text before writing new text
        self.update_scoreboard()

    def game_over(self):
        self.goto(0, 0)
        self.write("Game Over!", move=False, align=ALIGN, font=FONT)