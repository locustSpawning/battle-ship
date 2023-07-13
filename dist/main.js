/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factories/Gameboard.js":
/*!************************************!*\
  !*** ./src/factories/Gameboard.js ***!
  \************************************/
/***/ ((module) => {

eval("function GameBoard() {\n    var self = {};\n    self.size = [10, 10];\n    self.attackedCoords = new Set();\n    self.ships = new Set();\n\n    self.numberOfShips = () => {\n        return self.ships.size;\n    };\n\n    self.placeShip = (ship, coordinate) => {\n        self.ships.add(ship);\n        ship.coordinate = coordinate;\n    };\n\n    self.shipCoordinate = (ship) => {\n        return ship.coordinate;\n    };\n\n    self.isCoordinateOpen = (coordinate) => {\n        if (self.attackedCoords.has(coordinate.toString())) {\n            return false;\n        } else {\n            return true;\n        }\n    };\n\n    self.shotFired = (coordinate) => {\n        if (self.isCoordinateOpen(coordinate) == true) {\n            self.attackedCoords.add(coordinate.toString());\n        } else {\n            throw new Error('Already Fired Here');\n        }\n        for (const ship of self.ships.keys()) {\n            if (ship.occupiesCoordinate(coordinate) == true) {\n                ship.hit();\n                return true;\n            }\n        }\n        return false;\n    };\n\n    self.allShipsSunk = () => {\n        for (const ship of self.ships.keys()) {\n            if (ship.isSunk() != true) {\n                return false;\n            }\n        }\n        return true;\n    };\n\n    return self;\n}\n\nmodule.exports = GameBoard;\n\n\n//# sourceURL=webpack://battle-ship/./src/factories/Gameboard.js?");

/***/ }),

/***/ "./src/factories/Player.js":
/*!*********************************!*\
  !*** ./src/factories/Player.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameBoard = __webpack_require__(/*! ../factories/Gameboard */ \"./src/factories/Gameboard.js\");\n\nfunction Player() {\n    var self = {};\n    self.gameBoard = GameBoard();\n    self.startingNumberOfShips = 5;\n\n    return self;\n}\n\nmodule.exports = Player;\n\n\n//# sourceURL=webpack://battle-ship/./src/factories/Player.js?");

/***/ }),

/***/ "./src/factories/Ship.js":
/*!*******************************!*\
  !*** ./src/factories/Ship.js ***!
  \*******************************/
