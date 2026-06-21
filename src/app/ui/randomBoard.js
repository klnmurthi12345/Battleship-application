export function addRandomBoardConfig(board, ships) {
  const boardMatrix = Array.from({ length: 12 }, () => Array(12).fill(""));

  for (let i = 0; i < 12; i++) {
    boardMatrix[0][i] = "_";
    boardMatrix[11][i] = "_";
    boardMatrix[i][0] = "_";
    boardMatrix[i][11] = "_";
  }

  const orientations = ["horizontal", "vertical"];

  ships.forEach((ship) => {
    ship.orientation =
      orientations[Math.floor(Math.random() * orientations.length)];
  });

  function isValidPos(ship, row, col) {
    if (ship.orientation === "vertical") {
      const cols = Array.from(
        { length: ship.length },
        (_, idx) => Number(col) + idx,
      );
      for (let c of cols) {
        if (boardMatrix[row][c] !== "") {
          return false;
        }
      }
    } else {
      const rows = Array.from(
        { length: ship.length },
        (_, idx) => Number(row) + idx,
      );
      for (let r of rows) {
        if (boardMatrix[r][col] !== "") {
          return false;
        }
      }
    }
    return true;
  }
  function addShip(ship, row, col) {
    if (board.ships[ship.name] === "") {
      if (ship.orientation === "vertical") {
        board.placeShip(ship);
        ship.posX = [Number(row) - 1];
        ship.posY = Array.from(
          { length: ship.length },
          (_, idx) => Number(col) - 1 + idx,
        );
        let posi = Array.from(
          { length: ship.length },
          (_, idx) => Number(col) + idx,
        );
        posi = [posi[0] - 1, ...posi, posi[posi.length - 1] + 1];
        posi.forEach((pos, idx) => {
          if (idx !== 0 && idx !== posi.length - 1) {
            boardMatrix[row][pos] = "*";
          } else {
            boardMatrix[row][pos] = "_";
          }
          boardMatrix[row - 1][pos] = "_";
          boardMatrix[row + 1][pos] = "_";
        });
      } else {
        board.placeShip(ship);
        ship.posX = Array.from(
          { length: ship.length },
          (_, idx) => Number(row) - 1 + idx,
        );
        ship.posY = [Number(col) - 1];
        let posi = Array.from(
          { length: ship.length },
          (_, idx) => Number(row) + idx,
        );
        posi = [posi[0] - 1, ...posi, posi[posi.length - 1] + 1];
        posi.forEach((pos, idx) => {
          if (idx !== 0 && idx !== posi.length - 1) {
            boardMatrix[pos][col] = "*";
          } else {
            boardMatrix[pos][col] = "_";
          }
          boardMatrix[pos][col - 1] = "_";
          boardMatrix[pos][col + 1] = "_";
        });
      }
    }
  }

  function getRandomEmptyCell(boardMatrix) {
    const emptyCells = [];

    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 12; col++) {
        if (boardMatrix[row][col] === "") {
          emptyCells.push([row, col]);
        }
      }
    }

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  while (Object.values(board.ships).some((ship) => ship === "")) {
    const [randRow, randCol] = getRandomEmptyCell(boardMatrix);
    for (let i = 0; i < ships.length; i++) {
      if (isValidPos(ships[i], randRow, randCol)) {
        addShip(ships[i], randRow, randCol);
      }
    }
  }
}
