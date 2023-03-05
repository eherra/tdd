export class ScoringSystem {
  #level;
  #points;

  constructor(level) {
    this.level = level || 0;
    this.points = 0;
  }

  addRowPoints(rowsDeleted) {
    switch (rowsDeleted) {
      case 1:
        this.points += 40 * (this.level + 1);
        break;
      case 2:
        this.points += 100 * (this.level + 1);
        break;
      case 3:
        this.points += 300 * (this.level + 1);
        break;
      case 4:
        this.points += 1200 * (this.level + 1);
        break;
      default:
        throw new Error("Rows deleted amount incorrect");
    }
  }

  addSoftDropPoints() {
    this.points += 1;
  }

  getPoints() {
    return this.points;
  }

  getLevel() {
    return this.level;
  }
}
