const GameBoard = require('../factories/Gameboard');

function Player() {
    var self = {};
    self.gameBoard = new GameBoard();
    self.startingNumberOfShips = 5;

    return self;
}

module.exports = Player;
