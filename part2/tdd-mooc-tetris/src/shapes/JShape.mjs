import { Tetromino } from "../Tetromino.mjs";

export class JShape {
  static getJShapeUp(x, y) {
    return new Tetromino(
      `....
        J...
        JJJ.
        ....`,
      "J",
      x,
      y,
      "up"
    );
  }

  static getJShapeDown(x, y) {
    return new Tetromino(
      `....
      JJJ.
      ..J.
      ....`,
      "J",
      x,
      y,
      "down"
    );
  }

  static getJShapeLeft(x, y) {
    return new Tetromino(
      `.J..
       .J..
       JJ..
       ....`,
      "J",
      x,
      this.checkWallKick(y),
      "left"
    );
  }

  static getJShapeRight(x, y) {
    return new Tetromino(
      `.JJ.
       .J..
       .J..
       ....`,
      "J",
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
