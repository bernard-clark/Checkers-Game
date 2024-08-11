// Get the game board element by its ID
const gameBoard = document.getElementById('game-board');

// Define the number of rows and columns for the board
const rows = 8;
const cols = 8;

// Initialize an array to represent the board state
let board = [];

// Track the current player's turn (red or black)
let currentPlayer = 'red';

// Function to create the game board and initialize pieces
function createBoard() {
    for (let row = 0; row < rows; row++) { // Loop through each row
        let rowArray = []; // Array to hold each row's squares
        for (let col = 0; col < cols; col++) { // Loop through each column
            const square = document.createElement('div'); // Create a square div
            square.classList.add('square'); // Add the 'square' class to the div

            // Determine if the square should be black or white
            if ((row + col) % 2 === 0) {
                square.classList.add('white'); // Even sum of row+col => white square
            } else {
                square.classList.add('black'); // Odd sum of row+col => black square

                // Add pieces to the black squares in the first 3 and last 3 rows
                if (row < 3) {
                    const piece = document.createElement('div');
                    piece.classList.add('piece', 'black'); // Add black pieces at the top
                    piece.dataset.color = 'black'; // Store the piece's color
                    square.appendChild(piece); // Add the piece to the square
                } else if (row > 4) {
                    const piece = document.createElement('div');
                    piece.classList.add('piece', 'red'); // Add red pieces at the bottom
                    piece.dataset.color = 'red'; // Store the piece's color
                    square.appendChild(piece); // Add the piece to the square
                }
            }

            // Set the row and column as data attributes on the square
            square.dataset.row = row;
            square.dataset.col = col;

            // Add the square to the game board element
            gameBoard.appendChild(square);

            // Add the square to the current row array
            rowArray.push(square);
        }
        // Add the row array to the board array
        board.push(rowArray);
    }
}

// Function to handle click events on the board
function handleSquareClick(e) {
    const square = e.target; // Get the clicked element

    // Check if a piece was clicked
    if (square.classList.contains('piece')) {
        selectPiece(square); // If so, select the piece
    } else if (selectedPiece && square.classList.contains('black')) {
        movePiece(square); // If a black square was clicked, move the selected piece
    }
}

// Function to select a piece
function selectPiece(piece) {
    // Ensure the piece belongs to the current player
    if (piece.dataset.color === currentPlayer) {
        clearSelection(); // Clear any previously selected piece
        selectedPiece = piece; // Set the selected piece
        piece.classList.add('selected'); // Highlight the selected piece
    }
}

// Function to move the selected piece to a new square
function movePiece(square) {
    const fromRow = parseInt(selectedPiece.parentElement.dataset.row); // Get the row of the selected piece
    const fromCol = parseInt(selectedPiece.parentElement.dataset.col); // Get the column of the selected piece
    const toRow = parseInt(square.dataset.row); // Get the row of the target square
    const toCol = parseInt(square.dataset.col); // Get the column of the target square

    // Check if the move is valid
    if (isValidMove(fromRow, fromCol, toRow, toCol)) {
        square.appendChild(selectedPiece); // Move the piece to the new square
        selectedPiece.classList.remove('selected'); // Remove the selection highlight
        selectedPiece = null; // Clear the selected piece
        switchPlayer(); // Switch to the other player
    }
}

// Function to validate a move
function isValidMove(fromRow, fromCol, toRow, toCol) {
    const rowDiff = toRow - fromRow; // Calculate the difference in rows
    const colDiff = Math.abs(toCol - fromCol); // Calculate the difference in columns

    // Check if the move is a valid diagonal move for the current player
    if (currentPlayer === 'red' && rowDiff === -1 && colDiff === 1) {
        return true; // Valid move for red
    }
    if (currentPlayer === 'black' && rowDiff === 1 && colDiff === 1) {
        return true; // Valid move for black
    }

    return false; // Invalid move
}

// Function to switch the current player after a move
function switchPlayer() {
    currentPlayer = currentPlayer === 'red' ? 'black' : 'red'; // Switch between red and black
}

// Function to clear the selection of any piece
function clearSelection() {
    const selected = document.querySelector('.piece.selected'); // Find the currently selected piece
    if (selected) {
        selected.classList.remove('selected'); // Remove the selection highlight
    }
}

// Initialize the selectedPiece variable
let selectedPiece = null;

// Create the board when the page loads
createBoard();

// Add an event listener to handle clicks on the board
gameBoard.addEventListener('click', handleSquareClick);