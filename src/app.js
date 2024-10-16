import './styles/normalize.css';
import './styles/style.css';
import { DOM } from './scripts/dom.js';
import { Player } from './scripts/player.js';

const playerOne = new Player();
playerOne.gameBoard.populateBoard();

DOM.createPlayerBoard(playerOne.gameBoard);
