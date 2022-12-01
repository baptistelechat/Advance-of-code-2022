const { readFileSync } = require("fs");

function readFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  res = [];
  sum = 0;

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    sum += element != "" ? parseInt(element) : 0;

    if (element === "") {
      res.push(sum);
      sum = 0;
    }
  }

  console.log("🏆 First :", res.sort((x, y) => y - x).slice(0, 1)[0]);
  console.log(
    "🥇🥈🥉 Podium :",
    res
      .sort((x, y) => y - x)
      .slice(0, 3)
      .reduce((a, b) => a + b, 0)
  );
}

readFile("./data.txt");
