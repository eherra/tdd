export class Block {
  x;
  y;
  isFalling;
  shape;
  type;

  constructor(type) {
    this.x = 0;
    this.y = 1;
    this.shape = [[1]]
    this.type = type
    this.isFalling = true;
  }
}
