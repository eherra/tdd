import lodash from 'lodash'

export class Board {
  boardWidth;
  boardHeight;
  currentPieceFalling;
  gameboard;

  constructor(width, height) {
    this.boardWidth = width;
    this.boardHeight = height;
    this.currentPieceFalling = null;
    this.gameboard = Array(height)
      .fill(null)
      .map(() => Array(width).fill("."));
  }

  drop(tetromino) {
    if (!this.currentPieceFalling) {
      this.currentPieceFalling = lodash.cloneDeep(tetromino)
      const middle = Math.floor(this.boardWidth / 2);
      this.currentPieceFalling.y =
        tetromino.type === "T"
          ? middle - Math.floor(this.currentPieceFalling.shape.length / 2) - 1
          : middle;
    } else {
      throw new Error("already falling");
    }
  }

  tick() {
    if (this.currentPieceFalling) {
      const shapeHeight = this.currentPieceFalling.shape.length;
      const howMuchEmpty = this.checkEmptyRowsBottom(
        this.currentPieceFalling.shape
      );
      const xToCheck = this.currentPieceFalling.x + shapeHeight - howMuchEmpty;

      if (
        this.isSpaceFreeForMove(
          xToCheck,
          this.currentPieceFalling.y,
          this.currentPieceFalling.type
        )
      ) {
        this.currentPieceFalling.moveDown();
      } else {
        this.drawShapeToBoard(this.currentPieceFalling);
        this.currentPieceFalling = null;
      }
    }
  }

  moveLeft() {
    this.currentPieceFalling.moveLeft();
  }

  moveRight() {
    this.currentPieceFalling.moveRight();
  }

  moveDown() {
    this.currentPieceFalling.moveDown();
  }

  hasFalling() {
    return this.currentPieceFalling !== null;
  }

  checkEmptyRowsBottom(pieceShape) {
    for (let i = pieceShape.length - 1; i >= 0; i--) {
      if (pieceShape[i].includes("T" || "I" || "O")) {
        return pieceShape.length - i - 1;
      }
    }
    return 0;
  }

  isSpaceFreeForMove(x, y, type) {
    const currentBoard = this.getCurrentBoard();
    if (x < this.boardHeight && y < this.boardWidth) {
      if (type === "T") {
        return (
          currentBoard[x][y] === "." &&
          currentBoard[x][y + 1] === "." &&
          currentBoard[x][y + 2] === "."
        );
      }

      return currentBoard[x][y] === ".";
    }
    return false;
  }

  getCurrentBoard() {
    const gameboard = this.getCurrentBoardString(
      this.gameboard,
      this.currentPieceFalling
    );
    return gameboard;
  }

  getCurrentBoardString(gameboard, currentPieceFalling) {
    const tempBoard = gameboard.map((arr) => arr.slice());
    if (!currentPieceFalling) return tempBoard;

    const shape = currentPieceFalling.shape;
    let startX = currentPieceFalling.x;
    let startY = currentPieceFalling.y;

    for (let row of shape) {
      for (let val of row) {
        if (val !== ".") {
          tempBoard[startX][startY] = currentPieceFalling.type;
        }
        startY += 1;
      }
      startY = currentPieceFalling.y;
      startX += 1;
    }
    return tempBoard;
  }

  drawShapeToBoard(piece) {
    const shape = piece.shape;
    let startX = piece.x;
    let startY = piece.y;

    for (let row of shape) {
      for (let val of row) {
        if (val !== ".") {
          this.gameboard[startX][startY] = piece.type;
        }
        startY += 1;
      }
      startY = piece.y;
      startX += 1;
    }
  }

  toString() {
    let gameString = "";
    const currentBoard = this.getCurrentBoard();

    for (let [index, row] of currentBoard.entries()) {
      for (let val of row) {
        gameString += val;
      }
      gameString += index !== this.gameboard.length ? "\n" : "";
    }

    return gameString;
  }
}
