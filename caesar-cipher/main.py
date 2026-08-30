alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

def caeser(start_text, shift_amount, direction):
    end_text = "" # create placeholder empty text
    if direction == 0:
        shift_amount *= -1 # short form of shift_amount = shift_amount * -1

    for letter in start_text:
        if letter not in alphabet:
            end_text += letter
        else:
            current_position = alphabet.index(letter)
            new_position = (current_position + shift_amount) % 26
            end_text += alphabet[new_position]

    action = "encrypt" if direction == 1 else "decrypt"
    print(f"The {action}ed text is {end_text}\n")

print("This is Caesar Cipher (Shift Cypher)")

continue_game = True

while continue_game:
    message = input("Enter your message:\n").lower()
    shift = int(input("Enter the shift number:\n"))
    direction = int((input("Type '1' to encrypt, type '0' to decrypt:\n")))

    caeser(start_text=message, shift_amount=shift, direction=direction)

    repeat = int(input("Type '1' if you want to go again. Type '0' if you want to quit."))
    if repeat != 1:
        continue_game = False