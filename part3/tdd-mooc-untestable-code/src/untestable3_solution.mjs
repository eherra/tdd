import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

const createPersonObject = (firstName, lastName, age, gender) => {
  const person = {
    firstName,
    lastName,
    gender: parseGenderAsSingleCharacter(gender),
  }
  if (age) {
    person.age = parseInt(age);
  }
  return person;
}

const parseGenderAsSingleCharacter = (gender) => {
  return gender?.charAt(0).toLowerCase();
}

const readFileSafeAndReturn = async (filePath) => {
  try {
    return await readFile(filePath, { encoding: "utf8" });
  } catch (error) {
    console.log(error)
    throw Error('Failed to read file from path ' + filePath);
  }
}

export const parsePeopleCsv = async (filePath) => {
  const csvData = await readFileSafeAndReturn(filePath);
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });

  return records.map(([firstName, lastName, age, gender]) => {
    return createPersonObject(firstName, lastName, age, gender);
  });
}
