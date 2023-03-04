import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 12; i++) {
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

function create4RowBoard(board) {
  for (let i = 0; i < 4; i++) {
    board.drop(Tetromino.I_SHAPE);
    moveToAllLeft(board);
    fallToBottom(board);

    board.drop(Tetromino.I_SHAPE);
    moveToAllRight(board);
    fallToBottom(board);
  }
}

function create4RowBoardOnSide(board) {
  for (let i = 0; i < 4; i++) {
    board.drop(Tetromino.I_SHAPE);
    moveToAllLeft(board);
    fallToBottom(board);
    board.drop(Tetromino.I_SHAPE);
    board.moveRight();
    fallToBottom(board);
  }
}

describe("Full row deleting", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 8);
  });

  it("Last row being full will be deleted", () => {
    board.drop(Tetromino.I_SHAPE);
    moveToAllLeft(board);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
        ..........
       ..........
       ..........
       ..........
       IIII......`
    );

    board.drop(Tetromino.I_SHAPE);
    moveToAllRight(board);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
         ..........
         ..........
         ..........
         ..........
         ..........
         ..........
         IIII..IIII`
    );

    board.drop(Tetromino.O_SHAPE);
    expect(board.toString()).to.equalShape(
      `....OO....
        ....OO....
        ..........
        ..........
        ..........
        ..........
        ..........
        IIII..IIII`
    );
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
        ..........
        ..........
        ..........
        ..........
        ....OO....`
    );
  });

  it("2 last row being full, will be deleted", () => {
    create4RowBoard(board);

    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        ..........
        IIII..IIII
        IIII..IIII
        IIII..IIII
        IIII..IIII`
    );

    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        ..........
        ..........
        ..........
        IIII..IIII
        IIII..IIII
        `
    );

    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
          ..........
          ..........
          ..........
          ..........
          ..........
          ..........
          ..........
          `
    );
  });

  it("4 last row being full, will be deleted", () => {
    create4RowBoardOnSide(board);
    expect(board.toString()).to.equalShape(
        `..........
          ..........
          ..........
          ..........
          IIIIIIII..
          IIIIIIII..
          IIIIIIII..
          IIIIIIII..`
      );

      // delete here with I shape all
  });
});