/***/ ((module) => {

eval("function Ship(length) {\n    var self = {};\n    self.length = length;\n    self.numberOfHits = 0;\n\n    self.hit = () => {\n        self.numberOfHits += 1;\n    };\n\n    self.isSunk = () => {\n        return self.numberOfHits === self.length;\n    };\n\n    self.occupiesCoordinate = (coordinate) => {\n        if (coordinate[1] != self.coordinate[1]) {\n            return false;\n        }\n        if (coordinate[0] < self.coordinate[0]) {\n            return false;\n        }\n        if (coordinate[0] >= self.coordinate[0] + self.length) {\n            return false;\n        }\n        return true;\n    };\n\n    return self;\n}\n\nmodule.exports = Ship;\n\n\n//# sourceURL=webpack://battle-ship/./src/factories/Ship.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameBoard = __webpack_require__(/*! ./factories/Gameboard */ \"./src/factories/Gameboard.js\");\nconst Ship = __webpack_require__(/*! ./factories/Ship */ \"./src/factories/Ship.js\");\nconst Player = __webpack_require__(/*! ./factories/Player */ \"./src/factories/Player.js\");\nconst computerPlayer = __webpack_require__(/*! ./factories/Player */ \"./src/factories/Player.js\");\n\nfunction Game() {\n    var self = {};\n    self.player1 = Player();\n    self.player2 = Player();\n\n    self.currentPlayer = self.player1;\n    self.currentOpponent = self.player2;\n\n    self.playerAttackCoordinate = (coordinate) => {\n        return self.currentOpponent.gameBoard.shotFired(coordinate);\n    };\n\n    self.isGameOver = () => {\n        if (self.currentOpponent.gameBoard.allShipsSunk() == true) {\n            return true;\n        }\n        return false;\n    };\n\n    self.newTurn = () => {\n        var nextPlayer = self.currentOpponent;\n        self.currentOpponent = self.currentPlayer;\n        self.currentPlayer = nextPlayer;\n    };\n\n    self.doComputerAttack = () => {\n        let gameBoard = self.currentOpponent.gameBoard;\n        var randCoordinate;\n        while (true) {\n            randCoordinate = [\n                Math.floor(Math.random() * gameBoard.size[0]),\n                Math.floor(Math.random() * gameBoard.size[1]),\n            ];\n            if (gameBoard.isCoordinateOpen(randCoordinate)) {\n                break;\n            }\n        }\n\n        //self.playerAttackCoordinate(randCoordinate);\n        return randCoordinate;\n    };\n\n    self.setPlayerIsCPU = (player, isCPU) => {\n        player.isCPU = isCPU;\n    };\n    return self;\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack://battle-ship/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameBoard = __webpack_require__(/*! ./factories/Gameboard.js */ \"./src/factories/Gameboard.js\");\nconst Ship = __webpack_require__(/*! ./factories/Ship.js */ \"./src/factories/Ship.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst Utilities = __webpack_require__(/*! ./utilities.js */ \"./src/utilities.js\");\n\nfunction widthAndHeight(gameboard, container) {\n    var b = gameboard.clientWidth;\n    var B = container.clientWidth;\n    var w = b / B;\n\n    var g = gameboard.clientHeight;\n    var G = container.clientHeight;\n    var h = g / G;\n\n    document.getElementById('player1-board').style.transform =\n        'scale(' + w + ', ' + h + ')';\n\n    document.getElementById('player2-board').style.transform =\n        'scale(' + w + ', ' + h + ')';\n}\n\nvar p2;\nvar container;\nvar game;\n\nwindow.addEventListener('load', (event) => {\n    container = document.getElementsByClassName('container');\n    const player1Board = document.getElementById('player1-board');\n    const player2Board = document.getElementById('player2-board');\n\n    function createDivs(num) {\n        // container.style.width = 60 * num + 'px';\n        player1Board.style.width = 60 * num + 'px';\n        player2Board.style.width = 60 * num + 'px';\n        for (var i = 0; i < num * num; i++) {\n            const div = document.createElement('div');\n            div.classList.add('player-1-box');\n            div.id = Utilities.divOrdToId(1, i);\n            player1Board.appendChild(div);\n        }\n        for (var i = 0; i < num * num; i++) {\n            const div = document.createElement('div');\n            div.classList.add('player-2-box');\n            div.id = Utilities.divOrdToId(2, i);\n            player2Board.appendChild(div);\n        }\n\n        widthAndHeight(player1Board, container);\n        widthAndHeight(player2Board, container);\n    }\n\n    createDivs(10);\n\n    const beginButton = document.getElementById('begin');\n    beginButton.addEventListener('click', handleSubmit);\n    p2 = document.getElementById('p2CPU');\n});\n\nfunction checkGameReady() {\n    if (game.player1IsReady == true && game.player2IsReady == true) {\n        player1Turn();\n    }\n}\n\nfunction handleSubmit(e) {\n    e.preventDefault();\n    container = document.getElementsByClassName('container');\n    var readyP1 = document.getElementById('p1-ready-button');\n    var readyP2 = document.getElementById('p2-ready-button');\n    game = Game();\n    game.player1IsReady = false;\n    game.player2IsReady = false;\n    readyP1.addEventListener('click', (e) => {\n        e.stopPropagation();\n        game.player1IsReady = true;\n        var readyBtn1 = document.getElementById('p1-ready-button');\n        readyBtn1.style.visibility = 'hidden';\n        readyBtn1.disabled = true;\n        checkGameReady();\n    });\n    readyP2.addEventListener('click', (e) => {\n        e.stopPropagation();\n        game.player2IsReady = true;\n        var readyBtn2 = document.getElementById('p2-ready-button');\n        readyBtn2.style.visibility = 'hidden';\n        readyBtn2.disabled = true;\n        checkGameReady();\n    });\n\n    // test set up remove later\n    game.player1.gameBoard.placeShip(Ship(3), [1, 2]);\n    game.player1.gameBoard.placeShip(Ship(2), [5, 5]);\n    game.player2.gameBoard.placeShip(Ship(4), [3, 3]);\n    game.player2.gameBoard.placeShip(Ship(5), [1, 5]);\n\n    //game.player1IsReady = true;\n    //game.player2IsReady = true;\n\n    if (p2.checked) {\n        game.setPlayerIsCPU(game.player2, true);\n        game.player2IsReady = true;\n        var readyBtn = document.getElementById('p2-ready-button');\n        readyBtn.style.visibility = 'hidden';\n        readyBtn.disabled = true;\n    }\n    document.getElementById('settings').style.display = 'none';\n    container[0].style.display = 'flex';\n    container[1].style.display = 'flex';\n}\n\nfunction colordiv(e) {\n    let isP1Turn = game.currentPlayer == game.player1;\n    var allBoxesClass;\n    var container = document.getElementsByClassName('container');\n    var gameOver = document.getElementById('game-over');\n    let winner = document.getElementById('winner');\n    let playAgainButton = document.getElementById('play-again');\n\n    var coord;\n    var color = 'white';\n    var successfulMove = true;\n\n    if (game.currentPlayer.isCPU == true) {\n        coord = game.doComputerAttack();\n    } else {\n        if (isP1Turn == true) {\n            allBoxesClass = '.player-2-box';\n        } else {\n            allBoxesClass = '.player-1-box';\n        }\n        let thisP2Div = e.target.closest(allBoxesClass);\n        coord = Utilities.divIdtoCoordinate(game, thisP2Div.id);\n    }\n    let attackDiv = document.getElementById(\n        Utilities.coordinateToDiv(game, game.currentOpponent, coord)\n    );\n\n    try {\n        if (game.playerAttackCoordinate(coord)) {\n            color = 'red';\n        }\n    } catch (err) {\n        successfulMove = false;\n    }\n    if (successfulMove == true) {\n        attackDiv.style.backgroundColor = color;\n        if (game.isGameOver() == true) {\n            console.log('game is joever');\n            var silenceP2Board = document.getElementById('player2-board');\n            silenceP2Board.removeEventListener('click', colordiv);\n\n            var silenceP1Board = document.getElementById('player1-board');\n            silenceP1Board.addEventListener('click', colordiv);\n            game = Game();\n            container[0].style.display = 'none';\n            container[1].style.display = 'none';\n            gameOver.style.display = 'flex';\n            if (isP1Turn == true) {\n                winner.innerText = 'Player 1 Wins!';\n            } else {\n                winner.innerText = 'Player 2 Wins!';\n            }\n            playAgainButton.addEventListener('click', (e) => {\n                document.location.reload();\n            });\n            return;\n        }\n        game.newTurn();\n\n        if (isP1Turn == true) {\n            player2Turn();\n        } else {\n            player1Turn();\n        }\n    }\n}\n\nfunction player1Turn() {\n    var silenceP1Board = document.getElementById('player1-board');\n    silenceP1Board.removeEventListener('click', colordiv);\n    if (game.player1.isCPU != true) {\n        var silenceP2Board = document.getElementById('player2-board');\n        silenceP2Board.addEventListener('click', colordiv);\n    } else {\n        colordiv();\n    }\n}\n\nfunction player2Turn() {\n    var silenceP2Board = document.getElementById('player2-board');\n    silenceP2Board.removeEventListener('click', colordiv);\n\n    if (game.player2.isCPU != true) {\n        var silenceP1Board = document.getElementById('player1-board');\n        silenceP1Board.addEventListener('click', colordiv);\n    } else {\n        colordiv();\n    }\n}\n\n\n//# sourceURL=webpack://battle-ship/./src/index.js?");

/***/ }),

