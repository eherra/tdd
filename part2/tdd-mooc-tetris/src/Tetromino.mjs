import { IShape } from "./shapes/IShape.mjs";
import { JShape } from "./shapes/JShape.mjs";
import { LShape } from "./shapes/LShape.mjs";
import { OShape } from "./shapes/OShape.mjs";
import { TShape } from "./shapes/TShape.mjs";
import { ZShape } from "./shapes/ZShape.mjs";
import { SShape } from "./shapes/SShape.mjs";

export class Tetromino {
  shape;
  type;
  x;
  y;
  direction;

  static T_SHAPE = new Tetromino(
    `....
      TTT.
      .T..
      ....`,
    "T",
    0,
    3,
    "down"
  );

  static L_SHAPE = new Tetromino(
    `....
      LLL.
      L...
      ....`,
    "L",
    0,
    3,
    "down"
  );

  static J_SHAPE = new Tetromino(
    `....
      JJJ.
      ..J.
      ....`,
    "J",
    0,
    3,
    "down"
  );


  static S_SHAPE = new Tetromino(
    `....
    .SS.
    SS..
    ....`,
    "S",
    0,
    3,
    "left"
  );

  static Z_SHAPE = new Tetromino(
    `....
    ZZ..
    .ZZ.
    ....`,
    "Z",
    0,
    3,
    "left"
  );

  static I_SHAPE = new Tetromino(
    `....
    IIII
    ....
    ....`,
    "I",
    0,
    3,
    "left"
  );

  static O_SHAPE = new Tetromino(
    `....
     .OO.
     .OO.
     ....`,
    "O",
    0,
    3,
    "up"
  );

  constructor(shape, type, x, y, direction) {
    this.shape = this.initShapeAs2DArray(shape);
    this.type = type;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  initShapeAs2DArray(shape) {
    const splitted = shape
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x.length !== 0);
    return splitted.map((x) => [...x]);
  }

  rotateRight() {
    if (this.type === "O") return OShape.getOShape();
    if (this.type === "I") return this.rotateIShape();
    if (this.type === "S") return this.rotateSShape()
    if (this.type === "Z") return this.rotateZShape()
    if (this.type === "T") return this.rotateTShape(true);
    if (this.type === "L") return this.rotateLShape(true)
    if (this.type === "J") return this.rotateJShape(true)

    const rotatedMatrix = this.shape[0].map((val, index) =>
      this.shape.map((row) => row[index]).reverse()
    );
    return new Tetromino(
      this.createMatrixString(rotatedMatrix),
      this.type,
      this.x,
      this.y
    );
  }

  rotateLeft() {
    if (this.type === "O") return OShape.getOShape();
    if (this.type === "I") return this.rotateIShape();
    if (this.type === "S") return this.rotateSShape()
    if (this.type === "Z") return this.rotateZShape()
    if (this.type === "T") return this.rotateTShape(false);
    if (this.type === "L") return this.rotateLShape(false)
    if (this.type === "J") return this.rotateJShape(false)

    return new Tetromino(
      this.createMatrixString(rotatedMatrix),
      this.type,
      this.x,
      this.y
    );
  }

  moveRight() {
    const newShape = this.createMatrixString(this.shape);
    return new Tetromino(newShape, this.type, this.x, this.y + 1, this.direction);
  }

  moveLeft() {
    const newShape = this.createMatrixString(this.shape);
    return new Tetromino(newShape, this.type, this.x, this.y - 1, this.direction);
  }

  moveDown() {
    const newShape = this.createMatrixString(this.shape);
    return new Tetromino(newShape, this.type, this.x + 1, this.y, this.direction);
  }

  createMatrixString(shapeToCreate) {
    let shape = "";
    for (let row = 0; row < shapeToCreate.length; row++) {
      for (let column = 0; column < shapeToCreate[row].length; column++) {
        shape += shapeToCreate[row][column];
      }
      shape += "\n";
    }
    return shape;
  }

  rotateTShape(isRotateRight) {
    switch (this.direction) {
      case "up":
        if (isRotateRight) {
          return TShape.getTShapeRight(this.x, this.y);
        } else {
          return TShape.getTShapeLeft(this.x, this.y);
        }
      case "down":
        if (isRotateRight) {
          return TShape.getTShapeLeft(this.x, this.y);
        } else {
          return TShape.getTShapeRight(this.x, this.y);
        }
      case "left":
        if (isRotateRight) {
          return TShape.getTShapeUp(this.x, this.y);
        } else {
          return TShape.getTShapeDown(this.x, this.y);
        }
      case "right":
        if (isRotateRight) {
          return TShape.getTShapeDown(this.x, this.y);
        } else {
          return TShape.getTShapeUp(this.x, this.y);
        }
    }
  }

  rotateLShape(isRotateRight) {
    switch (this.direction) {
      case "up":
        if (isRotateRight) {
          return LShape.getLShapeRight(this.x, this.y);
        } else {
          return LShape.getLShapeLeft(this.x, this.y);
        }
      case "down":
        if (isRotateRight) {
          return LShape.getLShapeLeft(this.x, this.y);
        } else {
          return LShape.getLShapeRight(this.x, this.y);
        }
      case "left":
        if (isRotateRight) {
          return LShape.getLShapeUp(this.x, this.y);
        } else {
          return LShape.getLShapeDown(this.x, this.y);
        }
      case "right":
        if (isRotateRight) {
          return LShape.getLShapeDown(this.x, this.y);
        } else {
          return LShape.getLShapeUp(this.x, this.y);
        }
    }
  }

  rotateJShape(isRotateRight) {
    switch (this.direction) {
      case "up":
        if (isRotateRight) {
          return JShape.getJShapeRight(this.x, this.y);
        } else {
          return JShape.getJShapeLeft(this.x, this.y);
        }
      case "down":
        if (isRotateRight) {
          return JShape.getJShapeLeft(this.x, this.y);
        } else {
          return JShape.getJShapeRight(this.x, this.y);
        }
      case "left":
        if (isRotateRight) {
          return JShape.getJShapeUp(this.x, this.y);
        } else {
          return JShape.getJShapeDown(this.x, this.y);
        }
      case "right":
        if (isRotateRight) {
          return JShape.getJShapeDown(this.x, this.y);
        } else {
          return JShape.getJShapeUp(this.x, this.y);
        }
    }
  }


  rotateIShape() {
    return IShape.rotateIShape(this.x, this.y, this.direction)
  }

  rotateZShape() {
    return ZShape.rotateZShape(this.x, this.y, this.direction)
  }

  rotateSShape() {
    return SShape.rotateSShape(this.x, this.y, this.direction)
  }

  toString() {
    return this.createMatrixString(this.shape);
  }
}
