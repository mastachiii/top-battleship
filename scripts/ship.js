const shipsLength = {
    Carrier: 5,
    Battleship: 4,
    Cruiser: 3,
    Submarine: 3,
    Destroyer: 2,
};

class Ship {
    constructor(ship) {
        this.length = shipsLength[ship];
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        if (this.sunk === false) this.hits++;
    }

    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true;
            return this.sunk;
        } else {
            return false;
        }
    }
}

module.exports = Ship;
