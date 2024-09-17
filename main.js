const gameBoard = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

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

// Function to check if a player has won
function checkWinner() {
for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
    return board[a];
    }
}
return board.includes('') ? null : 'Tie';
}

// Function to handle a cell click
function handleClick(e) {
const index = e.target.getAttribute('data-index');

if (board[index] !== '' || isGameOver) return;

board[index] = currentPlayer;
e.target.textContent = currentPlayer;

const winner = checkWinner();

if (winner) {
    message.textContent = winner === 'Tie' ? 'It\'s a tie!' : `Player ${winner} wins!`;
    isGameOver = true;
} else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}
}

// Function to reset the game
function resetGame() {
board = ['', '', '', '', '', '', '', '', ''];
currentPlayer = 'X';
isGameOver = false;
message.textContent = `Player ${currentPlayer}'s turn`;
gameBoard.forEach(cell => {
    cell.textContent = '';
});
}

// Event listeners
gameBoard.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// Initial message
message.textContent = `Player ${currentPlayer}'s turn`;
