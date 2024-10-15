class Ship {
    constructor(length) {
        this.length = length;
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
