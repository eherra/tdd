import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Falling blocks", () => {
    let board;
    beforeEach(() => {
      board = new Board(10, 6);
    });

  it("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino has correct position after tick and left move", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ...T......
       ..TTT.....
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    expect(board.toString()).to.equalShape(
        `.....T....
         ....TTT...
         ..........
         ..........
         ..........
         ..........`
      );
    });

  it("a falling tetromino has correct position after tick and right move", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.moveRight();
    expect(board.toString()).to.equalShape(
        `..........
         .....T....
         ....TTT...
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
         ....T.....
         ...TTT....
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
         ....T.....
         ...TTT....
         ..........`
      );
  });

  xit("it cannot be moved left beyond the board", () => {
    expect(board.toString()).to.equalShape(
      `...
       ...
       ...`
    );
  });

  xit("it cannot be moved right beyond the board", () => {
    expect(board.toString()).to.equalShape(
      `...
       ...
       ...`
    );
  });

  xit("it cannot be moved down beyond the board", () => {
    expect(board.toString()).to.equalShape(
      `...
       ...
       ...`
    );
  });

  xit("it cannot be moved left through other blocks", () => {
    expect(board.toString()).to.equalShape(
      `...
       ...
       ...`
    );
  });


  xit("it cannot be moved right through other blocks", () => {
    expect(board.toString()).to.equalShape(
      `...
       ...
       ...`
    );
  });

  xit("it cannot be moved down through other blocks (will stop falling)", () => {
    expect(board.toString()).to.equalShape(
      `...
       ...
       ...`
    );
  });
});

