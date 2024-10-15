const gameBoard = require('../scripts/gameBoard');
const testBoard = new gameBoard();

testBoard.populateBoard();
testBoard.placeShip('Carrier', 'Vertical', 0, 0);

test.skip('Board is setup correctly', () => {
    let rows = 0;
    let columns = 0;

    for (let i = 0; i < testBoard.board.length; i++) {
        rows++;

        for (let j = 0; j < testBoard.board[i].length; j++) {
            columns++;
        }
    }

    expect(rows).toEqual(10);
    expect(columns).toEqual(100);
});

test.skip('Board only accepts valid coordinates', () => {
    expect(testBoard.placeShip(999, -1)).toBeFalsy;
    expect(testBoard.placeShip(2, 6)).toBeTruthy;
});

// Orientation === Vertical / Horizontal.
test.skip('Orientation of the ship affects x/y coordinates', () => {
    expect(testBoard.placeShip('Carrier', 'Horizontal', 9, 0)).toBe(false);
    expect(testBoard.placeShip('Carrier', 'Vertical', 9, 7)).toBe(false);
    expect(testBoard.placeShip('Carrier', 'Horizontal', 0, 4)).toBe(true);
    expect(testBoard.placeShip('Carrier', 'Vertical', 9, 2)).toBe(true);
});

test.skip('Blocks the user from placing ships if the coordinates is already occupied', () => {
    expect(testBoard.placeShip('Destroyer', 'Vertical', 0, 3)).toBe(false);
});

test.skip('Only attack on valid coordinates', () => {
    expect(testBoard.recieveAttack(10, 2)).toBe(false);
    expect(testBoard.recieveAttack(9, 4)).toBe(true);
});

test.skip('Blocks the user from attacking the same square', () => {
    testBoard.recieveAttack(0, 0);
    testBoard.recieveAttack(3, 4);

    expect(testBoard.recieveAttack(0, 0)).toBe(false);
    expect(testBoard.recieveAttack(3, 4)).toBe(false);
    expect(testBoard.recieveAttack(2, 6)).toBe(true);
    expect(testBoard.recieveAttack(2, 3)).toBe(true);
});

test.skip('Alerts that all ships are destroyed', () => {
    testBoard.recieveAttack(0, 0);
    testBoard.recieveAttack(0, 1);
    testBoard.recieveAttack(0, 2);
    testBoard.recieveAttack(0, 3);

    //FINAL HIT TO SINK SHIP
    expect(testBoard.recieveAttack(0, 4)).toBeTruthy;
});
