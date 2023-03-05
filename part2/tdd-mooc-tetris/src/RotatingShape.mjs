export class RotatingShape {
  shape;

  constructor(type) {
    this.shape = this.initShapeAs2DArray(type);
  }

  initShapeAs2DArray(shape) {
    const splitted = shape
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x.length !== 0);
    return splitted.map((x) => [...x]);
  }

  rotateRight() {
    const rotatedMatrix = this.shape[0].map((val, index) =>
      this.shape.map((row) => row[index]).reverse()
    );
    return new RotatingShape(this.createMatrixString(rotatedMatrix));
  }

  rotateLeft() {
    const rotatedMatrix = this.shape[0].map((val, index) =>
      this.shape.map((row) => row[row.length - 1 - index])
    );
    return new RotatingShape(this.createMatrixString(rotatedMatrix));
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

  toString() {
    return this.createMatrixString(this.shape);
  }
}
