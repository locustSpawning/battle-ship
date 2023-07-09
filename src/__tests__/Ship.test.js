const ShipImport = require('../factories/Ship');

test('create ship', () => {
    testShip = ShipImport(3);
    expect(testShip.length).toBe(3);
    expect(testShip.isSunk()).toBe(false);
    expect(testShip.numberOfHits).toBe(0);
});

test('test hit', () => {
    testShip = ShipImport(3);
    expect(testShip.numberOfHits).toBe(0);
    testShip.hit();
    expect(testShip.numberOfHits).toBe(1);
});

test('test sunk', () => {
    testShip = ShipImport(3);
    expect(testShip.isSunk()).toBe(false);
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
});
