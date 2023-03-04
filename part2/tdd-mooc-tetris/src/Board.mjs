import lodash from "lodash";
import { ScoringSystem } from "./ScoringSystem.mjs";

export class Board {
  boardWidth;
  boardHeight;
  currentPieceFalling;
  gameboard;
  scoringSystem

  constructor(width, height, level) {
    this.boardWidth = width;
    this.boardHeight = height;
    this.currentPieceFalling = null;
    this.scoringSystem =  new ScoringSystem(level)
    this.gameboard = Array(height)
      .fill(null)
      .map(() => Array(width).fill("."));
  }

  drop(tetromino) {
    if (!this.currentPieceFalling) {
      this.currentPieceFalling = lodash.cloneDeep(tetromino);
    } else {
      throw new Error("already falling");
    }
  }

  tick() {
    if (this.currentPieceFalling) {
      this.moveDown();
    }
  }

  moveLeft() {
    if (this.currentPieceFalling) {
      const howMuchEmpty = this.checkEmptyRowsLeft(
        this.currentPieceFalling.shape
      );
      let yToCheck = this.currentPieceFalling.y + howMuchEmpty;
      if (this.currentPieceFalling.type === "T") {
        yToCheck -= 2;
      }

      if (
        this.isSpaceFreeForMoveSide(
          this.currentPieceFalling.x,
          yToCheck,
          this.currentPieceFalling.type
        )
      ) {
        this.currentPieceFalling = this.currentPieceFalling.moveLeft();
      }
    }
  }

  moveRight() {
    if (this.currentPieceFalling) {
      let yToCheck =
        this.currentPieceFalling.y +
        this.currentPieceFalling.shape[0].length -
        1;
      if (
        this.currentPieceFalling.type === "I" &&
        this.currentPieceFalling.direction === "left"
      ) {
        yToCheck += 1;
      }
      if (
        this.isSpaceFreeForMoveSide(
          this.currentPieceFalling.x,
          yToCheck,
          this.currentPieceFalling.type
        )
      ) {
        this.currentPieceFalling = this.currentPieceFalling.moveRight();
      }
    }
  }

  moveDown() {
    if (this.currentPieceFalling) {
      const shapeHeight = this.currentPieceFalling.shape.length;
      const howMuchEmpty = this.checkEmptyRowsBottom(
        this.currentPieceFalling.shape
      );
      let xToCheck = this.currentPieceFalling.x + shapeHeight - howMuchEmpty;
      if (this.currentPieceFalling.x === 0) {
        xToCheck -= 1;
      }

      if (
        this.isSpaceFreeForMove(
          xToCheck,
          this.currentPieceFalling.y,
          this.currentPieceFalling.type
        )
      ) {
        this.currentPieceFalling = this.currentPieceFalling.moveDown();
      } else {
        this.drawShapeToBoard(this.currentPieceFalling);
        this.currentPieceFalling = null;
        this.checkFullRowsAndRemove();
      }
    }
  }

  hasFalling() {
    return this.currentPieceFalling !== null;
  }

  checkEmptyRowsBottom(pieceShape) {
    for (let i = pieceShape.length - 1; i >= 0; i--) {
      if (
        pieceShape[i].includes("T") ||
        pieceShape[i].includes("I") ||
        pieceShape[i].includes("L") ||
        pieceShape[i].includes("S") ||
        pieceShape[i].includes("Z") ||
        pieceShape[i].includes("L") ||
        pieceShape[i].includes("J") ||
        pieceShape[i].includes("O")
      ) {
        return pieceShape.length - i - 1;
      }
    }
    return 0;
  }

  checkEmptyRowsRight(pieceShape) {
    const rotatedMatrix = pieceShape[0].map((val, index) =>
      pieceShape.map((row) => row[row.length - 1 - index])
    );
    return this.checkEmptyRowsBottom(rotatedMatrix);
  }

  checkEmptyRowsLeft(pieceShape) {
    const rotatedMatrix = pieceShape[0].map((val, index) =>
      pieceShape.map((row) => row[index]).reverse()
    );

    return this.checkEmptyRowsBottom(rotatedMatrix);
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

      if (type == "O") {
        return currentBoard[x][y + 1] === "." && currentBoard[x][y + 2] === ".";
      }

      if (type == "I" && this.currentPieceFalling.direction === "up") {
        console.log(this.currentPieceFalling)

        console.log(currentBoard[x][y])
        return currentBoard[x][y] === "."
      }

      return currentBoard[x][y] === ".";
    }
    return false;
  }

  rotateRight() {
    this.currentPieceFalling = this.currentPieceFalling.rotateRight();
  }

  rotateLeft() {
    this.currentPieceFalling = this.currentPieceFalling.rotateLeft();
  }

  isSpaceFreeForMoveSide(x, y, type) {
    const currentBoard = this.getCurrentBoard();
    if (x < this.boardHeight && y < this.boardWidth && y >= 0) {
      if (type === "T") {
        return (
          currentBoard[x][y] === "." && currentBoard[x + 1][y] === "."
        );
      }

      if (type === "I") {
        if (this.currentPieceFalling.direction === "left") {
          return currentBoard[x + 1][y] === ".";
        }
        return (
          currentBoard[x][y] === "." &&
          currentBoard[x + 1][y] === "." &&
          currentBoard[x + 2][y] === "." &&
          currentBoard[x + 3][y] === "."
        );
      }

      return currentBoard[x][y] === ".";
    }
    return false;
  }

  checkFullRowsAndRemove() {
    let rowsDeletedAmount = 0;
    for (const [index, row] of this.gameboard.entries()) {
      if (!row.includes(".")) {
        // remove row from index
        this.gameboard.splice(index, 1)
        // add row to top
        this.gameboard.splice(0, 0, [".........."])
        rowsDeletedAmount += 1
      }
    }
    if (rowsDeletedAmount) {
      this.scoringSystem.addRowPoints(rowsDeletedAmount);
    }
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
      if (
        row.includes("T") ||
        row.includes("I") ||
        row.includes("L") ||
        row.includes("J") ||
        row.includes("S") ||
        row.includes("Z") ||
        row.includes("O")
      ) {
        for (let val of row) {
          if (val !== ".") {
            tempBoard[startX][startY] = currentPieceFalling.type;
          }
          startY += 1;
        }
        startX += 1;
        startY = currentPieceFalling.y;
      }
    }
    return tempBoard;
  }

  drawShapeToBoard(piece) {
    let shape = piece.shape;
    let startX = piece.x;
    let startY = piece.y;
    if (startX === 0 && !shape[0].includes("T")) {
      shape.shift();
    }

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
