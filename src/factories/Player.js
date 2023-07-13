const GameBoard = require('../factories/Gameboard');

function Player() {
    var self = {};
    self.gameBoard = GameBoard();
    self.startingNumberOfShips = 5;

    return self;
}

module.exports = Player;
