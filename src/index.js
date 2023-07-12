const GameBoard = require('./factories/Gameboard.js');
const Ship = require('./factories/Ship.js');
const Game = require('./game-loop.js');

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

var fggfgf;
var container;

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
            div.classList.add('box');
            player1Board.appendChild(div);
        }
        for (var i = 0; i < num * num; i++) {
            const div = document.createElement('div');
            div.classList.add('box');
            player2Board.appendChild(div);
        }

        widthAndHeight(player1Board, container);
        widthAndHeight(player2Board, container);
    }

    createDivs(10);

    const beginButton = document.getElementById('begin');
    beginButton.addEventListener('click', handleSubmit);
    fggfgf = document.getElementById('p2CPU');
});

function handleSubmit(e) {
    container = document.getElementsByClassName('container');
    e.preventDefault();
    var game = Game();
    if (p2.value == 'on') {
        game.setPlayerIsCPU(self.player2, isCPU);
    }
    document.getElementById('settings').style.display = 'none';
    container[0].style.display = 'flex';
    container[1].style.display = 'flex';
}
