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

eval("function GameBoard() {\n    var self = {};\n    self.size = [10, 10];\n    self.attackedCoords = new Set();\n    self.ships = new Set();\n\n    self.numberOfShips = () => {\n        return self.ships.size;\n    };\n\n    self.placeShip = (ship, coordinate) => {\n        self.ships.add(ship);\n        ship.coordinate = coordinate;\n    };\n\n    self.shipCoordinate = (ship) => {\n        return ship.coordinate;\n    };\n\n    self.isCoordinateOpen = () => {\n        if (self.attackedCoords.has(coordinate.toString())) {\n            return false;\n        } else {\n            return true;\n        }\n    };\n\n    self.shotFired = (coordinate) => {\n        if (self.isCoordinateOpen(coordinate)) {\n            self.attackedCoords.add(coordinate.toString());\n        } else {\n            throw new Error('Already Fired Here');\n        }\n\n        if (ship.occupiesCoordinate(coordinate) == true) {\n            ship.hit();\n        }\n    };\n\n    self.allShipsSunk = () => {\n        for (const ship of self.ships.keys()) {\n            if (ship.isSunk() != true) {\n                return false;\n            }\n        }\n        return true;\n    };\n\n    return self;\n}\n\nmodule.exports = GameBoard;\n\n\n//# sourceURL=webpack://battle-ship/./src/factories/Gameboard.js?");

/***/ }),

/***/ "./src/factories/Player.js":
/*!*********************************!*\
  !*** ./src/factories/Player.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameBoard = __webpack_require__(/*! ../factories/Gameboard */ \"./src/factories/Gameboard.js\");\n\nfunction Player() {\n    var self = {};\n    self.gameBoard = new GameBoard();\n    self.startingNumberOfShips = 5;\n\n    return self;\n}\n\nmodule.exports = Player;\n\n\n//# sourceURL=webpack://battle-ship/./src/factories/Player.js?");

/***/ }),

/***/ "./src/factories/Ship.js":
/*!*******************************!*\
  !*** ./src/factories/Ship.js ***!
  \*******************************/
/***/ ((module) => {

eval("function Ship(length) {\n    var self = {};\n    self.length = length;\n    self.numberOfHits = 0;\n\n    self.hit = () => {\n        self.numberOfHits += 1;\n    };\n\n    self.isSunk = () => {\n        return self.numberOfHits === self.length;\n    };\n\n    self.occupiesCoordinate = (coordinate) => {\n        if (coordinate[1] != self.coordinate[1]) {\n            return false;\n        }\n        if (coordinate[0] < self.coordinate[0]) {\n            return false;\n        }\n        if (coordinate[0] >= self.coordinate[0] + self.length) {\n            return false;\n        }\n        return true;\n    };\n\n    return self;\n}\n\nmodule.exports = Ship;\n\n\n//# sourceURL=webpack://battle-ship/./src/factories/Ship.js?");

/***/ }),

/***/ "./src/game-loop.js":
/*!**************************!*\
  !*** ./src/game-loop.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameBoard = __webpack_require__(/*! ./factories/Gameboard */ \"./src/factories/Gameboard.js\");\nconst Ship = __webpack_require__(/*! ./factories/Ship */ \"./src/factories/Ship.js\");\nconst Player = __webpack_require__(/*! ./factories/Player */ \"./src/factories/Player.js\");\nconst computerPlayer = __webpack_require__(/*! ./factories/Player */ \"./src/factories/Player.js\");\n\nfunction Game() {\n    var self = {};\n    self.player1 = new Player();\n    self.player2 = new Player();\n\n    self.currentPlayer = null;\n    self.currentOpponent = null;\n\n    self.playerAttackCoordinate = (coordinate) => {\n        self.currentOpponent.GameBoard.shotFired(coordinate);\n    };\n\n    self.isGameOver = () => {\n        if (self.currentOpponent.allShipsSunk() == true) {\n            return true;\n        }\n        return false;\n    };\n\n    self.newTurn = () => {\n        nextPlayer = currentOpponent;\n        self.currentOpponent = self.currentPlayer;\n        self.currentPlayer = nextPlayer;\n    };\n\n    self.doComputerAttack = () => {\n        while (true) {\n            randCoordinate = [\n                Math.floor(Math.random() * self.GameBoard.size[0]),\n                Math.floor(Math.random() * self.GameBoard.size[1]),\n            ];\n            if (\n                self.currentOpponent.GameBoard.isCoordinateOpen(randCoordinate)\n            ) {\n                break;\n            }\n        }\n\n        self.playerAttackCoordinate(randCoordinate);\n    };\n\n    self.setPlayerIsCPU = (player, isCPU) => {\n        player.isCPU = isCPU;\n    };\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack://battle-ship/./src/game-loop.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameBoard = __webpack_require__(/*! ./factories/Gameboard.js */ \"./src/factories/Gameboard.js\");\nconst Ship = __webpack_require__(/*! ./factories/Ship.js */ \"./src/factories/Ship.js\");\nconst Game = __webpack_require__(/*! ./game-loop.js */ \"./src/game-loop.js\");\n\nfunction widthAndHeight(gameboard, container) {\n    var b = gameboard.clientWidth;\n    var B = container.clientWidth;\n    var w = b / B;\n\n    var g = gameboard.clientHeight;\n    var G = container.clientHeight;\n    var h = g / G;\n\n    document.getElementById('player1-board').style.transform =\n        'scale(' + w + ', ' + h + ')';\n\n    document.getElementById('player2-board').style.transform =\n        'scale(' + w + ', ' + h + ')';\n}\n\nvar fggfgf;\nvar container;\n\nwindow.addEventListener('load', (event) => {\n    container = document.getElementsByClassName('container');\n    const player1Board = document.getElementById('player1-board');\n    const player2Board = document.getElementById('player2-board');\n\n    function createDivs(num) {\n        // container.style.width = 60 * num + 'px';\n        player1Board.style.width = 60 * num + 'px';\n        player2Board.style.width = 60 * num + 'px';\n        for (var i = 0; i < num * num; i++) {\n            const div = document.createElement('div');\n            div.classList.add('box');\n            player1Board.appendChild(div);\n        }\n        for (var i = 0; i < num * num; i++) {\n            const div = document.createElement('div');\n            div.classList.add('box');\n            player2Board.appendChild(div);\n        }\n\n        widthAndHeight(player1Board, container);\n        widthAndHeight(player2Board, container);\n    }\n\n    createDivs(10);\n\n    const beginButton = document.getElementById('begin');\n    beginButton.addEventListener('click', handleSubmit);\n    fggfgf = document.getElementById('p2CPU');\n});\n\nfunction handleSubmit(e) {\n    e.preventDefault();\n    container = document.getElementsByClassName('container');\n\n    var game = Game();\n    if (p2.value == 'on') {\n        game.setPlayerIsCPU(self.player2, isCPU);\n    }\n    document.getElementById('settings').style.display = 'none';\n    container[0].style.display = 'flex';\n    container[1].style.display = 'flex';\n}\n\n\n//# sourceURL=webpack://battle-ship/./src/index.js?");

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