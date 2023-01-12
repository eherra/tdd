import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

export async function parsePeopleCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}

// file system is a global variable => parsePeopleCsv funtion reads from filesystem => mock file system for testing with fs-mock

// gender.charAt(0) => expecting that gender exists on the row, if it doesnt, this will lead to an error

// person.age = parseInt(age); => expecting that "age" is string which is numeric value being NaN

// creating the person-object should be its own method

// no try-catch on reading filesystme
