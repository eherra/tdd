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
    expect
    (items[0].quality).to.equal(32);
    expect(items[0].sellIn).to.equal(-2);
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

  it("Quality should increase only until 50", () => {
    const gildedRose = new Shop([new Item(BACKSTAGE_PASS, 10, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal(BACKSTAGE_PASS);
    expect(items[0].quality).to.equal(50);
    expect(items[0].sellIn).to.equal(9);
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
});
