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
    this.insertBlockToGameboard(block)
    this.isBlockFalling = true;
  }

  validateGameboardEmpty() {
    if (this.isBlockFalling) {
      throw new Error("already falling");
    }
  }

  insertBlockToGameboard(block) {
    if (block.type === "T") {
      const middle = Math.floor(this.width / 2) - 1;
      // first row
      this.gameboard[0][middle] = "T";

      // second row
      this.gameboard[1][middle-1] = "T";
      this.gameboard[1][middle] = "T";
      this.gameboard[1][middle+1] = "T";
    } else {
      const middle = Math.floor(this.width / 2);
      this.gameboard[0][middle] = block.color;
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

  isSimpleBlock(row, column) {
    return this.gameboard[row][column] === "X" || this.gameboard[row][column] === "Y"
  }

  moveBlockDownByOne(row, column) {
    if (this.blockMoveCanBeMade(row, column)) {
      if (this.isSimpleBlock(row, column)) {
        this.moveSimpleBlockByOne(row, column);
      } else {
        this.moveTShapeByOne(row, column);
      }
    } else {
      this.isBlockFalling = false;
    }
  }

  blockMoveCanBeMade(row, column) {
    if (this.isSimpleBlock(row, column)) {
      return row + 1 < this.height && this.gameboard[row + 1][column] === ".";
    }

    if (this.gameboard[row][column] === "T") {
      return row + 2 < this.height &&
             this.gameboard[row + 2][column] === "."    
      }
  }

  moveTShapeByOne(row, column) {
    // moving row one down
    this.gameboard[row+2][column-1] = "T";
    this.gameboard[row+2][column] = "T";
    this.gameboard[row+2][column+1] = "T";

    // removing old "T" values
    this.gameboard[row][column] = ".";
    this.gameboard[row+1][column-1] = ".";
    this.gameboard[row+1][column+1] = ".";
  }

  moveSimpleBlockByOne(row, column) {
    const blockToMove = this.gameboard[row][column];
    this.gameboard[row][column] = ".";
    this.gameboard[row + 1][column] = blockToMove;
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
