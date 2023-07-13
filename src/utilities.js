function divOrdToId(playerNumber, x) {
    if (playerNumber == 1) {
        return 'p1-' + x.toString();
    } else {
        return 'p2-' + x.toString();
    }
}

function coordinateToDiv(game, player, coordinate) {
    let width = player.gameBoard.size[0];
    var playerNumber;
    if (player == game.player1) {
        playerNumber = 1;
    } else if (player == game.player2) {
        playerNumber = 2;
    } else {
        throw new Error('Game not initialized!');
    }
    return divOrdToId(playerNumber, coordinate[0] + coordinate[1] * width);
}

function divIdtoCoordinate(game, idNumber) {
    var player;
    let playerId = idNumber.slice(0, 2);
    console.log(playerId);
    if (playerId == 'p1') {
        player = game.player1;
    } else if (playerId == 'p2') {
        player = game.player2;
    } else {
        throw new Error('player not recognized: ' + playerId);
    }
    let stringNumber = parseInt(idNumber.slice(3));
    let y = Math.floor(stringNumber / player.gameBoard.size[0]);
    let x = stringNumber % player.gameBoard.size[0];
    return [x, y];
}

module.exports = {
    divOrdToId,
    coordinateToDiv,
    divIdtoCoordinate,
};
