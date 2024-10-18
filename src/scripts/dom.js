import { computer } from './computer';

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
                    square.textContent = gameBoard[i][j].toUpperCase();

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
                    square.textContent = squareText.toUpperCase();

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

        if (this.currentTurn === 1 && currentBoard === 2) {
            if (!currentEnemy.gameBoard.recieveAttack(xAxis, yAxis)) return;
            DOM.clearBoard(2);
            DOM.createPlayerBoard(currentEnemy.gameBoard, 2);
            this.currentTurn = 2;
        }

        if (this.currentTurn === 'COMPUTER') {
            let isHit = false;

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
                this.currentTurn = 1;
            }
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
