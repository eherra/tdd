export const cleanGridFromZeroes = (grid) => {
  const topRemoved = removeEmptyRowFromTop(grid);
  const bottomRemoved = removeEmptyRowFromBottom(topRemoved);

  const rightRemoved = removeEmptyColumnsFromRight(bottomRemoved);
  const zeroesRemovedGrid = removeEmptyColumnsFromLeft(rightRemoved);
  return zeroesRemovedGrid;
};

const removeEmptyRowFromTop = (grid) => {
  let gridToReturn = [];
  let first = false;
  for (const row of grid) {
    if (row.includes(1) || first) {
      gridToReturn.push(row);
      first = true;
    }
  }
  return gridToReturn;
};

const removeEmptyRowFromBottom = (grid) => {
  let gridToReturn = [];
  let first = false;
  for (let i = grid.length - 1; i >= 0; i--) {
    if (grid[i].includes(1) || first) {
      gridToReturn.push(grid[i]);
      first = true;
    }
  }
  return gridToReturn.reverse();
};

const removeEmptyColumnsFromRight = (grid) => {
  let mostRightLife = -99999;
  for (const row of grid) {
    for (let i = row.length; i >= 0; i--) {
      if (row[i] === 1) {
        if (mostRightLife < i) {
          mostRightLife = i;
        }
        break;
      }
    }
  }
  let gridToReturn = [];
  for (const row of grid) {
    gridToReturn.push(row.slice(0, mostRightLife + 1));
  }

  return gridToReturn;
};

const removeEmptyColumnsFromLeft = (grid) => {
  let mostRightLeft = 99999;
  for (const row of grid) {
    for (let i = 0; i < row.length; i++) {
      if (row[i] === 1) {
        if (mostRightLeft > i) {
          mostRightLeft = i;
        }
        break;
      }
    }
  }
  let gridToReturn = [];
  for (const row of grid) {
    gridToReturn.push(row.slice(mostRightLeft, row.length));
  }

  return gridToReturn;
};
