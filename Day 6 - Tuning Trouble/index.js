const { readFileSync } = require("fs");

function hasRepeatedLetters(str) {
  var patt = /^([a-z])\1+$/;
  var result = patt.test(str);
  return result;
}

// Part One
function readFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/).toString();

  // Part One
  let res1 = [];

  for (let i = 0; i < arr.length; i++) {
    if (i > 2) {
      const marker = arr.slice(i - 3, i + 1);
      console.log(hasRepeatedLetters(marker));
    }
  }
}

readFile("./data.txt");
