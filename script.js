// ===================================
// TIC-TAC-TOE AI GAME
// AI STRATEGY: MINIMAX ALGORITHM
// ===================================

// Game elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart-btn");

// Game variables
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let playerTurn = true;

const HUMAN = "X";
const AI = "O";

// Winning combinations
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
            currentBoard[a] !== "" &&
            currentBoard[a] === currentBoard[b] &&
            currentBoard[b] === currentBoard[c]
        ) {
            return currentBoard[a];
        }
    }

    return null;
}

// Check for a draw
function isDraw(currentBoard) {
    return currentBoard.every(cell => cell !== "");
}

// Update the game board
function makeMove(index, player) {
    board[index] = player;

    cells[index].textContent = player;
    cells[index].classList.add(player.toLowerCase());
    cells[index].disabled = true;

    checkGameStatus();
}

// Handle human player moves
function handlePlayerMove(event) {
    const index = Number(event.target.dataset.index);

    if (
        !gameActive ||
        !playerTurn ||
        board[index] !== ""
    ) {
        return;
    }

    playerTurn = false;

    makeMove(index, HUMAN);

    if (!gameActive) {
        return;
    }

    statusText.textContent = "Computer is thinking...";

    setTimeout(() => {
        if (!gameActive) return;

        const bestMove = findBestMove();

        if (bestMove !== -1) {
            makeMove(bestMove, AI);
        }

        if (gameActive) {
            playerTurn = true;
            statusText.textContent = "Your turn (X)";
        }

    }, 400);
}

// Check game results
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
    }
}

// Disable all board cells
function disableCells() {
    cells.forEach(cell => {
        cell.disabled = true;
    });
}

// ===================================
// MINIMAX AI ALGORITHM
// ===================================

function minimax(currentBoard, isMaximizing, depth = 0) {

    const winner = checkWinner(currentBoard);

    if (winner === AI) {
        return 10 - depth;
    }

    if (winner === HUMAN) {
        return depth - 10;
    }

    if (isDraw(currentBoard)) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {
            if (currentBoard[i] === "") {

                currentBoard[i] = AI;

                const score = minimax(
                    currentBoard,
                    false,
                    depth + 1
                );

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

                const score = minimax(
                    currentBoard,
                    true,
                    depth + 1
                );

                currentBoard[i] = "";

                bestScore = Math.min(bestScore, score);
            }
        }

        return bestScore;
    }
}

// Find the best move for the AI
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

// ===================================
// RESTART GAME
// ===================================

function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    gameActive = true;
    playerTurn = true;

    cells.forEach(cell => {

        cell.textContent = "";

        cell.disabled = false;

        cell.classList.remove("x", "o");

    });

    statusText.textContent = "Your turn (X)";
}

// ===================================
// EVENT LISTENERS
// ===================================

cells.forEach(cell => {
    cell.addEventListener("click", handlePlayerMove);
});

restartButton.addEventListener("click", restartGame);
