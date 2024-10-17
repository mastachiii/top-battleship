import { Player } from './player';

const DOM = {
    currentTurn: 1,
    currentPlayer: 1,
    currentPiece: 'Submarine',
    currentOrientation: 'Horizontal',
    playerOnePiecesPlaced: 0,
    playerTwoPiecesPlaced: 0,

    nodes: {
        playerOneBoard: document.querySelector('.player-one-board'),
        playerTwoBoard: document.querySelector('.player-two-board'),
    },

    createPlayerBoard(playerGameBoard, currentPlayer) {
        const gameBoard = playerGameBoard.board;

        let gameBoardDiv;

        gameBoardDiv =
            currentPlayer === 1
                ? this.nodes.playerOneBoard
                : this.nodes.playerTwoBoard;

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
    },

    clearBoard(boardNumber) {
        if (boardNumber === 1) {
            [...this.nodes.playerOneBoard.children].forEach((child) => {
                this.nodes.playerOneBoard.removeChild(child);
            });
        } else {
            [...this.nodes.playerTwoBoard.children].forEach((child) => {
                this.nodes.playerTwoBoard.removeChild(child);
            });
        }
    },

    attackEvent(currentSquare, currentEnemy) {
        const xAxis = currentSquare.classList[0].slice(-1);
        const yAxis = currentSquare.parentElement.classList[0].slice(-1);
        const currentBoard =
            +currentSquare.parentElement.parentElement.getAttribute(
                'data-board'
            );

        if (this.currentTurn === 1 && currentBoard === 2) {
            currentEnemy.gameBoard.recieveAttack(xAxis, yAxis);
            DOM.clearBoard(2);
            DOM.createPlayerBoard(currentEnemy.gameBoard, 2);
            this.currentTurn = 2;
        }

        if (this.currentTurn === 2 && currentBoard === 1) {
            currentEnemy.gameBoard.recieveAttack(xAxis, yAxis);
            DOM.clearBoard(1);
            DOM.createPlayerBoard(currentEnemy.gameBoard, 1);
            this.currentTurn = 1;
        }
    },

    placePieces(xAxis, yAxis, callback) {
        if (this.currentPlayer === 1) {
            this.playerOnePiecesPlaced += 1;
            callback(this.currentPiece, this.currentOrientation, xAxis, yAxis);
        }
    },

    allPiecesPlaced() {
        return (
            this.playerOnePiecesPlaced === 5 && this.playerTwoPiecesPlaced === 5
        );
    },
};

export { DOM };
