function init() {
  const Player = require("./player");
  const {
    renderPreview,
    clearPreview,
    renderGame,
    initGrid,
  } = require("./domController");

  const playerGrid = document.querySelector(".player-grid");
  const enemyGrid = document.querySelector(".enemy-grid");

  let shipQueue = [5, 4, 3, 2];
  let curShip = 0;
  let orientation = "horizontal";

  function shipCells(head, length, orientation) {
    let hx = head[0];
    let hy = head[1];
    let cells = [];
    let valid = true;

    if (orientation === "vertical") {
      for (let y = hy; y < hy + length && y < 10; y++) {
        cells.push([hx, y]);
      }

      if (hy + length > 10) {
        valid = false;
      }
    } else {
      for (let x = hx; x < hx + length && x < 10; x++) {
        cells.push([x, hy]);
      }

      if (hx + length > 10) {
        valid = false;
      }
    }

    return { valid, cells };
  }

  playerGrid.addEventListener("mouseover", (e) => {
    const cell = e.target;
    let x = parseInt(cell.dataset.x);
    let y = parseInt(cell.dataset.y);

    const { valid, cells } = shipCells([x, y], shipQueue[curShip], orientation);

    renderPreview(playerGrid, cells, valid);
  });

  playerGrid.addEventListener("mouseout", (e) => {
    const cell = e.target;
    let x = cell.dataset.x;
    let y = cell.dataset.y;

    clearPreview(playerGrid);
  });

  initGrid(playerGrid);
  initGrid(enemyGrid);
}

module.exports = { init };
