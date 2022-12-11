const { readFileSync } = require("fs");

const parseData = (arr) => {
  const res = [];

  for (let i = 0; i < arr.length; i++) {
    const data = arr[i];
    if (data.includes("Monkey")) {
      res[data] = { items: [], operation: "", test: "" };
    }
    if (data.includes("Starting")) {
      res[arr[i - 1]].items = data
        .split(": ")[1]
        .split(",")
        .map((e) => e.trim());
    }
    if (data.includes("Operation")) {
      res[arr[i - 2]].operation = data.split(" = ")[1];
    }
    if (data.includes("Test")) {
      res[arr[i - 3]].test =
        "num %" +
        data.split(": ")[1].split("divisible by ")[1] +
        " ? " +
        arr[i + 1].split(": ")[1] +
        " : " +
        arr[i + 2].split(": ")[1];
    }
  }

  for (let j = 0; j < Object.keys(res).length; j++) {
    const monkey = res[`Monkey ${j}:`];
    monkey.inspectedItem = 0;
  }

  return res;
};

const superModulo = (arr) => {
  const monkeys = parseData(arr);
  const modulo = [];
  for (let i = 0; i < Object.keys(monkeys).length; i++) {
    const monkey = monkeys[`Monkey ${i}:`];
    modulo.push(monkey.test.split(" ? ")[0].split("num %")[1]);
  }
  return modulo.reduce((a, b) => a * b, 1);
};

function readFile1(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  let monkeys = parseData(arr);

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < Object.keys(monkeys).length; j++) {
      const monkey = monkeys[`Monkey ${j}:`];
      const items = [...monkey.items];
      items.forEach((object) => {
        monkey.inspectedItem += 1;
        const levelOfWorry = eval(monkey.operation.replaceAll("old", object));
        const afterJoyWithItem = Math.floor(levelOfWorry / 3);

        if (
          eval(
            monkey.test.split(" ?")[0].replaceAll("num", afterJoyWithItem)
          ) === 0
        ) {
          monkeys[
            "Monkey " +
              monkey.test.split(" ? ")[1].split(" : ")[0].split("monkey ")[1] +
              ":"
          ].items.push(afterJoyWithItem.toString());
          monkey.items.shift();
        } else {
          monkeys[
            "Monkey " +
              monkey.test.split(" ? ")[1].split(" : ")[1].split("monkey ")[1] +
              ":"
          ].items.push(afterJoyWithItem.toString());
          monkey.items.shift();
        }
      });
    }
  }

  const inspectedItemReport = [];

  for (let j = 0; j < Object.keys(monkeys).length; j++) {
    inspectedItemReport.push(monkeys[`Monkey ${j}:`].inspectedItem);
  }

  const mostActiveMonkeys = inspectedItemReport
    .sort((a, b) => b - a)
    .slice(0, 2);
  console.log("🏆 Part One");
  console.log(monkeys);
  console.log(mostActiveMonkeys[0] * mostActiveMonkeys[1]);
}

function readFile2(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  let monkeys = parseData(arr);

  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < Object.keys(monkeys).length; j++) {
      const monkey = monkeys[`Monkey ${j}:`];
      const items = [...monkey.items];
      items.forEach((object) => {
        monkey.inspectedItem += 1;
        const levelOfWorry = eval(monkey.operation.replaceAll("old", object));
        const afterJoyWithItem = Math.floor(levelOfWorry / 1);

        if (
          eval(
            monkey.test.split(" ?")[0].replaceAll("num", afterJoyWithItem)
          ) === 0
        ) {
          monkeys[
            "Monkey " +
              monkey.test.split(" ? ")[1].split(" : ")[0].split("monkey ")[1] +
              ":"
          ].items.push(afterJoyWithItem % superModulo(arr).toString());
          monkey.items.shift();
        } else {
          monkeys[
            "Monkey " +
              monkey.test.split(" ? ")[1].split(" : ")[1].split("monkey ")[1] +
              ":"
          ].items.push(afterJoyWithItem % superModulo(arr).toString());
          monkey.items.shift();
        }
      });
    }
  }

  const inspectedItemReport = [];

  for (let j = 0; j < Object.keys(monkeys).length; j++) {
    inspectedItemReport.push(monkeys[`Monkey ${j}:`].inspectedItem);
  }

  const mostActiveMonkeys = inspectedItemReport
    .sort((a, b) => b - a)
    .slice(0, 2);
  console.log("🏆 Part Two");
  console.log(monkeys);
  console.log(mostActiveMonkeys[0] * mostActiveMonkeys[1]);
}

readFile1("./data.txt");
readFile2("./data.txt");
