const GameBoard = require('../factories/Gameboard');
const Ship = require('../factories/Ship');
const Player = require('../factories/Player');

test('create player', () => {
    player = Player();
    expect(player.startingNumberOfShips).toBe(5);
});
