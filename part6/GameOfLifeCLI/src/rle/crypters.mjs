export const decodeRle = (rle) => {
  return rle.replace(/(\d+)([ \w])/g, (_, count, chr) => chr.repeat(count));
};

export const encodeRle = (rle) => {
  return rle.replace(/([ \w])\1+/g, (group, chr) => group.length + chr);
};

export const generateRleStringFromGrid = (grid) => {
  let rleString = "";
  for (let [index, row] of grid.entries()) {
    for (let value of row) {
      rleString += value === 1 ? "o" : "b";
    }
    rleString += index !== grid.length - 1 ? "$" : "!";
  }
  return rleString;
};
