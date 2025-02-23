const board = document.getElementById("board");
const status = document.getElementById("status");
let cells = [];
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            status.textContent = `🎉 Player ${gameBoard[a]} wins! 🎉`;
            cells.forEach(cell => cell.style.pointerEvents = "none");
            return true;
        }
    }
    
    if (!gameBoard.includes("")) {
        status.textContent = "🤝 It's a Draw! 🤝";
        return true;
    }
    return false;
}

function handleClick(index) {
    if (gameBoard[index] === "") {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        
        if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
            if (currentPlayer === "O") {
                setTimeout(aiMove, 500);
            }
        }
    }
}

function aiMove() {
    let emptyCells = gameBoard.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameBoard[randomIndex] = "O";
        cells[randomIndex].textContent = "O";
        if (!checkWinner()) {
            currentPlayer = "X";
            status.textContent = "Player X's turn";
        }
    }
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    status.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.pointerEvents = "auto";
    });
}

function initBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleClick(i));
        board.appendChild(cell);
        cells.push(cell);
    }
}

initBoard();
