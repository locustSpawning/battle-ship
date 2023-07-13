const GameBoard = require('./factories/Gameboard');
const Ship = require('./factories/Ship');
const Player = require('./factories/Player');
const computerPlayer = require('./factories/Player');

function Game() {
    var self = {};
    self.player1 = Player();
    self.player2 = Player();

    self.currentPlayer = self.player1;
    self.currentOpponent = self.player2;

    self.playerAttackCoordinate = (coordinate) => {
        return self.currentOpponent.gameBoard.shotFired(coordinate);
    };

    self.isGameOver = () => {
        if (self.currentOpponent.gameBoard.allShipsSunk() == true) {
            return true;
        }
        return false;
    };

    self.newTurn = () => {
        var nextPlayer = self.currentOpponent;
        self.currentOpponent = self.currentPlayer;
        self.currentPlayer = nextPlayer;
    };

    self.doComputerAttack = () => {
        let gameBoard = self.currentOpponent.gameBoard;
        var randCoordinate;
        while (true) {
            randCoordinate = [
                Math.floor(Math.random() * gameBoard.size[0]),
                Math.floor(Math.random() * gameBoard.size[1]),
            ];
            if (gameBoard.isCoordinateOpen(randCoordinate)) {
                break;
            }
        }

        //self.playerAttackCoordinate(randCoordinate);
        return randCoordinate;
    };

    self.setPlayerIsCPU = (player, isCPU) => {
        player.isCPU = isCPU;
    };
    return self;
}

module.exports = Game;
