# Blackjack simplified game house rules
# There are no jokers
# Cards are removed from the deck as they are drawn pop()
# The computer is the dealer.

# if dealer_score <17 -> must take another card
import random
import os

# Clear the console for a fresh start.
def clear_console():
    os.system('cls' if os.name == 'nt' else 'clear')

# 52 values (4 of each rank) * number of decks
def create_deck(num_checks = 1):
    # Standard 52-card deck with four 10-value ranks (10, J, Q, K) and one of each other rank
    one_deck = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10] * 4
    # shoe is 4 to 8 decks shuffled together
    shoe = one_deck * num_checks
    random.shuffle(shoe)
    return shoe

# Single deck that depletes as cards are dealt
def deal_card(existing_hand, shoe):
    # .pop() removes drawn cards and returns the top card from deck
    new_card = shoe.pop()
    existing_hand.append(new_card)
    return existing_hand

def deal_starting_hand(shoe):
    # Removes and returns two cards from the end of the list
    starting_hand = [shoe.pop(),shoe.pop()]
    return starting_hand

def deal_card(existing_hand, shoe):
    new_card = shoe.pop()
    existing_hand.append(new_card)
    return existing_hand

def calculate_score(hand):
    if sum(hand) == 21 and len(hand) == 2:
        # Check for natural Blackjack (Ace + 10 value card).
        return 0
    # Adjust for Aces when sum of cards in hand exceed 21
    while 11 in hand and sum(hand) > 21:
        hand.remove(11)
        hand.append(1)
    # Return calculated score
    return sum(hand)

def compare_score(player_score, dealer_score):
    # Check for Busts
    if dealer_score > 21 and player_score >21:
        return "Both bust. You lose!"
    if player_score >21:
        return "You went over 21. You lose 😭"
    if dealer_score > 21:
        return "Dealer went over 21. You win!"

    # Check for blackjack
    # If computer gets blackjack, then the user loses (even if the user also has a blackjack). If the user gets a blackjack, then they win (unless the computer also has a blackjack).
    if dealer_score == 0:
        return "Dealer wins with a Blackjack 🖤. You lose 😭"
    elif player_score == 0:
        return "You win with a Blackjack 🖤"

    # Standard checks
    elif player_score == dealer_score:
        return "It's a draw!"
    elif player_score > dealer_score:
        return "You win!"
    else:
        return "You lose 😭"

# Initialise 4-deck shoe
shoe = create_deck(num_checks = 4)

is_playing = True

while is_playing:
    player_choice = input("Do you want to play a game of Blackjack? Type 'y' or 'n':")
    if player_choice != "y":
        is_playing = False
        print("End game")
    else:
        # clear console for a fresh start
        clear_console()

        # Reshuffle mechanic
        if len(shoe) < 20:
            print("Deck is running low. Reshuffling the shoe...")
            shoe = create_deck(num_checks=4)

        # Deal both user and computer a starting hand of 2 random card values
        player_hand = deal_starting_hand(shoe)
        dealer_hand = deal_starting_hand(shoe)

        # Flag to control current round
        is_game_over = False

        # Player's turn loop
        while not is_game_over:
            # Calculate the player's and computer's scores based on their card values.
            player_score = calculate_score(player_hand)
            dealer_score = calculate_score(dealer_hand)

            # Check for wins or losses
            compare_score(player_score, dealer_score)

            # Game ends immediately when user score goes over 21 or if the user or computer gets a blackjack.
            if player_score == 0 or dealer_score == 0 or player_score >21:
                is_game_over = True
            else:
                print(f"Your cards: {player_hand}. Current score: {player_score}")

                # Reveal dealer's first card to user
                dealer_first_card = dealer_hand[0]
                print(f"Computer's first card: {dealer_first_card}")

                # Ask the user if they want to get another card.
                draw_another_card = input("Type 'y' to hit, type 'n' to pass:")
                if draw_another_card == 'y':
                    player_hand = deal_card(player_hand, shoe)

                else:
                    is_game_over = True

        # Dealer's turn loop
        # Dealer only draws if player hasn't busted or hit blackjack
        if player_score <= 21 or dealer_score != 0:
            # The computer should keep drawing cards unless their score goes over 16.
            while dealer_score != 0 and dealer_score < 17:
                dealer_hand = deal_card(dealer_hand, shoe)
                dealer_score = calculate_score(dealer_hand)

        # Print the player's and computer's final hand and their scores at the end of the game.
        print(f"Your final hand:{player_hand}. Final score: {player_score}")
        print(f"Dealer's final hand:{dealer_hand}. Final score: {dealer_score}")

        # Print returned result from comparison function
        print(compare_score(player_score, dealer_score))
