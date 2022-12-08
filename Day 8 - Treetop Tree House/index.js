const { readFileSync } = require("fs");

// Part One
function readFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  const coord = [];
  const visibleTree = 0;

  for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
    const row = arr[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const column = row[columnIndex];
      const tree = { x: rowIndex, y: columnIndex, value: parseInt(column) };
      coord.push(tree);
    }
  }

  console.log(coord);
}

readFile("./data.txt");
