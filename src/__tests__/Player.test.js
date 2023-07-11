const Player = require('../factories/Player');
const computerPlayer = require('../factories/Player');

test('create player', () => {
    player = Player();
    expect(player.startingNumberOfShips).toBe(5);
});
