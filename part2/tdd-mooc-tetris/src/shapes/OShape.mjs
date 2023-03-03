import { Tetromino } from "../Tetromino.mjs";

export class OShape {
  static getOShape(x, y) {
    return new Tetromino(
      `....
        .OO.
        .OO.
        ....`,
      "O",
      x,
      y,
      "up"
    );
  }
}
