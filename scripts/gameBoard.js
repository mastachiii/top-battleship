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

    placeShip(ship, orientation, x, y) {
        const xInbound = x >= 0 && x < this.board.length;
        const yInbound = y >= 0 && y < this.board[0].length;
        console.log({ xInbound, yInbound })
        return xInbound === true && yInbound === true;
    }
}

module.exports = gameBoard;
