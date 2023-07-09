function GameBoard() {
    var self = {};
    self.attackedCoords = new Set();
    self.ships = new Set();

    self.numberOfShips = () => {
        return self.ships.size;
    };

    self.placeShip = (ship, coordinate) => {
        self.ships.add(ship);
        ship.coordinate = coordinate;
    };

    self.shipCoordinate = (ship) => {
        return ship.coordinate;
    };

    self.shotFired = (coordinate) => {
        if (self.attackedCoords.has(coordinate.toString())) {
            throw new Error('Already Fired Here');
        }
        self.attackedCoords.add(coordinate.toString());
        if (ship.occupiesCoordinate(coordinate) == true) {
            ship.hit();
        }
    };

    self.allShipsSunk = () => {
        for (const ship of self.ships.keys()) {
            if (ship.isSunk() != true) {
                return false;
            }
        }
        return true;
    };

    return self;
}

module.exports = GameBoard;
