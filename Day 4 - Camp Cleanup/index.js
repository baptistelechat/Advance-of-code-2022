const { readFileSync } = require("fs");

function readFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  let score1 = 0;
  let score2 = 0;

  for (let i = 0; i < arr.length; i++) {
    const pair = arr[i];
    const [first, second] = pair.split(",");
    const [minFirst, maxFirst] = first.split("-").map(Number);
    const [minSecond, maxSecond] = second.split("-").map(Number);

    if (
      (minFirst >= minSecond && maxFirst <= maxSecond) ||
      (minSecond >= minFirst && maxSecond <= maxFirst)
    ) {
      score1++;
    }
    if (
      (minFirst >= minSecond && minFirst <= maxSecond) ||
      (maxFirst >= minSecond && maxFirst <= maxSecond) ||
      (minFirst <= minSecond && maxFirst >= maxSecond)
    ) {
      score2++;
    }
  }

  console.log("💰 Score 1 :", score1);
  console.log("💰 Score 2 :", score2);
}

readFile("./data.txt");
