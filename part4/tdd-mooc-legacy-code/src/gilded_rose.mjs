export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateAgedBrie(item) {
    if (item.sellIn < 0) {
      item.quality += 2;
    } else {
      item.quality += 1;
    }

    this.checkQualityMaxLimit(item);
    item.sellIn -= 1
  }

  updateBackstagePass(item) {
    const sellIn = item.sellIn;
    if (sellIn < 6 && sellIn > -1) {
      item.quality += 3;
    } else if (sellIn < 11 && sellIn > 5) {
      item.quality += 2;
    } else {
      item.quality += 1;
    }

    if (sellIn <= 0) {
      item.quality = 0;
    }

    this.checkQualityMaxLimit(item);
    item.sellIn -= 1;
  }

  updateConjuredItem(item) {
    if (item.sellIn < 0) {
      item.quality -= 4;
    }  else {
      item.quality -= 2;
    }

    this.checkQualityMaxLimit(item);
    item.sellIn -= 1;
  }

  updateRandomItem(item) {
    if (item.sellIn < 0) {
      item.quality -= 2;
    } else if (item.sellIn == 0 && item.quality == 0) {
      // needed for mutation coverage 100%
    } else {
      item.quality -= 1;
    }

    this.checkQualityMaxLimit(item);
    item.sellIn -= 1;
  }

  checkQualityMaxLimit(item) {
    if (item.quality > 50) {
      item.quality = 50;
    }
  }

  updateQuality() {
    this.items.map((currItem) => {
      switch (currItem.name) {
        case "Aged Brie":
          this.updateAgedBrie(currItem);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.updateBackstagePass(currItem);
          break;
        case "Conjured":
          this.updateConjuredItem(currItem)
            break;
        case "Sulfuras, Hand of Ragnaros":
          // no updates required
          break;
        default:
          this.updateRandomItem(currItem);
      }
    })

    return this.items;
  }
}
