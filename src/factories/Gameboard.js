function GameBoard() {
    var self = {};
    self.size = [10, 10];
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

    self.isCoordinateOpen = () => {
        if (self.attackedCoords.has(coordinate.toString())) {
            return false;
        } else {
            return true;
        }
    };

    self.shotFired = (coordinate) => {
        if (self.isCoordinateOpen(coordinate)) {
            self.attackedCoords.add(coordinate.toString());
        } else {
            throw new Error('Already Fired Here');
        }

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
