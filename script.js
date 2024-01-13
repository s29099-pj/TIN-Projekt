let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let duelNumber = 1;
let playerXScore = 0;
let playerOScore = 0;

function handleMove(cell) {
    const index = Array.from(cell.parentNode.children).indexOf(cell);
    const messageBox = document.getElementById('message-box');

    if (gameBoard[index] === '' && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            messageBox.textContent = `Gratulacje! Wygrywa gracz ${currentPlayer}`;
            if (currentPlayer === 'X') {
                playerXScore++;
            } else {
                playerOScore++;
            }
            updateScores();
            resetGame();
        } else if (!gameBoard.includes('')) {
            messageBox.textContent = 'Remis! Gra zakończona.';
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateCurrentPlayer();
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function updateCurrentPlayer() {
    const currentPlayerElement = document.getElementById('current-player');
    currentPlayerElement.textContent = `Aktualny gracz: ${currentPlayer}`;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
    const messageBox = document.getElementById('message-box');
    duelNumber++; 
    messageBox.textContent = `Pojedynek numer ${duelNumber}`;
}

function updateScores() {
    const playerXScoreElement = document.getElementById('player-x-score');
    const playerOScoreElement = document.getElementById('player-o-score');

    playerXScoreElement.textContent = `Gracz X: ${playerXScore}`;
    playerOScoreElement.textContent = `Gracz O: ${playerOScore}`;
}

function resetScores() {
    playerXScore = 0;
    playerOScore = 0;
    duelNumber = 1;
    updateScores();

    const messageBox = document.getElementById('message-box');
    messageBox.textContent = `Pojedynek numer ${duelNumber}`;
}