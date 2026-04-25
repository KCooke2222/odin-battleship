const Ship = require("./ship");

test("hit", () => {
  const ship = new Ship(3);

  ship.hit();
  ship.hit();

  expect(ship.hits).toBe(2);
});

test("sunk", () => {
  const ship = new Ship(2);

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});

test("not sunk", () => {
  const ship = new Ship(3);

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(false);
});
