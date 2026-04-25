const Gameboard = require("./gameboard");

test("place ship", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([0, 0], [0, 2]);

  const grid = gameboard.getShipGrid();

  expect(grid[0][0]).not.toBe(null);
  expect(grid[0][1]).not.toBe(null);
  expect(grid[0][2]).not.toBe(null);
});

test("attack miss", () => {
  const gameboard = new Gameboard();

  gameboard.receiveAttack([0, 0]);

  const grid = gameboard.getAttackGrid();

  expect(grid[0][0]).not.toBe(null);
});

test("ships sunk", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([0, 0], [0, 2]);

  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);

  expect(gameboard.shipsSunk()).toBe(true);
});
