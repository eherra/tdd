import { Tetromino } from "../Tetromino.mjs";

export class SShape {
  static rotateSShape(x, y, direction) {
    if (direction === "left") {
      return new Tetromino(
        `S...
         SS..
         .S..
         ....`,
        "S",
        x,
        y,
        "up"
      );
    }

    return new Tetromino(
      `....
      .SS.
      SS..
      ....`,
      "S",
      x,
      y,
      "left"
    );
  }
}
