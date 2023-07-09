const GameBoard = require('../factories/Gameboard');
const Ship = require('../factories/Ship');

test('create game board', () => {});

test('place ship', () => {
    gameBoard = GameBoard();
    ship = Ship();
    expect(gameBoard.numberOfShips()).toBe(0);
    gameBoard.placeShip(ship, [12, 14]);
    expect(gameBoard.numberOfShips()).toBe(1);
    expect(gameBoard.shipCoordinate(ship)).toEqual([12, 14]);

    ship = Ship();
    gameBoard.placeShip(ship, [8, 3]);
    expect(gameBoard.numberOfShips()).toBe(2);
    expect(gameBoard.shipCoordinate(ship)).toEqual([8, 3]);
});

test('test attack hit', () => {
    gameBoard = GameBoard();
    ship = Ship(3);
    gameBoard.placeShip(ship, [8, 3]);
    gameBoard.shotFired([8, 3]);
    expect(ship.numberOfHits).toBe(1);

    gameBoard.shotFired([9, 3]);
    expect(ship.numberOfHits).toBe(2);
});

test('test attack miss', () => {
    gameBoard = GameBoard();
    ship = Ship(3);
    gameBoard.placeShip(ship, [8, 3]);
    gameBoard.shotFired([1, 1]);
    expect(ship.numberOfHits).toBe(0);
});

test('gameboard tracks attacks', () => {
    gameBoard = GameBoard();
    gameBoard.shotFired([1, 2]);
    expect(() => {
        gameBoard.shotFired([1, 2]);
    }).toThrow('Already Fired Here');

    ship = Ship(3);
    gameBoard.placeShip(ship, [8, 3]);
    gameBoard.shotFired([8, 3]);
    expect(() => {
        gameBoard.shotFired([8, 3]);
    }).toThrow('Already Fired Here');
});

test('all ships sunk', () => {
    gameBoard = GameBoard();
    ship = Ship(1);
    gameBoard.placeShip(ship, [1, 1]);
    expect(gameBoard.allShipsSunk()).toBe(false);
    gameBoard.shotFired([1, 1]);
    expect(gameBoard.allShipsSunk()).toBe(true);
});
