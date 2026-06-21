import "./styles.css";
import { enableEvents } from "./app/ui/events.js";
import { dragdrop } from "./app/ui/dragdrop.js";
import { Ship } from "./app/js/ship.js";
import { Gameboard } from "./app/js/gameBoard.js";
import { Player } from "./app/js/player.js";
import { Computer } from "./app/js/player.js";
import { Game } from "./app/js/gameController.js";

//player ships
const playerCarrier = new Ship("carrier", 5, "#carrier");
const playerBattleShip = new Ship("battleship", 4, "#battleship");
const playerCruiser = new Ship("cruiser", 3, "#cruiser");
const playerSubmarine = new Ship("submarine", 3, "#submarine");
const playerDestroyer = new Ship("destroyer", 2, "#destroyer");

const playerShips = [
  playerCarrier,
  playerBattleShip,
  playerCruiser,
  playerSubmarine,
  playerDestroyer,
];

//computer ships
const CompCarrier = new Ship("carrier", 5);
const CompBattleShip = new Ship("battleship", 4);
const CompCruiser = new Ship("cruiser", 3);
const CompSubmarine = new Ship("submarine", 3);
const CompDestroyer = new Ship("destroyer", 2);

const compShips = [
  CompCarrier,
  CompBattleShip,
  CompCruiser,
  CompSubmarine,
  CompDestroyer,
];

//player board
const board = new Gameboard();

//computer board
const compBoard = new Gameboard();

//player
const player = new Player();

//computer
const computer = new Computer();

// Game
const game = new Game(player, computer);

enableEvents(board, playerShips, compBoard, compShips, player, computer, game);
dragdrop(board, playerShips);

// nothing wrong with board object problem is hit and miss mechanism
