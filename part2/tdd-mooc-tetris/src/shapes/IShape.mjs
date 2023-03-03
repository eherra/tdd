import { Tetromino } from "../Tetromino.mjs";

export class IShape {
  static rotateIShape(x, y, direction) {
    if (direction === "left") {
      return new Tetromino(
        `..I.
        ..I.
        ..I.
        ..I.`,
        "I",
        x,
        y,
        "up"
      );
    }

    return new Tetromino(
      `....
        IIII
        ....
        ....`,
      "I",
      x,
      this.checkIShapeWallKick(y),
      "left"
    );
  }

  static checkIShapeWallKick(y) {
    if (y < 0) return 0;
    if (y > 6) return 6;
    return y;
  }
}
