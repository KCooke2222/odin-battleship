const Gameboard = require("./gameboard");

class Player {
  constructor(type) {
    this.shipQueue = [5, 4, 3, 2];
    this.curShip = 0;
    this.type = type;
    this.gameboard = new Gameboard();

    if (type === "enemy") {
      this.generateShips();
    }
  }

  attack(enemyBoard, coord) {
    enemyBoard.receiveAttack(coord);
  }

  generateShips() {
    while (this.curShip < 4) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const orientation = Math.random() < 0.5 ? "vertical" : "horizontal";

      const { valid, cells } = this.gameboard.shipCells(
        [x, y],
        this.shipQueue[this.curShip],
        orientation,
      );

      if (valid) {
        this.gameboard.placeShip(cells[0], cells[cells.length - 1]);
        this.curShip += 1;
      }
    }
  }
}

module.exports = Player;
