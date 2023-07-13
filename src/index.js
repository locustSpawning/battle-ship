const GameBoard = require('./factories/Gameboard.js');
const Ship = require('./factories/Ship.js');
const Game = require('./game.js');
const Utilities = require('./utilities.js');

function widthAndHeight(gameboard, container) {
    var b = gameboard.clientWidth;
    var B = container.clientWidth;
    var w = b / B;

    var g = gameboard.clientHeight;
    var G = container.clientHeight;
    var h = g / G;

    document.getElementById('player1-board').style.transform =
        'scale(' + w + ', ' + h + ')';

    document.getElementById('player2-board').style.transform =
        'scale(' + w + ', ' + h + ')';
}

var p2;
var container;
var game;

window.addEventListener('load', (event) => {
    container = document.getElementsByClassName('container');
    const player1Board = document.getElementById('player1-board');
    const player2Board = document.getElementById('player2-board');

    function createDivs(num) {
        // container.style.width = 60 * num + 'px';
        player1Board.style.width = 60 * num + 'px';
        player2Board.style.width = 60 * num + 'px';
        for (var i = 0; i < num * num; i++) {
            const div = document.createElement('div');
            div.classList.add('player-1-box');
            div.id = Utilities.divOrdToId(1, i);
            player1Board.appendChild(div);
        }
        for (var i = 0; i < num * num; i++) {
            const div = document.createElement('div');
            div.classList.add('player-2-box');
            div.id = Utilities.divOrdToId(2, i);
            player2Board.appendChild(div);
        }

        widthAndHeight(player1Board, container);
        widthAndHeight(player2Board, container);
    }

    createDivs(10);

    const beginButton = document.getElementById('begin');
    beginButton.addEventListener('click', handleSubmit);
    p2 = document.getElementById('p2CPU');
});

function checkGameReady() {
    if (game.player1IsReady == true && game.player2IsReady == true) {
        player1Turn();
    }
}

function handleSubmit(e) {
    e.preventDefault();
    container = document.getElementsByClassName('container');
    var readyP1 = document.getElementById('p1-ready-button');
    var readyP2 = document.getElementById('p2-ready-button');
    game = Game();
    game.player1IsReady = false;
    game.player2IsReady = false;
    readyP1.addEventListener('click', (e) => {
        e.stopPropagation();
        game.player1IsReady = true;
        var readyBtn1 = document.getElementById('p1-ready-button');
        readyBtn1.style.visibility = 'hidden';
        readyBtn1.disabled = true;
        checkGameReady();
    });
    readyP2.addEventListener('click', (e) => {
        e.stopPropagation();
        game.player2IsReady = true;
        var readyBtn2 = document.getElementById('p2-ready-button');
        readyBtn2.style.visibility = 'hidden';
        readyBtn2.disabled = true;
        checkGameReady();
    });

    // test set up remove later
    game.player1.gameBoard.placeShip(Ship(3), [1, 2]);
    game.player1.gameBoard.placeShip(Ship(2), [5, 5]);
    game.player2.gameBoard.placeShip(Ship(4), [3, 3]);
    game.player2.gameBoard.placeShip(Ship(5), [1, 5]);

    //game.player1IsReady = true;
    //game.player2IsReady = true;

    if (p2.checked) {
        game.setPlayerIsCPU(game.player2, true);
        game.player2IsReady = true;
        var readyBtn = document.getElementById('p2-ready-button');
        readyBtn.style.visibility = 'hidden';
        readyBtn.disabled = true;
    }
    document.getElementById('settings').style.display = 'none';
    container[0].style.display = 'flex';
    container[1].style.display = 'flex';
}

function colordiv(e) {
    let isP1Turn = game.currentPlayer == game.player1;
    var allBoxesClass;
    var container = document.getElementsByClassName('container');
    var gameOver = document.getElementById('game-over');
    let winner = document.getElementById('winner');
    let playAgainButton = document.getElementById('play-again');

    var coord;
    var color = 'white';
    var successfulMove = true;

    if (game.currentPlayer.isCPU == true) {
        coord = game.doComputerAttack();
    } else {
        if (isP1Turn == true) {
            allBoxesClass = '.player-2-box';
        } else {
            allBoxesClass = '.player-1-box';
        }
        let thisP2Div = e.target.closest(allBoxesClass);
        coord = Utilities.divIdtoCoordinate(game, thisP2Div.id);
    }
    let attackDiv = document.getElementById(
        Utilities.coordinateToDiv(game, game.currentOpponent, coord)
    );

    try {
        if (game.playerAttackCoordinate(coord)) {
            color = 'red';
        }
    } catch (err) {
        successfulMove = false;
    }
    if (successfulMove == true) {
        attackDiv.style.backgroundColor = color;
        if (game.isGameOver() == true) {
            console.log('game is joever');
            var silenceP2Board = document.getElementById('player2-board');
            silenceP2Board.removeEventListener('click', colordiv);

            var silenceP1Board = document.getElementById('player1-board');
            silenceP1Board.addEventListener('click', colordiv);
            game = Game();
            container[0].style.display = 'none';
            container[1].style.display = 'none';
            gameOver.style.display = 'flex';
            if (isP1Turn == true) {
                winner.innerText = 'Player 1 Wins!';
            } else {
                winner.innerText = 'Player 2 Wins!';
            }
            playAgainButton.addEventListener('click', (e) => {
                document.location.reload();
            });
            return;
        }
        game.newTurn();

        if (isP1Turn == true) {
            player2Turn();
        } else {
            player1Turn();
        }
    }
}

function player1Turn() {
    var silenceP1Board = document.getElementById('player1-board');
    silenceP1Board.removeEventListener('click', colordiv);
    if (game.player1.isCPU != true) {
        var silenceP2Board = document.getElementById('player2-board');
        silenceP2Board.addEventListener('click', colordiv);
    } else {
        colordiv();
    }
}

function player2Turn() {
    var silenceP2Board = document.getElementById('player2-board');
    silenceP2Board.removeEventListener('click', colordiv);

    if (game.player2.isCPU != true) {
        var silenceP1Board = document.getElementById('player1-board');
        silenceP1Board.addEventListener('click', colordiv);
    } else {
        colordiv();
    }
}
