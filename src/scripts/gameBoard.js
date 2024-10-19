import { Ship } from '../scripts/ship.js';
import { computer } from './computer.js';

class Gameboard {
    constructor() {
        this.board = [];
        this.ships = 0;
        this.occupiedSpaces = new Set();
        this.attackedSpaces = new Set();
        this.missedSpaces = new Set();
        this.shipsPlaced = new Set();
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
        if (this.shipsPlaced.has(shipType)) return false;

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
            //HEAD FIRST CHECK
            for (let i = 0; i < ship.length; i++) {
                if (orientation === 'Horizontal') {
                    if (this.occupiedSpaces.has(`${y}, ${x + i}`)) return false;
                } else {
                    if (this.occupiedSpaces.has(`${y + i}, ${x}`)) return false;
                }
            }

            for (let i = 0; i < ship.length; i++) {
                if (orientation === 'Horizontal') {
                    this.board[y][x + i] = shipType;
                    this.occupiedSpaces.add(`${y}, ${x + i}`);
                    this.shipsPlaced.add(shipType);
                } else {
                    this.board[y + i][x] = shipType;
                    this.occupiedSpaces.add(`${y + i}, ${x}`);
                    this.shipsPlaced.add(shipType);
                }
            }

            this.ships += 1;
        }

        if (isValid === false) return false;

        return true;
    }

    recieveAttack(x, y, isComputer) {
        if (this.attackedSpaces.has(`${y}, ${x}`)) return false;
        if (this.missedSpaces.has(`${y}, ${x}`)) return false;

        const isValid = validateCoordinates(this.board, null, null, x, y);

        if (isValid === false) {
            return false;
        } else {
            const currentTarget = this.board[y][x];

            // W === WATER || M === MISSED SHOTS
            if (currentTarget !== 'WATER') {
                this[currentTarget].hit();
                this.attackedSpaces.add(`${y}, ${x}`);

                this.board[y][x] = 'HIT';

                if (isComputer) {
                    computer.hitQueue.push([x - 1, y]);
                    computer.hitQueue.push([x, y - 1]);
                    computer.hitQueue.push([x + 1, y]);
                    computer.hitQueue.push([x, y + 1]);
                }
                if (this[currentTarget].isSunk()) this.ships -= 1;
                if (this.ships === 0) return this.alertAllShipsDestroyed();

                return 'HIT';
            } else {
                this.missedSpaces.add(`${y}, ${x}`);
                this.board[y][x] = 'MISS';
            }
        }

        return true;
    }

    alertAllShipsDestroyed() {
        return this.ships === 0;
    }

    placeShipRandomly() {
        const ships = [
            'Carrier',
            'Battleship',
            'Cruiser',
            'Submarine',
            'Destroyer',
        ];
        const orientation = ['Horizontal', 'Vertical'];

        for (let ship of ships) {
            let isPlaced = false;

            while (isPlaced === false) {
                const xAxis = Math.floor(Math.random() * 10);
                const yAxis = Math.floor(Math.random() * 10);
                const randomOrientation =
                    orientation[Math.floor(Math.random() * 2)];

                isPlaced = this.placeShip(
                    ship,
                    randomOrientation,
                    xAxis,
                    yAxis
                );
            }
        }
    }

    attackShipComputer(enemyGameBoard) {
        const xAxis = Math.floor(Math.random() * 10);
        const yAxis = Math.floor(Math.random() * 10);

        enemyGameBoard.recieveAttack(xAxis, yAxis);
    }
}

function validateCoordinates(board, shipLength, orientation, x, y) {
    let xAxis = x;
    let yAxis = y;

    if (shipLength && orientation) {
        orientation === 'Horizontal'
            ? (xAxis += shipLength - 1)
            : (yAxis += shipLength - 1); // Subtract the ship length by one since, we're already alloting one square in this function call.
    }

    const xInbound = xAxis >= 0 && xAxis < board.length;
    const yInbound = yAxis >= 0 && yAxis < board.length;

    return xInbound === true && yInbound === true;
}

export { Gameboard };
