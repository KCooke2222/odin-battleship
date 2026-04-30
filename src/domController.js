function renderPreview(container, cells, valid) {
  for (let cell of cells) {
    let x = cell[0];
    let y = cell[1];

    let newClass = valid ? "valid" : "invalid";

    container.children[y * 10 + x].classList.add(newClass);
  }
}

function clearPreview(container) {
  container.querySelectorAll(".valid, .invalid").forEach((cell) => {
    cell.classList.remove("valid", "invalid");
  });
}

function renderGame(player, enemy) {
  const pShipGrid = player.gameboard.getShipGrid();
  const pAttackGrid = player.gameboard.getAttackGrid();

  const eShipGrid = enemy.gameboard.getShipGrid();
  const eAttackGrid = enemy.gameboard.getAttackGrid();

  renderGrid(playerGrid, pShipGrid, pAttackGrid, true);
  renderGrid(enemyGrid, eShipGrid, eAttackGrid, false);
}

function renderGrid(container, shipGrid, attackGrid, showShips) {
  const cells = container.children;

  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    let x = cell.dataset.x;
    let y = cell.dataset.y;

    cell.className = "";

    if (attackGrid[x][y] === 1) {
      cell.classList.add("hit");
    } else if (attackGrid[x][y] === 0) {
      cell.classList.add("miss");
    } else if (showShips && shipGrid[x][y] !== null) {
      cell.classList.add("ship");
    }
  }
}

function initGrid(container) {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;
      container.appendChild(cell);
    }
  }
}

module.exports = {
  renderPreview,
  clearPreview,
  renderGame,
  initGrid,
};
