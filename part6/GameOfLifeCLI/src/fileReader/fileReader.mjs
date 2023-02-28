import { promises as fs } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const readFileAndReturnRle = async (file, test) => {
  const fileUrl = test ? path.join(__dirname, "../../patterns") + file : file;
  const data = await fs.readFile(fileUrl, "utf8");
  return getRleFromFile(data);
};

const getRleFromFile = (data) => {
  const splittedRows = data.split("\n");
  return splittedRows[splittedRows.length - 1];
};
