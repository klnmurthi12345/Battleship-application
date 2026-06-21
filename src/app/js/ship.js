export class Ship {
  constructor(name, length, element) {
    this.name = name;
    this.element = document.querySelector(element);
    this.length = length;
    this.hits = 0;
    this.posX = [];
    this.posY = [];
    this.orientation = "horizontal";
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
