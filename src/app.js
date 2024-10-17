import './styles/normalize.css';
import './styles/style.css';
import { DOM } from './scripts/dom.js';
import { Player } from './scripts/player.js';

const playerOne = new Player();
const playerTwo = new Player();

playerOne.gameBoard.populateBoard();
playerTwo.gameBoard.populateBoard();

DOM.createPlayerBoard(playerOne.gameBoard, 1);
DOM.createPlayerBoard(playerTwo.gameBoard, 2);

// Attack Pieces
document.addEventListener('click', (e) => {
    const currentTarget = e.target;

    if (!currentTarget.hasAttribute('data-square')) return;

    if (DOM.allPiecesPlaced() === true) {
        let currentEnemy;

        currentEnemy = DOM.currentTurn === 1 ? playerTwo : playerOne;

        DOM.attackEvent(currentTarget, currentEnemy);
        if (currentEnemy.gameBoard.alertAllShipsDestroyed()) alert('YOU WIN');
    }
});

// Place Pieces
document.addEventListener('click', (e) => {
    const currentTarget = e.target;

    if (!currentTarget.hasAttribute('data-square')) return;
    if (DOM.allPiecesPlaced()) return;

    const xAxis = +currentTarget.classList[0].slice(-1);
    const yAxis = +currentTarget.parentElement.classList[0].slice(-1);
    const currentPlayer = DOM.currentPlayer;
    const currentBoard =
        +currentTarget.parentElement.parentElement.getAttribute('data-board');
    let currentPlayerBoard;

    currentPlayerBoard =
        currentPlayer === 1 ? playerOne.gameBoard : playerTwo.gameBoard;

    if (DOM.allPiecesPlaced() === false) {
        if (currentPlayer === 1 && currentBoard === 1) {
            const isShipPlaced = currentPlayerBoard.placeShip(
                DOM.currentPiece,
                DOM.currentOrientation,
                xAxis,
                yAxis
            );

            if (!isShipPlaced) return;

            DOM.clearBoard(currentPlayer);
            DOM.createPlayerBoard(currentPlayerBoard, currentPlayer);
            DOM.playerOnePiecesPlaced += 1;

            DOM.currentPlayer =
                DOM.playerOnePiecesPlaced === 5 ? 2 : DOM.currentPlayer;
        }

        if (currentPlayer === 2 && currentBoard === 2) {
            const isShipPlaced = currentPlayerBoard.placeShip(
                DOM.currentPiece,
                DOM.currentOrientation,
                xAxis,
                yAxis
            );

            if (!isShipPlaced) return;

            DOM.clearBoard(currentPlayer);
            DOM.createPlayerBoard(currentPlayerBoard, currentPlayer);
            DOM.playerTwoPiecesPlaced += 1;
        }
    }
});

// Change Pieces
document.addEventListener('click', (e) => {
    const currentTarget = e.target;

    if (currentTarget.getAttribute('data-value') === 'ship') {
        DOM.currentPiece = currentTarget.textContent;
        console.log(DOM.currentPiece);
    }

    if (currentTarget.getAttribute('data-value') === 'orientation') {
        DOM.currentOrientation = currentTarget.textContent;
        console.log(DOM.currentOrientation);
    }
});
