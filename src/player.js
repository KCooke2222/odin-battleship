const Gameboard = require("./gameboard");

class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
  }

  attack(enemyBoard, coord) {
    enemyBoard.receiveAttack(coord);
  }
}

module.exports = Player;
