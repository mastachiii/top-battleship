const Ship = require('../scripts/ship');

test.skip('Hit function is working properly.', () => {
    const carrier = new Ship(5);

    carrier.hit();

    expect(carrier.hits).toBe(1);
});

test.skip('Check if the ship has sunk', () => {
    const patrolBoat = new Ship(2);

    for (let i = 0; i < 2; i++) patrolBoat.hit();

    expect(patrolBoat.isSunk()).toBe(true);
});
