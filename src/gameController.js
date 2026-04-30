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

  const player = new Player();
  const enemy = new Player("enemy");

  let orientation = "horizontal";
  let hoveredCell = null;

  playerGrid.addEventListener("mouseover", (e) => {
    const cell = e.target;
    hoveredCell = cell;
    let x = parseInt(cell.dataset.x);
    let y = parseInt(cell.dataset.y);

    const { valid, cells } = player.gameboard.shipCells(
      [x, y],
      player.shipQueue[player.curShip],
      orientation,
    );

    renderPreview(playerGrid, cells, valid);
  });

  playerGrid.addEventListener("mouseout", (e) => {
    clearPreview(playerGrid);
  });

  playerGrid.addEventListener("click", (e) => {
    const cell = e.target;
    let x = parseInt(cell.dataset.x);
    let y = parseInt(cell.dataset.y);

    // place ships
    if (player.curShip < 4) {
      const { valid, cells } = player.gameboard.shipCells(
        [x, y],
        player.shipQueue[player.curShip],
        orientation,
      );

      if (valid) {
        player.gameboard.placeShip(cells[0], cells[cells.length - 1]);
        player.curShip += 1;
      }

      renderGame(playerGrid, enemyGrid, player, enemy);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "r") {
      orientation = orientation === "vertical" ? "horizontal" : "vertical";
    }
    clearPreview(playerGrid);
    const cell = hoveredCell;
    let x = parseInt(cell.dataset.x);
    let y = parseInt(cell.dataset.y);

    const { valid, cells } = player.gameboard.shipCells(
      [x, y],
      player.shipQueue[player.curShip],
      orientation,
    );

    renderPreview(playerGrid, cells, valid);
  });

  initGrid(playerGrid);
  initGrid(enemyGrid);
}

module.exports = { init };
