export class Gameboard {
  constructor() {
    this.ships = {
      carrier: "",
      battleship: "",
      cruiser: "",
      submarine: "",
      destroyer: "",
    };
    this.hits = [];
    this.misses = [];
  }

  placeShip(ship) {
    this.ships[ship.name] = ship;
  }
  recieveAttack(posX, posY) {
    for (const ship of Object.values(this.ships).filter((s) => s !== "")) {
      const isHit = ship.posX.includes(posX) && ship.posY.includes(posY);

      if (isHit) {
        ship.hit();
        this.hits.push([posX, posY]);

        if (ship.isSunk()) {
          this.ships[ship.name] = "";
        }

        return;
      }
    }

    this.misses.push([posX, posY]);
  }
  allShipsSunk() {
    return Object.values(this.ships).every((item) => item === "");
  }
  reset() {
    this.ships = {
      carrier: "",
      battleship: "",
      cruiser: "",
      submarine: "",
      destroyer: "",
    };
    this.hits = [];
    this.misses = [];
  }
}
