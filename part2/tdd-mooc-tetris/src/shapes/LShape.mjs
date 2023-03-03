import { Tetromino } from "../Tetromino.mjs";

export class LShape {
  static getLShapeUp(x, y) {
    return new Tetromino(
      `....
        ..L.
        LLL.
        ....`,
      "L",
      x,
      y,
      "up"
    );
  }

  static getLShapeDown(x, y) {
    return new Tetromino(
      `....
      LLL.
      L...
      ....`,
      "L",
      x,
      y,
      "down"
    );
  }

  static getLShapeLeft(x, y) {
    return new Tetromino(
      `LL.
        .L..
        .L..
        ....`,
      "L",
      x,
      this.checkWallKick(y),
      "left"
    );
  }

  static getLShapeRight(x, y) {
    return new Tetromino(
      `.L..
        .L..
        .LL.
        ....`,
      "L",
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
