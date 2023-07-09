const GameBoard = require('./factories/Gameboard');
const Ship = require('./factories/Ship');
gameBoard = GameBoard();
ship = Ship(3);
gameBoard.placeShip(ship, (8, 3));
gameBoard.shotFired((1, 1));
expect(ship.numberOfHits).toBe(0);
