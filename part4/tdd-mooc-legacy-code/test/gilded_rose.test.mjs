import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

const AGED_BRIE = "Aged Brie"
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert"
const SULFURAS_HAND = "Sulfuras, Hand of Ragnaros"
const RANDOM_ITEM = "Random Item"

describe("Aged brie tests", () => {
  it("Quality should increase by 1 when 10 days left", () => {
    const gildedRose = new Shop([new Item(AGED_BRIE, 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(AGED_BRIE);
    expect(items[0].quality).to.equal(11);
    expect(items[0].sellIn).to.equal(9);
  });

  it("Quality should increase only until 50", () => {
    const gildedRose = new Shop([new Item(AGED_BRIE, 3, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(AGED_BRIE);
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(2);
  });

  it("Quality should increase double when SellIn date passes", () => {
    const gildedRose = new Shop([new Item(AGED_BRIE, -1, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(AGED_BRIE);
    expect(items[0].quality).to.equal(32);
    expect(items[0].sellIn).to.equal(-2);
  });

  it("Quality shoud stay 50 when SellIn date is 0", () => {
    const gildedRose = new Shop([new Item(AGED_BRIE, 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(AGED_BRIE);
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(-1);
  });

  it("Quality shoud increase by one when SellIn is 1", () => {
    const gildedRose = new Shop([new Item(AGED_BRIE, 1, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(AGED_BRIE);
    expect(items[0].quality).to.equal(4);
    expect(items[0].sellIn).to.equal(0);
  });
}),

// Backstage tests
describe("Backstage passes to a TAFKAL80ETC concert tests", () => {
  it("Quality should increase by 1 when 15 days left", () => {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 15, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(BACKSTAGE_PASS);
    expect(items[0].quality).to.equal(11);
    expect(items[0].sellIn).to.equal(14);
  });

  it("Quality should increase by 1 when 11 days left", () => {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 11, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(BACKSTAGE_PASS);
    expect(items[0].quality).to.equal(11);
    expect(items[0].sellIn).to.equal(10);
  });

  it("Quality should increase only until 50", () => {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 10, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(BACKSTAGE_PASS);
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(9);
  });

  it("Quality should go until 50 when SellIn under 6", () => {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 5, 47)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(BACKSTAGE_PASS);
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(4);
  });

  it("Quality should stay at 50", () => {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 5, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(BACKSTAGE_PASS);
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(4);
  });

  it("Quality should increase double when SellIn date passes at 10", () => {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 10, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(BACKSTAGE_PASS);
    expect(items[0].quality).to.equal(32);
    expect(items[0].sellIn).to.equal(9);
  });

  it("Quality should increase triple when SellIn date passes at 5", () => {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 5, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(BACKSTAGE_PASS);
    expect(items[0].quality).to.equal(33);
    expect(items[0].sellIn).to.equal(4);
  });

  it("Quality should go zero when SellIn date passes", () => {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 0, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(BACKSTAGE_PASS);
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-1);
  });

  it("Quality should increase double when SellIn date passes exactly 6", () => {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 6, 30)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(BACKSTAGE_PASS);
    expect(items[0].quality).to.equal(32);
    expect(items[0].sellIn).to.equal(5);
  });
}),

  // Sulfuras, Hand of Ragnaros tests
describe("Sulfuras, Hand of Ragnaros tests", () => {
  it("Quality and SellIn should not decrease", () => {
    const gildedRose = new Shop([new Item(SULFURAS_HAND, 15, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(SULFURAS_HAND);
    expect(items[0].quality).to.equal(10);
    expect(items[0].sellIn).to.equal(15);
  });

  it("Quality and SellIn should stay same when SellIn minus and quality positive", () => {
    const gildedRose = new Shop([new Item(SULFURAS_HAND, -1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(SULFURAS_HAND);
    expect(items[0].quality).to.equal(1);
    expect(items[0].sellIn).to.equal(-1);
  });

  it("Quality and SellIn should stay same when SellIn minus and quality positive", () => {
    const gildedRose = new Shop([new Item(SULFURAS_HAND, 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(SULFURAS_HAND);
    expect(items[0].quality).to.equal(1);
    expect(items[0].sellIn).to.equal(0);
  });
}),
  // Not defined name item
describe("Random Item tests", () => {
  it("Quality and SellIn should decrease by one", () => {
    const gildedRose = new Shop([new Item(RANDOM_ITEM, 15, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(RANDOM_ITEM);
    expect(items[0].quality).to.equal(9);
    expect(items[0].sellIn).to.equal(14);
  });

  it("Quality and SellIn should decrease by two when SellIn date passes", () => {
    const gildedRose = new Shop([new Item(RANDOM_ITEM, -2, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(RANDOM_ITEM);
    expect(items[0].quality).to.equal(1);
    expect(items[0].sellIn).to.equal(-3);
  });

  // to get mutation coverage to 100%, this was needed. might be a bug? quality should go -1 as well
  it("Quality should stay 0", () => {
    const gildedRose = new Shop([new Item(RANDOM_ITEM, 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(RANDOM_ITEM);
    expect(items[0].quality).to.equal(0);
    expect(items[0].sellIn).to.equal(-1);
  });
}),

describe("Shop list tests", () => {
  it("Shop list should be empty", () => {
    const gildedRose = new Shop();
    expect(gildedRose.items.length).to.equal(0);
  });
});
