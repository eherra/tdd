import lodash from "lodash";
import { ScoringSystem } from "./ScoringSystem.mjs";

export class Board {
  boardWidth;
  boardHeight;
  currentPieceFalling;
  gameboard;
  scoringSystem;
  moves;

  constructor(width, height, level) {
    this.boardWidth = width;
    this.boardHeight = height;
    this.currentPieceFalling = null;
    this.scoringSystem = new ScoringSystem(level);
    this.gameboard = this.initEmptyGameboard(height, width)
  }

  initEmptyGameboard(height, width) {
    return Array(height)
    .fill(null)
    .map(() => Array(width).fill("."));
  }

  drop(tetromino) {
    if (!this.currentPieceFalling) {
      this.currentPieceFalling = lodash.cloneDeep(tetromino);
    } else {
      throw Error("Already dropping");
    }
  }

  tick() {
    if (this.currentPieceFalling) {
      this.moveDown();
    }
  }

  moveLeft() {
    if (this.currentPieceFalling) {
      const positionToCheck = {
        ...this.currentPieceFalling,
        y: this.currentPieceFalling.y - 1,
      };
      if (this.isValidMove(positionToCheck)) {
        this.currentPieceFalling = this.currentPieceFalling.moveLeft();
      }
    }
  }

  moveRight() {
    if (this.currentPieceFalling) {
      const positionToCheck = {
        ...this.currentPieceFalling,
        y: this.currentPieceFalling.y + 1,
      };
      if (this.isValidMove(positionToCheck)) {
        this.currentPieceFalling = this.currentPieceFalling.moveRight();
      }
    }
  }

  moveDown() {
    if (this.currentPieceFalling) {
      const positionToCheck = {
        ...this.currentPieceFalling,
        x: this.currentPieceFalling.x + 1,
      };
      if (this.isValidMove(positionToCheck)) {
        this.currentPieceFalling = this.currentPieceFalling.moveDown();
      } else {
        this.drawShapeToBoard(this.gameboard);
        this.checkFullRowsAndRemove();
        this.currentPieceFalling = null;
      }
    }
  }

  rotateRight() {
    if (this.currentPieceFalling) {
      this.currentPieceFalling = this.currentPieceFalling.rotateRight();
    }
  }

  rotateLeft() {
    if (this.currentPieceFalling) {
      this.currentPieceFalling = this.currentPieceFalling.rotateLeft();
    }
  }

  checkFullRowsAndRemove() {
    let rowsDeletedAmount = 0;
    for (const [index, row] of this.gameboard.entries()) {
      if (!row.includes(".")) {
        // remove row from index
        this.gameboard.splice(index, 1);
        // add row to top
        this.gameboard.splice(0, 0, Array(this.boardWidth).fill("."));
        rowsDeletedAmount += 1;
      }
    }
    if (rowsDeletedAmount) {
      this.scoringSystem.addRowPoints(rowsDeletedAmount);
    }
  }

  drawShapeToBoard(board) {
    let shape = this.currentPieceFalling.shape;
    if (this.isFirstRowEmpty(shape[0])) {
      shape.splice(0, 1);
    }

    shape.forEach((row, x) => {
      row.forEach((value, y) => {
        if (value !== ".") {
          board[this.currentPieceFalling.x + x][
            this.currentPieceFalling.y + y
          ] = value;
        }
      });
    });
  }

  isValidMove(positionToCheck) {
    if (this.isFirstRowEmpty(positionToCheck.shape[0])) {
      positionToCheck.shape.splice(0, 1);
    }
    return positionToCheck.shape.every((row, xIndex) => {
      return row.every((value, yIndex) => {
        let y = positionToCheck.y + yIndex;
        let x = positionToCheck.x + xIndex;

        return (
          value === "." ||
          (this.isInsideGameboard(x, y) && this.isSpaceFree(x, y))
        );
      });
    });
  }

  isInsideGameboard(x, y) {
    return y >= 0 && y < this.gameboard[0].length && x <= this.gameboard.length;
  }

  isSpaceFree(x, y) {
    return this.gameboard[x] && this.gameboard[x][y] === ".";
  }

  isFirstRowEmpty(row) {
    return row.every((m) => m === ".");
  }

  hasFalling() {
    return this.currentPieceFalling !== null;
  }

  getCurrentBoardString() {
    const tempBoard = this.gameboard.map((arr) => arr.slice());
    if (!this.currentPieceFalling) return tempBoard;
    this.drawShapeToBoard(tempBoard);
    return tempBoard;
  }

  toString() {
    let gameString = "";
    const currentBoard = this.getCurrentBoardString();

    for (let [index, row] of currentBoard.entries()) {
      for (let val of row) {
        gameString += val;
      }
      gameString += index !== this.gameboard.length ? "\n" : "";
    }

    return gameString;
  }
}
