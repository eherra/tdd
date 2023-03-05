export class ShuffleBag {
  tetromoniesListAll;
  tetromoniesShuffledList;

  constructor() {
    this.tetromoniesListAll = [];
    this.tetromoniesShuffledList = [];
  }

  add(tetromino) {
    this.tetromoniesListAll.push(tetromino);
  }

  draw() {
    if (!this.tetromoniesShuffledList.length) {
      const shuffledArray = this.tetromoniesListAll.sort(
        (_a, _b) => 0.5 - Math.random()
      );
      this.tetromoniesShuffledList = [...shuffledArray];
    }

    return this.tetromoniesShuffledList.pop();
  }
}
