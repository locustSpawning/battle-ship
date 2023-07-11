const GameBoard = require('../factories/Gameboard');
const Ship = require('../factories/Ship');
const Player = require('../factories/Player');
const computerPlayer = require('../factories/Player');

window.addEventListener('load', (event) => {
    const beginButton = document.getElementById('begin');
    beginButton.addEventListener('click', handleSubmit);
    const p2 = document.querySelector('input[name="p2-buttons"]:checked').value;
});

function handleSubmit(e) {
    e.preventDefault();
    game = Game();
    if (p2 == 'p2CPU') {
        game.setPlayerIsCPU(self.player2, isCPU);
    }
}

function Game() {
    var self = {};
    self.player1 = new Player();
    self.player2 = new Player();

    self.currentPlayer = null;
    self.currentOpponent = null;

    self.playerAttackCoordinate = (coordinate) => {
        self.currentOpponent.GameBoard.shotFired(coordinate);
    };

    self.isGameOver = () => {
        if (self.currentOpponent.allShipsSunk() == true) {
            return true;
        }
        return false;
    };

    self.newTurn = () => {
        nextPlayer = currentOpponent;
        self.currentOpponent = self.currentPlayer;
        self.currentPlayer = nextPlayer;
    };

    self.doComputerAttack = () => {
        while (true) {
            randCoordinate = [
                Math.floor(Math.random() * self.GameBoard.size[0]),
                Math.floor(Math.random() * self.GameBoard.size[1]),
            ];
            if (
                self.currentOpponent.GameBoard.isCoordinateOpen(randCoordinate)
            ) {
                break;
            }
        }

        self.playerAttackCoordinate(randCoordinate);
    };

    self.setPlayerIsCPU = (player, isCPU) => {
        player.isCPU = isCPU;
    };
}
