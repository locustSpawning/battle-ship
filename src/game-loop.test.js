const GameBoard = require('../factories/Gameboard');
const Ship = require('../factories/Ship');
const Player = require('../factories/Player');
const computerPlayer = require('../factories/Player');

test('new game', () => {
    game = loadGame();
    expect(game.numberOfPlayers()).toBe(0);
    player1 = Player();
    player2 = computerPlayer();
    expect(game.numberOfPlayers()).toBe(2);
    gameboardP1 = generateGameBoard();
    gameboardP2 = generateGameBoard();
    expect(game.numberofBoards).toBe(2);
    expect(gameboardP1.size).toBe([10, 10]);
});
