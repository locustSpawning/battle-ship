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
            div.addEventListener('click', colordiv);
            player1Board.appendChild(div);
        }
        for (var i = 0; i < num * num; i++) {
            const div = document.createElement('div');
            div.classList.add('player-2-box');
            div.id = Utilities.divOrdToId(2, i);
            div.addEventListener('click', colordiv);
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
        console.log('cocks');
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
    readyP1.addEventListener('click', () => {
        game.player1IsReady = true;
        var readyBtn1 = document.getElementById('p1-ready-button');
        readyBtn1.style.visibility = 'hidden';
        readyBtn1.disabled = true;
        checkGameReady();
    });
    readyP2.addEventListener('click', () => {
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
    let thisDiv = e.target.closest('.box');
    console.log(thisDiv);
    thisDiv.style.backgroundColor = 'white';
}

// stopped here  - - - bug where boards dissapear
// function player1Turn() {
//     var silenceP1Board = document.getElementById('player1-board');
//     console.log(silenceP1Board);
//     silenceP1Board.removeEventListener('click', colordiv);
//     document
//         .getElementById('player2-board')
//         .addEventListener('click', colordiv);
// }

// function player2Turn() {
//     var silenceP2Board = document.getElementById('player2-board');
//     silenceP2Board.removeEventListener('click', colordiv);
//     document
//         .getElementById('player1-board')
//         .addEventListener('click', colordiv);
// }
