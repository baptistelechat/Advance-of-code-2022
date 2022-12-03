const { readFileSync } = require("fs");

const point = (c) => {
  if (c.charCodeAt(0) >= 97) {
    return c.charCodeAt(0) - 96;
  } else {
    return c.charCodeAt(0) - 64 + 26;
  }
};

function readFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  // Part One
  let score = 0;

  for (let i = 0; i < arr.length; i++) {
    const bag = arr[i];

    const partOne = bag.slice(0, bag.length / 2);
    const partTwo = bag.slice((bag.length + 1) / 2);

    for (let j = 0; j < partOne.length; j++) {
      const char = partOne[j];
      if (partTwo.indexOf(char) !== -1) {
        score += point(partTwo[partTwo.indexOf(char)]);
        break;
      }
    }
  }

  console.log("🎯 Priorité (Part One) :", score);

  // Part Two
  score = 0;

  for (let i = 1; i < arr.length + 1; i++) {
    if (i % 3 === 0) {
      const bag0 = arr[i - 3];
      const bag1 = arr[i - 2];
      const bag2 = arr[i - 1];

      const group = [bag0, bag1, bag2];

      const indexOfMaxLength = group
        .map((bag) => bag.length)
        .indexOf(Math.max(...group.map((bag) => bag.length)));

      for (const j in group[indexOfMaxLength]) {
        const char = group[indexOfMaxLength][j];
        if (indexOfMaxLength === 0) {
          if (bag1.indexOf(char) !== -1 && bag2.indexOf(char) !== -1) {
            score += point(char);
            break;
          }
        }
        if (indexOfMaxLength === 1) {
          if (bag0.indexOf(char) !== -1 && bag2.indexOf(char) !== -1) {
            score += point(char);
            break;
          }
        }
        if (indexOfMaxLength === 2) {
          if (bag0.indexOf(char) !== -1 && bag1.indexOf(char) !== -1) {
            score += point(char);
            break;
          }
        }
      }
    }
  }
  console.log("🎯 Priorité (Part Two) :", score);
}

readFile("./data.txt");
