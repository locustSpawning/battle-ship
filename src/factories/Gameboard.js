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

    self.isCoordinateOpen = (coordinate) => {
        if (self.attackedCoords.has(coordinate.toString())) {
            return false;
        } else {
            return true;
        }
    };

    self.shotFired = (coordinate) => {
        if (self.isCoordinateOpen(coordinate) == true) {
            self.attackedCoords.add(coordinate.toString());
        } else {
            throw new Error('Already Fired Here');
        }
        for (const ship of self.ships.keys()) {
            if (ship.occupiesCoordinate(coordinate) == true) {
                ship.hit();
                return true;
            }
        }
        return false;
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
