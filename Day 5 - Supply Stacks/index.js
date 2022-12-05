const { readFileSync } = require("fs");

const port = [
  ["R", "H", "M", "P", "Z"],
  ["B", "J", "C", "P"],
  ["D", "C", "L", "G", "H", "N", "S"],
  ["L", "R", "S", "Q", "D", "M", "T", "F"],
  ["M", "Z", "T", "B", "Q", "P", "S", "F"],
  ["G", "B", "Z", "S", "F", "T"],
  ["V", "R", "N"],
  ["M", "C", "V", "D", "T", "L", "G", "P"],
  ["L", "M", "F", "J", "N", "Q", "W"],
];

function readFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  let topContainer = "";

  for (let i = 0; i < arr.length; i++) {
    const instruction = [
      arr[i].split(" ")[1], // Move
      arr[i].split(" ")[3], // From
      arr[i].split(" ")[5], // To
    ];

    for (let i = 0; i < instruction[0].length; i++) {
      const element = port[instruction[1][-1]];
    }
  }
}

readFile("./data.txt");
