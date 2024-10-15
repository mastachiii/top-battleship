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

    placeShip() {
        return null;
    }
}

module.exports = gameBoard;
