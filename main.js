import { player } from './play.js';

let player1;
let computer;
let yourturn = true;

document.addEventListener("DOMContentLoaded", () => {
    const playerName = prompt("Enter your name:");
    player1 = new player(playerName || "Player");
    computer = new player("Computer");

    startGame();
    renderBoards();
    setupEventListeners();
});

function startGame() {
    player1.board.randombuild();
    computer.board.randombuild();
}

function setupEventListeners() {
    document.getElementById("Reset").addEventListener("click", () => {
        resetGame();
    });

    document.getElementById("Randomise").addEventListener("click", () => {
        player1.board.clearboard();
        player1.board.randombuild();
        computer.board.clearboard();
        computer.board.randombuild();
        renderBoards();
    });
}

function renderBoards() {
    renderBoard(player1.board.board, "Player", false);
    renderBoard(computer.board.board, "Computer", true);
}

function renderBoard(board, containerId, isEnemy) {
    const score = document.getElementById("score");
    const miss = document.getElementById("miss");
    const sunk = document.getElementById("sunk");
    score.textContent = `Score: ${player1.board.score}`;
    miss.textContent = `Miss: ${player1.board.miss}`;
    sunk.textContent = `Number Sunk: ${player1.board.numsunk}`;
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous

    board.forEach((row, x) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        row.forEach((cell, y) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");

            // Color if occupied
            if (cell==1) cellDiv.classList.add("ship");
            //if (!isEnemy && cell==1) cellDiv.classList.add("ship");
            
            if(cell == 2) cellDiv.classList.add("miss");
            if(cell == 10) cellDiv.classList.add("hit");
            //if (cell.hit) cellDiv.classList.add(cell==1 ? "hit" : "miss");

            if (isEnemy) {
                cellDiv.addEventListener("click", () => handleAttack(y, x));
                
                cellDiv.addEventListener("mouseover", () => cellDiv.classList.add("hover"));
                cellDiv.addEventListener("mouseout", () => cellDiv.classList.remove("hover"));
            }

            rowDiv.appendChild(cellDiv);
        });
        container.appendChild(rowDiv);
    });
}

function handleAttack(x, y) {
    console.log(x + " " + y);
    computer.board.printboard();
    if (!yourturn) return;

    const result = computer.board.receiveAttack({ x, y });
    if (!result) return; // Already attacked

    yourturn = false;
    renderBoards();

    setTimeout(() => {
        computerTurn();
    }, 500);
}

function computerTurn() {
    let x, y;
    do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    } while (player1.board.board[y][x].hit);

    player1.board.receiveAttack({ x, y });
    yourturn = true;
    renderBoards();

    if (checkGameOver()) {
        alert("Game Over!");
    }
}

function checkGameOver() {
    const playerLost = player1.board.numships.every(s => s.sunk);
    const computerLost = computer.board.numships.every(s => s.sunk);

    if (playerLost || computerLost) {
        alert(playerLost ? "Computer wins!" : `${player1.title} wins!`);
        return true;
    }
    return false;
}

function resetGame() {
    location.reload(); // Simple reset for now
}

