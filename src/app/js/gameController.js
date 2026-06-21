export class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  playTurn() {
    this.player1.turn = true;
    this.player2.turn = false;
  }

  switchTurn() {
    this.player1.turn = !this.player1.turn;
    this.player2.turn = !this.player1.turn;
  }
}
