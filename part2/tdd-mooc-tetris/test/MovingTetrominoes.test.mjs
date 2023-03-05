import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.moveDown();
  }
}

function moveToAllRight(board) {
  for (let i = 0; i < 7; i++) {
    board.moveRight();
  }
}

function moveToAllLeft(board) {
  for (let i = 0; i < 7; i++) {
    board.moveLeft();
  }
}

describe("Falling blocks", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..TTT.....
       ...T......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino has correct position after tick and left move", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..TTT.....
       ...T......
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `....TTT...
         .....T....
         ..........
         ..........
         ..........
         ..........`
    );
  });

  it("a falling tetromino has correct position after tick and right move", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `..........
         ....TTT...
         .....T....
         ..........
         ..........
         ..........`
    );
  });

  it("a falling tetromino can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
         ...TTT....
         ....T.....
         ..........
         ..........
         ..........`
    );
  });

  it("a falling tetromino can be moved down three times", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    board.moveDown();
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
         ..........
         ..........
         ...TTT....
         ....T.....
         ..........`
    );
  });

  it("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToAllLeft(board);

    expect(board.toString()).to.equalShape(
      `TTT.......
         .T........
         ..........
         ..........
         ..........
         ..........`
    );
  });

  it("it cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToAllRight(board);

    expect(board.toString()).to.equalShape(
      `.......TTT
         ........T.
         ..........
         ..........
         ..........
         ..........`
    );
  });

  it("it cannot be moved down beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board)
    expect(board.toString()).to.equalShape(
      `..........
         ..........
         ..........
         ..........
         ...TTT....
         ....T.....`
    );
  });

  it("it cannot be moved left through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToAllLeft(board);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    moveToAllLeft(board);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    moveToAllLeft(board);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    moveToAllLeft(board);

    expect(board.toString()).to.equalShape(
        `TTTTTT....
         .T..T.....
         TTT.......
         .T........
         TTT.......
         .T........`
      );
  });

  it("it cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    moveToAllRight(board);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    moveToAllRight(board);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    moveToAllRight(board);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    moveToAllRight(board);
    expect(board.toString()).to.equalShape(
        `....TTTTTT
         .....T..T.
         .......TTT
         ........T.
         .......TTT
         ........T.`
    );
  });

  it("it cannot be moved down through other blocks (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
        `...TTT....
         ....T.....
         ...TTT....
         ....T.....
         ...TTT....
         ....T.....`
    );
  });
});