/***/ "./src/utilities.js":
/*!**************************!*\
  !*** ./src/utilities.js ***!
  \**************************/
/***/ ((module) => {

eval("function divOrdToId(playerNumber, x) {\n    if (playerNumber == 1) {\n        return 'p1-' + x.toString();\n    } else {\n        return 'p2-' + x.toString();\n    }\n}\n\nfunction coordinateToDiv(game, player, coordinate) {\n    let width = player.gameBoard.size[0];\n    var playerNumber;\n    if (player == game.player1) {\n        playerNumber = 1;\n    } else if (player == game.player2) {\n        playerNumber = 2;\n    } else {\n        throw new Error('Game not initialized!');\n    }\n    return divOrdToId(playerNumber, coordinate[0] + coordinate[1] * width);\n}\n\nfunction divIdtoCoordinate(game, idNumber) {\n    var player;\n    let playerId = idNumber.slice(0, 2);\n    console.log(playerId);\n    if (playerId == 'p1') {\n        player = game.player1;\n    } else if (playerId == 'p2') {\n        player = game.player2;\n    } else {\n        throw new Error('player not recognized: ' + playerId);\n    }\n    let stringNumber = parseInt(idNumber.slice(3));\n    let y = Math.floor(stringNumber / player.gameBoard.size[0]);\n    let x = stringNumber % player.gameBoard.size[0];\n    return [x, y];\n}\n\nmodule.exports = {\n    divOrdToId,\n    coordinateToDiv,\n    divIdtoCoordinate,\n};\n\n\n//# sourceURL=webpack://battle-ship/./src/utilities.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;