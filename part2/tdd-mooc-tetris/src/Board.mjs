export class Board {
  width;
  height;
  gameboard;
  isBlockFalling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameboard = Array(height).fill().map(() => Array(width).fill("."));
    this.isBlockFalling = false;
  }

  drop(block) {
    this.validateGameboardEmpty()
    const middle = Math.floor(this.width / 2);
    this.gameboard[0][middle] = block.color;
    this.isBlockFalling = true;
  }

  validateGameboardEmpty() {
    if (this.isBlockFalling) {
      throw new Error("already falling");
    }
  }

  tick() {
    for (let row = 0; row < this.gameboard.length; row++) {
      for (let column = 0; column < this.gameboard[row].length; column++) {
        if (this.hasBlockOnSpot(row, column)) {
          this.moveBlockDownByOne(row, column);
          return;
        }
      }
    }
  }

  hasBlockOnSpot(row, column) {
    return this.gameboard[row][column] !== ".";
  }

  moveBlockDownByOne(row, column) {
    if (this.blockMoveCanBeMade(row, column)) {
      const blockToMove = this.gameboard[row][column];
      this.gameboard[row][column] = ".";
      this.gameboard[row + 1][column] = blockToMove;
    } else {
      this.isBlockFalling = false;
    }
  }

  blockMoveCanBeMade(row, column) {
    return row + 1 < this.height && this.gameboard[row + 1][column] === ".";
  }

  hasFalling() {
    return this.isBlockFalling;
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
