import { renderGame, resetBoardUI } from "./render.js";
import { addRandomBoardConfig } from "./randomBoard.js";

const startScreen = document.getElementById("start-screen");
const startBtn = document.querySelector("#start-screen #btn");
const setupBoardScreen = document.querySelector(".set-board-screen");
const continueSetupBtn = document.querySelector(
  ".set-board-screen .board-container #btn",
);
const playerCells = document.querySelectorAll(
  ".player-board-container .board .cell",
);
const compCells = document.querySelectorAll(
  ".computer-board-container .board .cell",
);
const playScreen = document.getElementById("play-screen");
const newGameBtn = document.querySelector(
  ".play-screen .btn-container .new-game",
);

function resetShipsPosition(ships) {
  ships.forEach((ship) => {
    ship.element.style.left = "15vh";
    if (ship.name === "carrier") {
      ship.element.style.top = "35vh";
    }
    if (ship.name === "battleship") {
      ship.element.style.top = "41vh";
    }
    if (ship.name === "cruiser") {
      ship.element.style.top = "47vh";
    }
    if (ship.name === "submarine") {
      ship.element.style.top = "53vh";
    }
    if (ship.name === "destroyer") {
      ship.element.style.top = "59vh";
    }
  });
}

function startGame(board, compBoard, player, computer, game, compCell) {
  const compIdx = parseInt(
    compCell.id.replace("computer-board-containercell", ""),
  );
  const [compRow, compCol] = [compIdx % 10, Math.floor(compIdx / 10)];

  game.playTurn(); // player starts
  player.attack(compRow, compCol, compBoard);
  game.switchTurn(); // Computer starts
  computer.randomAttack(board);
  if (board.allShipsSunk() || compBoard.allShipsSunk()) {
    if (player.score >= computer.score) {
      alert("player won");
    } else {
      alert("player lost");
    }
  }
}

export function enableEvents(
  board,
  ships,
  compBoard,
  compShips,
  player,
  computer,
  game,
) {
  startBtn.addEventListener("click", () => {
    startScreen.classList.toggle("hidden");
    setupBoardScreen.classList.toggle("hidden");
  });

  continueSetupBtn.addEventListener("click", () => {
    try {
      setupBoardScreen.classList.toggle("hidden");
      playScreen.classList.toggle("hidden");
      renderGame(board);
      addRandomBoardConfig(compBoard, compShips);
    } catch (error) {
      setupBoardScreen.classList.toggle("hidden");
      playScreen.classList.toggle("hidden");
      alert("Invalid ship positions!");
    }
  });

  newGameBtn.addEventListener("click", () => {
    setupBoardScreen.classList.toggle("hidden");
    playScreen.classList.toggle("hidden");
    resetBoardUI(playerCells);
    resetShipsPosition(ships);
    board.reset();
    compBoard.reset();

    ships.forEach((ship) => {
      ship.posX = [];
      ship.posY = [];
      ship.orientation = "horizontal";
    });
  });

  compCells.forEach((compCell) => {
    compCell.addEventListener("click", () => {
      if (compCell.innerText === "") {
        startGame(board, compBoard, player, computer, game, compCell);

        board.hits.forEach((arr) => {
          playerCells[10 * arr[1] + arr[0]].innerText = "×";
        });

        board.misses.forEach((arr) => {
          playerCells[10 * arr[1] + arr[0]].innerText = ".";
        });

        compBoard.hits.forEach((arr) => {
          compCells[10 * arr[1] + arr[0]].innerText = "×";
        });

        compBoard.misses.forEach((arr) => {
          compCells[10 * arr[1] + arr[0]].innerText = ".";
        });
      }
    });
  });
}
