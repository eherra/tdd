import { Tetromino } from "../Tetromino.mjs";

export class TShape {
    static getTShapeUp(x, y) {
    return new Tetromino(
      `....
      .T..
      TTT.
      ....`,
      "T",
      x,
      y,
      "up"
    );
  }

  static getTShapeDown(x, y) {
    return new Tetromino(
      `....
       TTT.
       .T..
       ....`,
      "T",
      x,
      y,
      "down"
    );
  }

  static getTShapeLeft(x, y) {
    return new Tetromino(
      `.T..
       TT..
       .T..
       ....`,
      "T",
      x,
      this.checkWallKick(y),
      "left"
    );
  }

  static getTShapeRight(x, y) {
    return new Tetromino(
      `.T..
       .TT.
       .T..
       ....`,
      "T",
      x,
      y,
      "right"
    );
  }

  static checkWallKick(y) {
    if (y < 0) return 0;
    if (y > 9) return 9;
    return y;
  }
}
