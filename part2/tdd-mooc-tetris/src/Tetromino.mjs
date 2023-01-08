export class Tetromino {
    static T_SHAPE = new Tetromino(`.T.
                                    TTT
                                    ...`, "T");

    static I_SHAPE = new Tetromino(`.....
                                    .....
                                    IIII.
                                    .....
                                    .....`, "I");

    static O_SHAPE = new Tetromino(`.OO
                                    .OO
                                    ...`, "O");
                                    
    type;
  
    constructor(shape, type) {
        this.shape = this.initShapeAs2DArray(shape);
        this.type = type;
    }

    initShapeAs2DArray(shape) {
        const splitted = shape.split("\n").map(x => x.trim()).filter(x => x.length !== 0);
        return splitted.map(x => [...x]);
    }

    rotateRight() {
        if (this.type === "O") return this;
        if (this.type === "I") return this.rotateIShape();
        const rotatedMatrix = this.shape[0].map((val, index) => this.shape.map(row => row[index]).reverse());
        return new Tetromino(this.createMatrixString(rotatedMatrix));
    }

    rotateLeft() {
        if (this.type === "O") return this;
        if (this.type === "I") return this.rotateIShape();
        const rotatedMatrix = this.shape[0].map((val, index) => this.shape.map(row => row[row.length-1-index]));
        return new Tetromino(this.createMatrixString(rotatedMatrix));
    }

    // quite nasty workaround : )
    rotateIShape() {
        if (this.shape[0][2] !== "I") {
            return new Tetromino(`..I..
                                  ..I..
                                  ..I..
                                  ..I..
                                  .....`, "I"); 
        }

        return new Tetromino(`.....
                              .....
                              IIII.
                              .....
                              .....`, "I");
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