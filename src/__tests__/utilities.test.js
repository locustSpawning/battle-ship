const Util = require('../utilities.js');
const Game = require('../game.js');

test('format id', () => {
    expect(Util.divOrdToId(1, 1)).toBe('p1-1');
    expect(Util.divOrdToId(2, 1)).toBe('p2-1');
    expect(Util.divOrdToId(1, 31)).toBe('p1-31');
    expect(Util.divOrdToId(2, 88)).toBe('p2-88');
});

test('coordinate to div', () => {
    game = Game();
    var counter = 0;
    for (i = 0; i < game.player1.gameBoard.size[0]; i++) {
        for (j = 0; j < game.player1.gameBoard.size[1]; j++) {
            expect(Util.coordinateToDiv(game, game.player1, [j, i])).toBe(
                'p1-' + counter.toString()
            );
            counter++;
        }
    }
    counter = 0;
    for (i = 0; i < game.player2.gameBoard.size[0]; i++) {
        for (j = 0; j < game.player2.gameBoard.size[1]; j++) {
            expect(Util.coordinateToDiv(game, game.player2, [j, i])).toBe(
                'p2-' + counter.toString()
            );
            counter++;
        }
    }
});

test('div to coordinate', () => {
    game = Game();
    var counter = 0;
    for (i = 0; i < game.player1.gameBoard.size[0]; i++) {
        for (j = 0; j < game.player1.gameBoard.size[1]; j++) {
            expect(
                Util.divIdtoCoordinate(game, 'p1-' + counter.toString())
            ).toEqual([j, i]);
            counter++;
        }
    }
    counter = 0;
    for (i = 0; i < game.player2.gameBoard.size[0]; i++) {
        for (j = 0; j < game.player2.gameBoard.size[1]; j++) {
            expect(
                Util.divIdtoCoordinate(game, 'p2-' + counter.toString())
            ).toEqual([j, i]);
            counter++;
        }
    }
});
