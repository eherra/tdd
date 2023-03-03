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
    if (this.type === "O") return this;
    if (this.type === "I") return this.rotateIShape();
    if (this.type === "T") return this.rotateTShape(true);
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
    if (this.type === "O") return this;
    if (this.type === "I") return this.rotateIShape();
    if (this.type === "T") return this.rotateTShape(false);

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
          return this.getTShapeRight();
        } else {
          return this.getTShapeLeft();
        }
      case "down":
        if (isRotateRight) {
          return this.getTShapeLeft();
        } else {
          return this.getTShapeRight();
        }
      case "left":
        if (isRotateRight) {
          return this.getTShapeUp();
        } else {
          return this.getTShapeDown();
        }
      case "right":
        if (isRotateRight) {
          return this.getTShapeDown();
        } else {
          return this.getTShapeUp();
        }
    }
  }

  rotateIShape() {
    if (this.direction === "left") {
      return new Tetromino(
        `..I.
        ..I.
        ..I.
        ..I.`,
        "I",
        this.x,
        this.y,
        "up"
      );
    }

    return new Tetromino(
      `....
        IIII
        ....
        ....`,
      "I",
      this.x,
      this.checkIShapeWallKick(this.y),
      "left"
    );
  }

  toString() {
    return this.createMatrixString(this.shape);
  }

  getTShapeUp() {
    return new Tetromino(
      `....
      .T..
      TTT.
      ....`,
      "T",
      this.x,
      this.y,
      "up"
    );
  }

  getTShapeDown() {
    return new Tetromino(
      `....
       TTT.
       .T..
       ....`,
      "T",
      this.x,
      this.y,
      "down"
    );
  }

  getTShapeLeft() {
    return new Tetromino(
      `.T..
       TT..
       .T..
       ....`,
      "T",
      this.x,
      this.checkWallKick(this.y),
      "left"
    );
  }

  getTShapeRight() {
    return new Tetromino(
      `.T..
       .TT.
       .T..
       ....`,
      "T",
      this.x,
      this.y,
      "right"
    );
  }

  checkWallKick(y) {
    if (y < 0) return 0;
    if (y > 9) return 9;
    return y
  }

  checkIShapeWallKick(y) {
    if (y < 0) return 0;
    if (y > 6) return 6;
    return y
  }
}
