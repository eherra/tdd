import { expect } from "chai";
import { parsePeopleCsv } from "../src/untestable3_solution.mjs";
import mock from "mock-fs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  afterEach(() => {
    mock.restore()
  });

  it("Parsing should work without age", async () => {
    mock({
      'test/people.csv': 'Loid,Forger,,Male'
    });

    const listOfPersons = await parsePeopleCsv("test/people.csv");
    const expectetedList = [ { firstName: 'Loid', lastName: 'Forger', gender: 'm' } ]
    expect(listOfPersons).to.deep.equal(expectetedList);
  });

  it("Parsing should with all values being present", async () => {
    mock({
      'test/persons.csv': 'Anya,Forger,6,Female'
    });
    const listOfPersons = await parsePeopleCsv("test/persons.csv");
    const expectetedList = [ { firstName: 'Anya', lastName: 'Forger', gender: 'f', age: 6 } ]
    expect(listOfPersons).to.deep.equal(expectetedList);
  });

  it("Parsing should work with 3 persons", async () => {
    mock({
      'test/persons.csv': 'Loid,Forger,,Male\nAnya,Forger,6,Female\nYor,Forger,27,Female'
    });

    const listOfPersons = await parsePeopleCsv("test/persons.csv");
    const expectetedList = [
      { firstName: 'Loid', lastName: 'Forger', gender: 'm' },
      { firstName: 'Anya', lastName: 'Forger', gender: 'f', age: 6 },
      { firstName: 'Yor', lastName: 'Forger', gender: 'f', age: 27 }
    ]
    expect(listOfPersons).to.deep.equal(expectetedList);
  });

  it("Parsing should define gender empty when not present", async () => {
    mock({
      'test/people.csv': 'Loid,Forger,,,'
    });

    const listOfPersons = await parsePeopleCsv("test/people.csv");
    expect(listOfPersons[0].gender).to.equal('');
  });

  it("Parsing should define age as NaN if not numeric string", async () => {
    mock({
      'test/people.csv': 'Loid,Forger,notNumber,Male,'
    });

    const listOfPersons = await parsePeopleCsv("test/people.csv");
    expect(listOfPersons[0].age).to.be.NaN
  });
});
