const { readFileSync } = require("fs");

// Part One
function readFile1(filename) {
  const port = [
    ["Z", "P", "M", "H", "R"], // 1
    ["P", "C", "J", "B"], // 2
    ["S", "N", "H", "G", "L", "C", "D"], // 3
    ["F", "T", "M", "D", "Q", "S", "R", "L"], // 4
    ["F", "S", "P", "Q", "B", "T", "Z", "M"], // 5
    ["T", "F", "S", "Z", "B", "G"], // 6
    ["N", "R", "V"], // 7
    ["P", "G", "L", "T", "D", "V", "C", "M"], // 8
    ["W", "Q", "N", "J", "F", "M", "L"], // 9
  ];

  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  // Part One
  let res1 = [];

  for (let i = 0; i < arr.length; i++) {
    const instruction = [
      parseInt(arr[i].split(" ")[1]), // Move
      parseInt(arr[i].split(" ")[3]), // From
      parseInt(arr[i].split(" ")[5]), // To
    ];

    for (let i = 0; i < instruction[0]; i++) {
      const element = port[instruction[1] - 1].pop();
      port[instruction[2] - 1].push(element);
    }
  }

  for (let i = 0; i < port.length; i++) {
    res1.push(port[i][port[i].length - 1]);
  }

  console.log("🏆 Part 1 :", res1.toString().replaceAll(",", ""));
}

// Part Two
function readFile2(filename) {
  const port = [
    ["Z", "P", "M", "H", "R"], // 1
    ["P", "C", "J", "B"], // 2
    ["S", "N", "H", "G", "L", "C", "D"], // 3
    ["F", "T", "M", "D", "Q", "S", "R", "L"], // 4
    ["F", "S", "P", "Q", "B", "T", "Z", "M"], // 5
    ["T", "F", "S", "Z", "B", "G"], // 6
    ["N", "R", "V"], // 7
    ["P", "G", "L", "T", "D", "V", "C", "M"], // 8
    ["W", "Q", "N", "J", "F", "M", "L"], // 9
  ];

  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  // Part One
  let res2 = [];

  for (let i = 0; i < arr.length; i++) {
    const instruction = [
      parseInt(arr[i].split(" ")[1]), // Move
      parseInt(arr[i].split(" ")[3]), // From
      parseInt(arr[i].split(" ")[5]), // To
    ];

    port[instruction[2] - 1].push(
      ...port[instruction[1] - 1].slice(
        port[instruction[1] - 1].length - instruction[0]
      )
    );

    port[instruction[1] - 1].splice(
      port[instruction[1] - 1].length - instruction[0],
      instruction[0]
    );
  }

  for (let i = 0; i < port.length; i++) {
    res2.push(port[i][port[i].length - 1]);
  }

  console.log("🏆 Part 2 :", res2.toString().replaceAll(",", ""));
}

readFile1("./data.txt");
readFile2("./data.txt");
