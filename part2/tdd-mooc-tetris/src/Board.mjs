export class Board {
  boardWidth;
  boardHeight;

  constructor(width, height) {
    this.boardWidth = width;
    this.boardHeight = height;
    this.boardPieces = [];
  }

  drop(tetromino) {
    if (!this.hasFalling()) {
      const middle = Math.floor(this.boardWidth / 2);
      tetromino.y =
        tetromino.type === "T"
          ? middle - Math.floor(tetromino.shape.length / 2) - 1
          : middle;
      this.boardPieces.push(tetromino);
    } else {
      throw new Error("already falling");
    }
  }

  hasFalling() {
    return this.boardPieces.some((piece) => piece.isFalling);
  }

  tick() {
    for (let [index, piece] of this.boardPieces.entries()) {
      if (piece.isFalling) {
        const shapeHeight = piece.shape.length;
        const howMuchEmpty = this.checkEmptyRowsBottom(piece.shape);
        const xToCheck = piece.x + shapeHeight - howMuchEmpty;

        if (this.isSpaceFreeForMove(xToCheck, piece.y, piece.type)) {
          const newPiece = { ...piece, x: (piece.x += 1) };
          this.boardPieces.splice(index, 1);
          this.boardPieces.push(newPiece);
        } else {
          const newPiece = { ...piece, isFalling: false };
          this.boardPieces.splice(index, 1);
          this.boardPieces.push(newPiece);
        }
        break;
      }
    }
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
    let gameboard = Array(this.boardHeight)
      .fill(null)
      .map(() => Array(this.boardWidth).fill("."));

    for (let piece of this.boardPieces) {
      gameboard = this.drawShapeToBoard(gameboard, piece);
    }
    return gameboard;
  }

  drawShapeToBoard(board, piece) {
    const shape = piece.shape;
    let startX = piece.x;
    let startY = piece.y;

    for (let row of shape) {
      for (let val of row) {
        if (val !== ".") {
          board[startX][startY] = piece.type;
        }
        startY += 1;
      }
      startY = piece.y;
      startX += 1;
    }
    return board;
  }

  toString() {
    const currentBoard = this.getCurrentBoard();
    let gameString = "";

    for (let [index, row] of currentBoard.entries()) {
      for (let val of row) {
        gameString += val;
      }
      gameString += index !== currentBoard.length ? "\n" : "";
    }

    return gameString;
  }
}
