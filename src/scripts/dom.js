import { computer } from './computer';
import cross from '../assets/images/cross.svg';

const DOM = {
    currentTurn: 1,
    currentPlayer: 1,
    currentPiece: 'Submarine',
    currentOrientation: 'Horizontal',
    playerOnePiecesPlaced: 0,
    playerTwoPiecesPlaced: 0,
    hitList: [],

    nodes: {
        playerOneBoard: document.querySelector('.player-one-board'),
        playerTwoBoard: document.querySelector('.player-two-board'),
        playerStagingBoard: document.querySelector('.player-staging-board'),
        introScreen: document.querySelector('.intro-screen'),
        playerVictoryScreen: document.querySelector('.player-victory-screen'),
        enemyVictoryScreen: document.querySelector('.enemy-victory-screen')
    },

    createPlayerBoard(playerGameBoard, currentPlayer) {
        const gameBoard = playerGameBoard.board;

        let gameBoardDiv;

        switch (currentPlayer) {
            case 1:
                gameBoardDiv = this.nodes.playerOneBoard;
                break;

            case 2:
                gameBoardDiv = this.nodes.playerTwoBoard;
                break;

            default:
                gameBoardDiv = this.nodes.playerStagingBoard;
        }

        if (currentPlayer === 1 || currentPlayer === 3) {
            for (let i = 0; i < 10; i++) {
                const row = document.createElement('div');
                row.classList.add(`row-${i}`);

                for (let j = 0; j < 10; j++) {
                    const square = document.createElement('div');

                    square.classList.add(`square-${j}`);
                    square.classList.add(`${gameBoard[i][j].toLowerCase()}`);
                    square.setAttribute('data-square', j);

                    row.append(square);
                }

                gameBoardDiv.append(row);
            }
        } else {
            for (let i = 0; i < 10; i++) {
                const row = document.createElement('div');
                row.classList.add(`row-${i}`);

                for (let j = 0; j < 10; j++) {
                    const square = document.createElement('div');
                    let squareText = gameBoard[i][j];

                    switch (squareText) {
                        case 'HIT':
                        case 'MISS':
                            break;

                        default:
                            squareText = 'WATER';
                    }

                    square.classList.add(`square-${j}`);
                    square.classList.add(`${squareText.toLowerCase()}`);
                    square.setAttribute('data-square', j);

                    row.append(square);
                }

                gameBoardDiv.append(row);
            }
        }
    },

    clearBoard(boardNumber) {
        if (boardNumber === 1) {
            [...this.nodes.playerOneBoard.children].forEach((child) => {
                this.nodes.playerOneBoard.removeChild(child);
            });
        } else if (boardNumber === 2) {
            [...this.nodes.playerTwoBoard.children].forEach((child) => {
                this.nodes.playerTwoBoard.removeChild(child);
            });
        } else {
            [...this.nodes.playerStagingBoard.children].forEach((child) => {
                this.nodes.playerStagingBoard.removeChild(child);
            });
        }
    },

    attackEvent(currentSquare, currentEnemy, x, y) {
        const xAxis = currentSquare.classList[0].slice(-1);
        const yAxis = currentSquare.parentElement.classList[0].slice(-1);
        const currentBoard =
            currentSquare.parentElement.parentElement !== null
                ? +currentSquare.parentElement.parentElement.getAttribute(
                    'data-board'
                )
                : null;

        if (this.currentTurn === 'COMPUTER') {
            let isHit = false;

            console.log(true);

            while (isHit === false) {
                let randomXAxis = Math.floor(Math.random() * 10);
                let randomYAxis = Math.floor(Math.random() * 10);

                if (computer.isHitQueueEmpty() === false) {
                    const coordinates = computer.getItemFromQueue();

                    randomXAxis = coordinates[0];
                    randomYAxis = coordinates[1];
                }

                isHit = currentEnemy.gameBoard.recieveAttack(
                    randomXAxis,
                    randomYAxis,
                    true
                );

                DOM.clearBoard(1);
                DOM.createPlayerBoard(currentEnemy.gameBoard, 1);
            }

            switch (isHit) {
                case 'SUNK':
                    const shipLife = document.querySelector(
                        `.ship-life-${currentEnemy.gameBoard.ships + 1}`
                    );

                    shipLife.src = cross;
                case 'HIT':
                    this.currentTurn = 'COMPUTER';

                    setTimeout(() => {
                        console.log(true);
                        this.attackEvent(currentSquare, currentEnemy, x, y);

                        if (currentEnemy.gameBoard.alertAllShipsDestroyed()) {
                            DOM.nodes.enemyVictoryScreen.showModal();
                            DOM.nodes.enemyVictoryScreen.style.display = 'flex';
                            setTimeout(() => {
                                window.location.reload();
                            }, 5000)
                        }
                    }, 1000);

                    break;

                case 'MISS':
                    this.currentTurn = 1;
            }
        }

        if (this.currentTurn === 1 && currentBoard === 2) {
            if (this.currentTurn === 'COMPUTER') return;

            let isHit = currentEnemy.gameBoard.recieveAttack(xAxis, yAxis);

            if (!isHit) return;

            DOM.clearBoard(2);
            DOM.createPlayerBoard(currentEnemy.gameBoard, 2);
            this.currentTurn = 'COMPUTER';

            if (isHit === 'SUNK') {
                const shipLife = document.querySelector(
                    `.ship-life-enemy-${currentEnemy.gameBoard.ships + 1}`
                );

                shipLife.src = cross;
            }

            if (isHit === 'HIT' || isHit === 'SUNK') this.currentTurn = 1;
        }
    },

    placePieces(xAxis, yAxis, callback) {
        if (this.currentPlayer === 1) {
            this.playerOnePiecesPlaced += 1;
            callback(this.currentPiece, this.currentOrientation, xAxis, yAxis);
        }
    },

    allPiecesPlaced() {
        return this.playerOnePiecesPlaced === 5;
    },
};

export { DOM };
