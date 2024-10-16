import './styles/normalize.css';
import './styles/style.css';
import { DOM } from './scripts/dom.js';
import { Player } from './scripts/player.js';

const playerOne = new Player();
playerOne.gameBoard.populateBoard();
playerOne.gameBoard.placeShip('Carrier', 'Vertical', 2, 0);
playerOne.gameBoard.placeShip('Battleship', 'Vertical', 9, 0);
playerOne.gameBoard.placeShip('Cruiser', 'Horizontal', 5, 9);
playerOne.gameBoard.placeShip('Submarine', 'Horizontal', 6, 4);
playerOne.gameBoard.placeShip('Destroyer', 'Vertical', 9, 8);

DOM.createPlayerBoard(playerOne.gameBoard);

DOM.clearBoard();
playerOne.gameBoard.recieveAttack(0, 0);
playerOne.gameBoard.recieveAttack(2, 0);
playerOne.gameBoard.recieveAttack(5, 9);

DOM.createPlayerBoard(playerOne.gameBoard);
