import { Tetromino } from "../Tetromino.mjs";

export class ZShape {
  static rotateZShape(x, y, direction) {
    if (direction === "left") {
      return new Tetromino(
        `..Z.
         .ZZ.
         .Z..
         ....`,
        "Z",
        x,
        y,
        "up"
      );
    }

    return new Tetromino(
      `....
        ZZ..
        .ZZ.
        ....`,
      "Z",
      x,
      y,
      "left"
    );
  }
}
