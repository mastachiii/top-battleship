const Ship = require('../scripts/ship');

test('Hit function is working properly.', () => {
    const carrier = new Ship(5);

    carrier.hit();

    expect(carrier.hits).toBe(1);
});
