const cell = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("game-status");
const restartButton = document.getElementById("restart");
const win_condition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;


initializeGame();

function initializeGame() {
cell.forEach(cell => cell.addEventListener("click", cellClicked));
statusDisplay.textContent = `${currentPlayer}'s turn`;
restartButton.addEventListener("click", restartGame);
running = true;
}

function cellClicked() {
const cellIndex = this.getAttribute("cell-number");

if (options[cellIndex] != "" || !running) {
    return
}

updateCell(this, cellIndex);
checkWin();
}

function updateCell(cell, indexCell) {
cell.textContent = currentPlayer;
options[indexCell] = currentPlayer;
}

function checkWin() {
let roundWin = false;

for (let i = 0; i < win_condition.length; i++) {
    const element = win_condition[i];
    const firstCell = options[element[0]];
    const secondCell = options[element[1]];
    const thirdCell = options[element[2]];

    if ( firstCell == "" || secondCell == "" || thirdCell == "") {
        continue;
    }

    if ( firstCell == secondCell && secondCell == thirdCell) {
        roundWin = true;
        break;
    }
}

    if (roundWin) {
        statusDisplay.textContent = `${currentPlayer} wins, Congrats"`;
        running = false;
    }
    else if(!options.includes("")){
        statusDisplay.textContent = `Draw!`;
        running = false;
    }
    else{
        updatePlayer();
    }
}


function updatePlayer() {
currentPlayer = (currentPlayer == "X") ? "O" :"X" ;
statusDisplay.textContent = `${currentPlayer}'s turn`;
}

function restartGame() {
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    cell.forEach(cell => cell.textContent= "");
    running= true;
}