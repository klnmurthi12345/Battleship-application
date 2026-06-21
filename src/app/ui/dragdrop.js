export function dragdrop(board, ships) {
  const setupCells = document.querySelectorAll("#board-container #board .cell");

  function rotate(ship) {}

  function isValidMove(ship) {
    const board = document.querySelector("#board-container #board");
    const cell = setupCells[0];

    const shipRect = ship.element.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();
    const errorLength = cell.getBoundingClientRect().width;

    let isValidAndInBoard = true;
    let notOutOfBoard = true;

    isValidAndInBoard = ships
      .filter((otherShip) => otherShip.name !== ship.name)
      .every((otherShip) => {
        const otherShipRect = otherShip.element.getBoundingClientRect();

        return (
          shipRect.right - errorLength * 0.3 <
            otherShipRect.left - errorLength ||
          shipRect.left - errorLength * 0.3 >
            otherShipRect.right + errorLength ||
          shipRect.bottom - errorLength * 0.3 <
            otherShipRect.top - errorLength ||
          shipRect.top > otherShipRect.bottom + errorLength
        );
      });

    notOutOfBoard =
      shipRect.left >= boardRect.left - errorLength &&
      shipRect.right <= boardRect.right + errorLength &&
      shipRect.top >= boardRect.top - errorLength &&
      shipRect.bottom <= boardRect.bottom + errorLength;

    if (isValidAndInBoard && notOutOfBoard) {
      ship.element.style.backgroundColor = "var(--border)";
      ship.element.style.border = "1px solid var(--border)";
      return isValidAndInBoard && notOutOfBoard;
    } else {
      ship.element.style.backgroundColor = "var(--invalid)";
      ship.element.style.border = "1px solid var(--invalid-border)";
    }
  }

  function dropUILogic(ship) {
    const shipRect = ship.element.getBoundingClientRect();

    setupCells.forEach((cell) => {
      const rect = cell.getBoundingClientRect();

      if (
        shipRect.top > rect.top &&
        shipRect.top < rect.bottom &&
        shipRect.left > rect.left &&
        shipRect.left < rect.right &&
        isValidMove(ship)
      ) {
        ship.element.style.top = rect.top + "px";
        ship.element.style.left = rect.left + "px";
        ship.element.style.height = rect.height + "px";
        ship.element.style.width =
          rect.width * ship.length + (ship.length - 1) + "px";
        let i = parseInt(cell.id.replace("board-containercell", "")) % 10;
        cell.classList.add("taken");
        ship.posY = [
          Math.floor(parseInt(cell.id.replace("board-containercell", "")) / 10),
        ];
        ship.posX = Array.from(
          { length: ship.length },
          (_, index) => i + index,
        );
        board.placeShip(ship);
      }
    });
  }
  ships.forEach((ship) => {
    let startX,
      startY,
      newX,
      newY = 0;

    rotate(ship);
    ship.element.addEventListener("mousedown", (event) => {
      mouseDown(event);
    });

    function mouseDown(e) {
      startX = e.clientX;
      startY = e.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }

    function mouseMove(e) {
      newX = startX - e.clientX;
      newY = startY - e.clientY;

      startX = e.clientX;
      startY = e.clientY;

      ship.element.style.top = ship.element.offsetTop - newY + "px";
      ship.element.style.left = ship.element.offsetLeft - newX + "px";
    }

    function mouseUp() {
      dropUILogic(ship);
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    }
  });
}
