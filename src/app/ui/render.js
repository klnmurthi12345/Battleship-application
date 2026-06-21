function renderBoard(board) {
  const playerCells = document.querySelectorAll(
    ".player-board-container .board .cell",
  );

  Object.values(board.ships).forEach((ship) => {
    renderShip(ship, playerCells);
  });
}

function renderShip(ship, playerCells) {
  for (let i of ship.posX) {
    for (let j of ship.posY) {
      playerCells[10 * j + i].classList.add("taken");
    }
  }
}

export function renderGame(board) {
  renderBoard(board);
}

export function resetBoardUI(playerCells) {
  playerCells.forEach((cell) => {
    if (cell.classList.contains("taken")) {
      cell.classList.remove("taken");
    }
  });
}
