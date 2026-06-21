export class Player {
  constructor() {
    this.score = 0;
    this.turn = false;
  }

  attack(posX, posY, gameboard) {
    if (
      gameboard.hits.some(([x, y]) => x === posX && y === posY) ||
      gameboard.misses.some(([x, y]) => x === posX && y === posY)
    ) {
      return "already attacked there";
    } else {
      let previous = gameboard.hits.length;
      gameboard.recieveAttack(posX, posY);
      if (gameboard.hits.length > previous) {
        this.score++;
      }
    }
  }
}

export class Computer {
  constructor() {
    this.score = 0;
    this.turn = false;
  }

  randomAttack(gameboard) {
    while (true) {
      const posX = Math.floor(Math.random() * 10);
      const posY = Math.floor(Math.random() * 10);

      const alreadyAttacked =
        gameboard.hits.some(([x, y]) => x === posX && y === posY) ||
        gameboard.misses.some(([x, y]) => x === posX && y === posY);

      if (!alreadyAttacked) {
        let previous = gameboard.hits.length;
        gameboard.recieveAttack(posX, posY);
        if (gameboard.hits.length > previous) {
          this.score++;
        }
        break;
      }
    }
  }
}
