# asking the questions

# question_list init when create quiz_brain. pass question list into this quiz_brain
class QuizBrain:
    def __init__(self, q_list):
        self.question_number = 0
        self.score = 0
        self.question_list = q_list

    # checking if we're at the end of the quiz
    def still_has_questions(self):
        # len(self.question_list): total number of questions in list
        # Return True if current question number < total questions
        return self.question_number < len(self.question_list)

    def next_question(self):
        # Create method next_question
        current_question = self.question_list[self.question_number]
        self.question_number += 1  # increases question number each time
        # Use the input() function to show the user the Question text and ask for the user's answer
        user_answer = input(f"Q.{self.question_number}: {current_question.text} (True/False): ")
        self.check_answer(user_answer,current_question.answer)

    # Checks if the answer is correct
    def check_answer(self, user_answer, correct_answer):
        if user_answer.lower() == correct_answer.lower():
            self.score += 1
            print(f"You got it right! \n the correct answer was: {correct_answer}. \n Your current score is {self.score}/{self.question_number}")
        else:
            print(
                f"You got it wrong! \n the correct answer was: {correct_answer}. \n Your current score is {self.score}/{self.question_number}")

