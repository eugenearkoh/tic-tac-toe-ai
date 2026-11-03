// TIC-TAC-TOE AI GAME
// AI Strategy: Minimax Algorithm

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart-btn");

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const HUMAN = "X";
const AI = "O";

// All possible winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Check for a winner
function checkWinner(currentBoard) {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            currentBoard[a] &&
            currentBoard[a] === currentBoard[b] &&
            currentBoard[a] === currentBoard[c]
        ) {
            return currentBoard[a];
        }
    }

    return null;
}

// Check whether the board is full
function isDraw(currentBoard) {
    return currentBoard.every(cell => cell !== "");
}

// Handle a human move
function handlePlayerMove(event) {
    const index = Number(event.target.dataset.index);

    if (!gameActive || board[index] !== "") {
        return;
    }

    makeMove(index, HUMAN);

    if (!gameActive) return;

    statusText.textContent = "Computer is thinking...";

    setTimeout(() => {
        const bestMove = findBestMove();

        if (bestMove !== -1 && gameActive) {
            makeMove(bestMove, AI);
        }
    }, 400);
}

// Update the board
function makeMove(index, player) {
    board[index] = player;

    cells[index].textContent = player;
    cells[index].classList.add(player.toLowerCase());
    cells[index].disabled = true;

    checkGameStatus();
}

// Validate game outcomes
function checkGameStatus() {
    const winner = checkWinner(board);

    if (winner === HUMAN) {
        statusText.textContent = "Congratulations! You win!";
        gameActive = false;
        disableCells();
        return;
    }

    if (winner === AI) {
        statusText.textContent = "Computer wins! Try again.";
        gameActive = false;
        disableCells();
        return;
    }

    if (isDraw(board)) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        disableCells();
        return;
    }

    statusText.textContent =
        board.filter(cell => cell !== "").length % 2 === 0
            ? "Your turn (X)"
            : "Computer's turn (O)";
}

// Disable all cells
function disableCells() {
    cells.forEach(cell => {
        cell.disabled = true;
    });
}

// Minimax Algorithm
function minimax(currentBoard, isMaximizing) {
    const winner = checkWinner(currentBoard);

    if (winner === AI) return 10;
    if (winner === HUMAN) return -10;
    if (isDraw(currentBoard)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {
            if (currentBoard[i] === "") {
                currentBoard[i] = AI;

                const score = minimax(currentBoard, false);

                currentBoard[i] = "";
                bestScore = Math.max(bestScore, score);
            }
        }

        return bestScore;

    } else {
        let bestScore = Infinity;

        for (let i = 0; i < 9; i++) {
            if (currentBoard[i] === "") {
                currentBoard[i] = HUMAN;

                const score = minimax(currentBoard, true);

                currentBoard[i] = "";
                bestScore = Math.min(bestScore, score);
            }
        }

        return bestScore;
    }
}

// Find the best move for the computer
function findBestMove() {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = AI;

            const score = minimax(board, false);

            board[i] = "";

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

// Restart the game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
        cell.classList.remove("x", "o");
    });

    statusText.textContent = "Your turn (X)";
}

// Attach event listeners
cells.forEach(cell => {
    cell.addEventListener("click", handlePlayerMove);
});

restartButton.addEventListener("click", restartGame);
