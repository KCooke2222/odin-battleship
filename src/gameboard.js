// two grids: ships, hit/miss
const Ship = require("./ship");

class Gameboard {
  constructor() {
    this.shipGrid = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.attackGrid = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = [];
  }

  isInBounds(coord) {
    return coord[0] >= 0 && coord[0] < 10 && coord[1] >= 0 && coord[1] < 10;
  }

  getShipGrid() {
    return this.shipGrid;
  }

  getAttackGrid() {
    return this.attackGrid;
  }

  placeShip(c1, c2) {
    if (Math.abs(c1[1] - c1[0]) > 0 && Math.abs(c2[1] - c2[0]) > 0) {
      throw new Error("Ship must be a line");
    }

    if (c1[0] > c2[0] || c2[1] > c2[1]) {
      throw new Error("Coordinates must be in ascending order");
    }

    if (!this.isInBounds(c1) || !this.isInBounds(c2)) {
      throw new Error("Coordinates out of bounds");
    }

    let length = Math.max(Math.abs(c1[1] - c1[0]), Math.abs(c2[1] - c2[0])) + 1;

    let ship = new Ship(length);

    // add to grid
    for (let x = c1[0]; x <= c2[0]; x++) {
      for (let y = c1[1]; y <= c2[1]; y++) {
        this.shipGrid[x][y] = ship;
      }
    }

    // add to list
    this.ships.push(ship);
  }

  receiveAttack(c) {
    if (!this.isInBounds(c)) {
      throw new Error("Coordinate out of bounds");
    }

    if (this.attackGrid[c[0]][c[1]] != null) {
      throw new Error("Coordinate already attacked");
    }

    if (this.shipGrid[c[0]][c[1]] != null) {
      let ship = this.shipGrid[c[0]][c[1]];
      ship.hit();

      this.attackGrid[c[0]][c[1]] = 1;
    } else {
      this.attackGrid[c[0]][c[1]] = 0;
    }
  }

  shipsSunk() {
    let res = true;
    for (ship of this.ships) {
      if (!ship.isSunk()) {
        res = false;
      }
    }
    return res;
  }
}

module.exports = Gameboard;
