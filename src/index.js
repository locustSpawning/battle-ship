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

var p2;
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
    p2 = document.getElementById('p2CPU');
});

function handleSubmit(e) {
    e.preventDefault();
    container = document.getElementsByClassName('container');
    const player2Board = document.getElementById('player2-board');

    var game = new Game();
    console.log(p2);
    console.log(p2.value);
    if (p2.value == 'on') {
        game.setPlayerIsCPU(player2Board, true);
        console.log('p2 is cpu');
        var readyBtn = document.getElementById('p2-ready-button');
        readyBtn.style.visibility = 'hidden';
        readyBtn.disabled = true;
    }
    document.getElementById('settings').style.display = 'none';
    container[0].style.display = 'flex';
    container[1].style.display = 'flex';
}
