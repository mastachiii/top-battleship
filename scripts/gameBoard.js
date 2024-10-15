const Ship = require('../scripts/ship');

class gameBoard {
    constructor() {
        this.board = [];
    }

    populateBoard() {
        for (let i = 0; i < 10; i++) {
            const row = [];

            for (let j = 0; j < 10; j++) {
                row.push('W'); // Stands for water :)
            }

            this.board.push(row);
        }
    }

    placeShip(shipType, orientation, x, y) {
        const ship = new Ship(shipType);
        const isValid = validateCoordinates(
            this.board,
            ship.length,
            orientation,
            x,
            y
        );

        if (isValid) {
            for (let i = 0; i < ship.length; i++) {
                if (orientation === 'Horizontal') {
                    this.board[y][x + i] = 'S';
                } else {
                    this.board[y + i][x] = 'S';
                }
            }

            console.log(this.board);
        }
    }
}

function validateCoordinates(board, shipLength, orientation, x, y) {
    let xAxis = x;
    let yAxis = y;

    orientation === 'Horizontal'
        ? (xAxis += shipLength)
        : (yAxis += shipLength);

    const xInbound = xAxis >= 0 && xAxis < board.length;
    const yInbound = yAxis >= 0 && yAxis < board[0].length;

    return xInbound === true && yInbound === true;
}

const testBoard = new gameBoard();

testBoard.populateBoard();

testBoard.placeShip('Carrier', 'Vertical', 0, 0);

module.exports = gameBoard;
