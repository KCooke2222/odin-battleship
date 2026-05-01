function init() {
  const Player = require("./player");
  const {
    renderPreview,
    clearPreview,
    renderGame,
    initGrid,
    updateStatus,
  } = require("./domController");

  const playerGrid = document.querySelector(".player-grid");
  const enemyGrid = document.querySelector(".enemy-grid");
  const status = document.querySelector(".status");
  const restartBtn = document.querySelector(".restart");

  const player = new Player();
  const enemy = new Player("enemy");

  let orientation = "horizontal";
  let hoveredCell = null;
  let gameState = "place-ships"; // place-ships, battle, win, lose, tie

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
    if (!cell.dataset.x) {
      return;
    }
    let x = parseInt(cell.dataset.x);
    let y = parseInt(cell.dataset.y);

    // place ships
    if (gameState == "place-ships") {
      const { valid, cells } = player.gameboard.shipCells(
        [x, y],
        player.shipQueue[player.curShip],
        orientation,
      );

      if (valid) {
        player.gameboard.placeShip(cells[0], cells[cells.length - 1]);
        player.curShip += 1;
      }

      if (player.curShip === 4) {
        gameState = "battle";
        updateStatus(status, "battle");
      }

      renderGame(playerGrid, enemyGrid, player, enemy);
    }
  });

  enemyGrid.addEventListener("click", (e) => {
    if (gameState != "battle") {
      return;
    }

    const cell = e.target;
    if (!cell.dataset.x) {
      return;
    }

    let x = parseInt(cell.dataset.x);
    let y = parseInt(cell.dataset.y);

    // do attack
    try {
      enemy.gameboard.receiveAttack([x, y]);
    } catch (error) {
      return; // invalid attack
    }

    // enemy attack back
    enemy.randomAttack(player);

    // check win
    const enemySunk = enemy.gameboard.shipsSunk();
    const playerSunk = player.gameboard.shipsSunk();

    if (playerSunk && enemySunk) {
      // tie
      updateStatus(status, "tie");
      gameState = "tie";
    } else if (playerSunk) {
      // enemy
      updateStatus(status, "you lose");
      gameState = "lose";
    } else if (enemySunk) {
      //player
      updateStatus(status, "you win");
      gameState = "win";
    }

    renderGame(playerGrid, enemyGrid, player, enemy);
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

  restartBtn.addEventListener("click", (event) => {
    window.location.reload();
  });

  initGrid(playerGrid);
  initGrid(enemyGrid);
}

module.exports = { init };
