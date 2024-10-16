import { Ship } from '../scripts/ship.js';

class Gameboard {
    constructor() {
        this.board = [];
        this.ships = 0;
        this.occupiedSpaces = new Set();
        this.attackedSpaces = new Set();
        this.missedSpaces = new Set();
    }

    populateBoard() {
        for (let i = 0; i < 10; i++) {
            const row = [];

            for (let j = 0; j < 10; j++) {
                row.push('WATER'); // Stands for water :)
            }

            this.board.push(row);
        }
    }

    placeShip(shipType, orientation, x, y) {
        if (this.occupiedSpaces.has(`${y}, ${x}`)) return false;

        const ship = new Ship(shipType);
        const isValid = validateCoordinates(
            this.board,
            ship.length,
            orientation,
            x,
            y
        );

        this[shipType] = ship;

        if (isValid) {
            for (let i = 0; i < ship.length; i++) {
                if (orientation === 'Horizontal') {
                    this.board[y][x + i] = shipType;
                    this.occupiedSpaces.add(`${y}, ${x + i}`);
                } else {
                    this.board[y + i][x] = shipType;
                    this.occupiedSpaces.add(`${y + i}, ${x}`);
                }
            }

            this.ships += 1;
        }
    }

    recieveAttack(x, y) {
        if (this.attackedSpaces.has(`${y}, ${x}`)) return false;
        if (this.missedSpaces.has(`${y}, ${x}`)) return false;

        const isValid = validateCoordinates(this.board, null, null, x, y);

        if (isValid) {
            const currentTarget = this.board[y][x];

            // W === WATER || M === MISSED SHOTS
            if (currentTarget !== 'W') {
                this[currentTarget].hit();
                this.attackedSpaces.add(`${y}, ${x}`);

                this.board[y][x] = 'HIT';

                if (this[currentTarget].isSunk()) this.ships -= 1;
                if (this.ships === 0) return this.alertAllShipsDestroyed();
            } else {
                this.missedSpaces.add(`${y}, ${x}`);
                this.board[y][x] = 'MISS';
            }
        }

        return true;
    }

    alertAllShipsDestroyed() {
        console.log(`ALL SHIPS WRECKED!`);
        return `DESTROYED`;
    }
}

function validateCoordinates(board, shipLength, orientation, x, y) {
    let xAxis = x;
    let yAxis = y;

    if (shipLength && orientation) {
        orientation === 'Horizontal'
            ? (xAxis += shipLength)
            : (yAxis += shipLength);
    }

    const xInbound = xAxis >= 0 && xAxis < board.length;
    const yInbound = yAxis >= 0 && yAxis < board[0].length;

    return xInbound === true && yInbound === true;
}

export { Gameboard };
