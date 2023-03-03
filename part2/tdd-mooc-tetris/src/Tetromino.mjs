export class Tetromino {
  x;
  y;
  shape;
  type;

  static T_SHAPE = new Tetromino(
    `....
      TTT.
      .T..
      ....`,
    "T",
    0,
    3
  );

  static I_SHAPE = new Tetromino(
    `....
    IIII
    ....
    ....`,
    "I",
    0,
    3
  );

  static O_SHAPE = new Tetromino(
    `.OO
    .OO
    ...`,
    "O",
    0,
    3
  );

  constructor(shape, type, x, y) {
    this.shape = this.initShapeAs2DArray(shape);
    this.type = type;
    this.x = x;
    this.y = y;
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
    const rotatedMatrix = this.shape[0].map((val, index) =>
      this.shape.map((row) => row[row.length - 1 - index])
    );
    return new Tetromino(
      this.createMatrixString(rotatedMatrix),
      this.type,
      this.x,
      this.y
    );
  }

  moveRight() {
    const newShape = this.createMatrixString(this.shape);
    return new Tetromino(newShape, this.type, this.x, this.y + 1);
  }

  moveLeft() {
    const newShape = this.createMatrixString(this.shape);
    return new Tetromino(newShape, this.type, this.x, this.y - 1);
  }

  moveDown() {
    const newShape = this.createMatrixString(this.shape);
    return new Tetromino(newShape, this.type, this.x + 1, this.y);
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

  // quite nasty workaround : )
  rotateIShape() {
    if (this.shape[0][2] !== "I") {
      return new Tetromino(
        `..I.
        ..I.
        ..I.
        ..I.`,
        "I",
        this.x,
        this.y
      );
    }

    return new Tetromino(
      `....
        IIII
        ....
        ....`,
      "I",
      this.x,
      this.y
      );
  }

  toString() {
    return this.createMatrixString(this.shape);
  }
}
