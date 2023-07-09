function Ship(length) {
    var self = {};
    self.length = length;
    self.numberOfHits = 0;

    self.hit = () => {
        self.numberOfHits += 1;
    };

    self.isSunk = () => {
        return self.numberOfHits === self.length;
    };

    self.occupiesCoordinate = (coordinate) => {
        if (coordinate[1] != self.coordinate[1]) {
            return false;
        }
        if (coordinate[0] < self.coordinate[0]) {
            return false;
        }
        if (coordinate[0] >= self.coordinate[0] + self.length) {
            return false;
        }
        return true;
    };

    return self;
}

module.exports = Ship;
