export class Board {
  boardWidth;
  boardHeight;

  constructor(width, height) {
    this.boardWidth = width;
    this.boardHeight = height;
    this.boardPieces = [];
  }

  drop(piece) {
    if (!this.hasFalling()) {
      this.boardPieces.push(piece);
    } else {
      throw new Error("already falling")
    }
  }

  hasFalling() {
    return this.boardPieces.some(piece => piece.isFalling)
  }

  tick() {
    for (let piece of this.boardPieces) {
      if (piece.isFalling) {
        if (piece.x === this.boardHeight - 1 || !this.isSpaceFreeForMove(piece.x + 1, piece.y)) {
          piece.isFalling = false
        } else {
          piece.x += 1
        }
        break;
      }
    }
  }

  isSpaceFreeForMove(x, y) {
    const currentBoard = this.getCurrentBoard()
    return currentBoard[x][y] === "."
  }

  getCurrentBoard() {
    let gameboard = Array(this.boardHeight)
      .fill(null)
      .map(() => Array(this.boardWidth).fill("."));

    for (let piece of this.boardPieces) {
      gameboard = this.drawShapeToBoard(gameboard, piece);
    }
    return gameboard
  }

  drawShapeToBoard(board, piece) {
    const shape = piece.shape
    let startX = piece.x
    let startY = piece.y

    for (let row of shape) {
      for (let val of row) {
        if (val > 0) {
          board[startX][startY] = piece.type
        }
        startY += 1
      }
      startX += 1
    }
    return board
  }

  toString() {
    const currentBoard = this.getCurrentBoard()
    let gameString = ""

    for (let [index, row] of currentBoard.entries()) {
      for (let val of row) {
        gameString += val
      }
      gameString += index !== currentBoard.length ? "\n" : ""
    }

    return gameString;
  }
}
