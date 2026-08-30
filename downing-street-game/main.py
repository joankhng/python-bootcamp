print('''                               /\
                               \ \
                                \ \
                                / /
                               / /
                              _\ \_/\/\
                             /  *  \@@ =
                            |       |Y/
                            |       |~
                             \ /_\ /
                              \\ //
                               |||
                              _|||_
                             ( / \ )-Larry'''
)

print("Welcome to Number 10 Downing Street. \nYour mission is to survive as Prime Minister.")

choice_1 = input(
    "You are drafting your first major economic statement. Do you choose to 'fund' your tax cuts or 'borrow' to finance them? ")

if choice_1 != "fund":
    print(
        "You announce a mini-budget with sweeping unfunded tax cuts. \nThe bond markets panic, the pound crashes, and you are forced to resign. \nGame over.")
else:
    choice_2 = input(
        "The markets are stable, but you face pressure on income tax. Do you 'cut' the top rate of tax or 'maintain' it? ")

    if choice_2 != "maintain":
        print(
            "Cutting the top rate of income tax during a cost-of-living crisis causes a severe backbench rebellion. \nYou are forced into a humiliating U-turn and lose political authority. \nGame over.")
    else:
        choice_3 = input(
            "You receive a £5 million donation from a cryptocurrency billionaire. Do you 'declare' the gift or 'hide' it? ")

        if choice_3 != "declare":
            print(
                "You face a parliamentary probe over the undeclared crypto funds and trigger a by-election. \nMajor parties boycott, leaving you to face off against intergalactic space warrior, Count Binface. \nYou endure the humiliation. \nGame over.")
        else:
            choice_4 = int(input(
                "You have survived the initial fiscal hurdles. Now, you must address public finances. Type '1' to introduce a heavy wealth tax, '2' to attend a restricted gathering, or '3' to apply a windfall tax on energy profits. "))

            if choice_4 == 1:
                print(
                    "Your party fundamentally disagrees with a heavy wealth tax. \nYour MPs submit letters of no confidence, triggering a leadership contest. \nGame over.")
            elif choice_4 == 2:
                print(
                    "Photographs emerge of you attending a gathering during strict public health restrictions. \nFollowing a police investigation and mass cabinet resignations, you step down. \nGame over.")
            elif choice_4 == 3:
                print(
                    "The windfall tax stabilizes the economy. However, internal party divisions eventually force you out anyway. \nYou leave Downing Street. The Chief Mouser to the Cabinet Office remains. \nLarry the cat is the winner.")
            else:
                print(
                    "You hesitated and failed to pass a budget. The opposition calls a vote of no confidence. \nGame over.")