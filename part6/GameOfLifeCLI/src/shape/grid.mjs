export const createGameOfLifeGridWithPattern = (pattern, gridSize) => {
  const emptyGrid = Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(0));

  const drawnGrid = drawPatternToGrid(emptyGrid, pattern);
  return drawnGrid;
};

const drawPatternToGrid = (grid, pattern) => {
  let startX = Math.floor(grid.length / 2) - 1;
  let startY = Math.floor(grid.length / 2) - 1;
  const splittedPattern = pattern.split("$");
  for (const textRow of splittedPattern) {
    [...textRow].forEach((char, index) => {
      if (char === "o") {
        grid[startX][startY + index] = 1;
      }
    });
    startX += 1;
  }
  return grid;
};

export const iterateGenerationByTimes = (grid, times) => {
  let gridToReturn = grid;
  for (let i = 0; i < times; i++) {
    gridToReturn = iterateGeneration(gridToReturn);
  }
  return gridToReturn;
};

export const iterateGeneration = (grid) => {
  let gridToReturn = [];
  grid.forEach((rowArr, row) => {
    let updatedRow = [];
    rowArr.forEach((colVal, col) => {
      let cellVal = colVal;
      let neighborsneighborsCount = getNeighboursCount(grid, row, col);
      if (cellVal == 1 && neighborsneighborsCount < 2) {
        cellVal = 0;
      } else if (cellVal == 1 && neighborsneighborsCount > 3) {
        cellVal = 0;
      } else if (cellVal == 0 && neighborsneighborsCount == 3) {
        cellVal = 1;
      }

      updatedRow.push(cellVal);
    });
    gridToReturn.push(updatedRow);
  });
  return gridToReturn;
};

const getNeighboursCount = (grid, row, col) => {
  let neighborsCount = 0;

  for (let i = -1; i < 2; i++) {
    if (col + i >= 0 && col + i < grid.length - 1) {
      if (row > 0 && grid[row - 1][col + i] == 1) {
        neighborsCount++;
      }
      if (row < grid.length - 1 && grid[row + 1][col + i] == 1) {
        neighborsCount++;
      }
    }
  }

  if (col - 1 >= 0 && grid[row][col - 1] == 1) {
    neighborsCount++;
  }
  if (col + 1 < grid.length - 1 && grid[row][col + 1] == 1) {
    neighborsCount++;
  }

  return neighborsCount;
};

// helper method
export const drawGrid = (grid) => {
  for (let row of grid) {
    let rowText = "";
    for (let value of row) {
      rowText += value;
    }
    rowText = "";
  }
};
