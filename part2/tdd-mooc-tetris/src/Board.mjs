export class Board {
  width;
  height;
  gameboard;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameboard = Array(height).fill().map(() => Array(width).fill("."));
  }

  drop(block) {
    const middle = Math.floor(this.width / 2);
    this.gameboard[0][middle] = block.color;
  }

  tick() {
    for (let row = 0; row < this.gameboard.length; row++) {
      for (let column = 0; column < this.gameboard[row].length; column++) {
        if (this.hasBlock(row, column)) {
          this.moveBlockDownByOne(row, column);
          return;
        }
      }
    }
  }

  hasBlock(row, column) {
    return this.gameboard[row][column] !== ".";
  }

  moveBlockDownByOne(row, column) {
    const blockToMove = this.gameboard[row][column];
    this.gameboard[row][column] = ".";
    this.gameboard[row + 1][column] = blockToMove;
  }

  toString() {
    let shape = "";
    for (let row = 0; row < this.gameboard.length; row++) {
      for (let column = 0; column < this.gameboard[row].length; column++) {
        shape += this.gameboard[row][column];
      }
      shape += "\n";
    }
    return shape;
  }
}
