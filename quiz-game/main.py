from question_data import question_data
from question_model import Question
from quiz_brain import QuizBrain
import html

question_bank = [] # start with empty list

# Write a for loop to iterate over the question_data
for question in question_data["results"]:
    # Extract string values from current dictionary
    question_text = html.unescape(question["question"])
    question_answer = question["correct_answer"]
    # Create a Question object for each entry in question_data
    new_question = Question(q_text=question_text, q_answer=question_answer)
    # Append each Question object to the question_bank
    question_bank.append(new_question)

quiz = QuizBrain(question_bank)

while quiz.still_has_questions():
    quiz.next_question()

print("You've completed the quiz.")
print(f"Your final score was {quiz.score}/{quiz.question_number}") # or len(question_data)