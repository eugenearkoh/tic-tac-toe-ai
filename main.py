# TIC-TAC-TOE AI
# Developed using Python
# AI Strategy: Minimax Algorithm

# Initialize the game board
board = [" " for _ in range(9)]

# Display the game board
def display_board():
    print("\n")
    for row in range(3):
        print(" | ".join(board[row * 3:row * 3 + 3]))
        if row < 2:
            print("--+---+--")


# Display available positions
def display_positions():
    print("\nAvailable positions:")
    print("0 | 1 | 2")
    print("--+---+--")
    print("3 | 4 | 5")
    print("--+---+--")
    print("6 | 7 | 8")


# Start the game
def main():
    print("WELCOME TO TIC-TAC-TOE AI!")
    print("You are X. The computer is O.")

    display_positions()
    display_board()


if __name__ == "__main__":
    main()
