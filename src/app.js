import './styles/normalize.css';
import './styles/style.css';
import { DOM } from './scripts/dom.js';
import { Player } from './scripts/player.js';
import { shipsLength } from './scripts/ship.js';

const playerOne = new Player();
const playerTwo = new Player();

playerOne.gameBoard.populateBoard();
playerTwo.gameBoard.populateBoard();

DOM.createPlayerBoard(playerOne.gameBoard, 3);
playerTwo.gameBoard.placeShipRandomly();

// Start Game
document.addEventListener('click', (e) => {
    const currentTarget = e.target;
    const shipStagingScreen = document.querySelector('.ship-staging-screen');

    if (currentTarget.textContent === 'START') {
        shipStagingScreen.showModal();
        shipStagingScreen.style.display = 'flex';
    }
});

document.addEventListener('click', (e) => {
    const currentTarget = e.target;
    const shipStagingScreen = document.querySelector('.ship-staging-screen');
    const main = document.querySelector('main');

    if (
        currentTarget.getAttribute('data-function') === 'start-game' &&
        DOM.playerOnePiecesPlaced === 5
    ) {
        shipStagingScreen.close();
        shipStagingScreen.style.display = 'none';
        main.style.display = 'flex';
        DOM.nodes.introScreen.style.display = 'none';
        DOM.createPlayerBoard(playerOne.gameBoard, 1);
        DOM.createPlayerBoard(playerTwo.gameBoard, 2);
    }
});

// Attack Pieces
document.addEventListener('click', (e) => {
    const currentTarget = e.target;

    if (DOM.currentTurn === 'COMPUTER') return;
    if (!currentTarget.hasAttribute('data-square')) return;

    const currentBoard =
        +currentTarget.parentElement.parentElement.getAttribute('data-board');

    if (DOM.currentTurn === currentBoard) return;

    currentTarget.classList.remove('active');

    if (DOM.allPiecesPlaced() === true) {
        let currentEnemy;
        const xAxis = Math.floor(Math.random() * 10);
        const yAxis = Math.floor(Math.random() * 10);

        currentEnemy = DOM.currentTurn === 1 ? playerTwo : playerOne;

        DOM.attackEvent(currentTarget, currentEnemy);

        if (currentEnemy.gameBoard.alertAllShipsDestroyed()) {
            DOM.nodes.playerVictoryScreen.showModal();
            DOM.nodes.playerVictoryScreen.style.display = 'flex';
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        }

        if (DOM.currentTurn === 'COMPUTER') {
            setTimeout(() => {
                DOM.attackEvent(currentTarget, playerOne, xAxis, yAxis);
            }, 1000);
        }
    }
});

// Place Pieces
document.addEventListener('click', (e) => {
    const currentTarget = e.target;

    if (!currentTarget.hasAttribute('data-square')) return;
    if (DOM.allPiecesPlaced()) return;

    currentTarget.classList.remove('active');

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

            DOM.clearBoard(3);
            DOM.createPlayerBoard(currentPlayerBoard, 3);
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
    }

    if (currentTarget.getAttribute('data-value') === 'orientation') {
        DOM.currentOrientation =
            DOM.currentOrientation === 'Horizontal' ? 'Vertical' : 'Horizontal';
    }
});

// Highlight Squares
document.addEventListener('mouseover', (e) => {
    const currentSquare = e.target;
    const isSquare = currentSquare.getAttribute('data-square');

    if (isSquare) {
        const isStagingBoard =
            currentSquare.parentElement.parentElement.classList.contains(
                'player-staging-board'
            );
        let row = +currentSquare.parentElement.classList[0].slice(-1);
        let column = +currentSquare.classList[0].slice(-1);

        if (isStagingBoard) {
            for (let i = 0; i < shipsLength[DOM.currentPiece]; i++) {
                const currentSquare = document.querySelector(
                    `.row-${row} > .square-${column}`
                );

                if (!currentSquare) break;

                currentSquare.classList.add('active');

                switch (DOM.currentOrientation) {
                    case 'Horizontal':
                        column += 1;
                        break;

                    case 'Vertical':
                        row += 1;
                }
            }
        } else {
            currentSquare.classList.add('active');
        }
    }
});

document.addEventListener('mouseout', (e) => {
    const currentSquare = e.target;
    const isSquare = currentSquare.getAttribute('data-square');

    if (isSquare) {
        const isStagingBoard =
            currentSquare.parentElement.parentElement.classList.contains(
                'player-staging-board'
            );
        let row = +currentSquare.parentElement.classList[0].slice(-1);
        let column = +currentSquare.classList[0].slice(-1);

        if (isStagingBoard) {
            for (let i = 0; i < shipsLength[DOM.currentPiece]; i++) {
                const currentSquare = document.querySelector(
                    `.row-${row} > .square-${column}`
                );

                if (!currentSquare) break;

                currentSquare.classList.remove('active');

                switch (DOM.currentOrientation) {
                    case 'Horizontal':
                        column += 1;
                        break;

                    case 'Vertical':
                        row += 1;
                }
            }
        } else {
            currentSquare.classList.remove('active');
        }
    }
});
