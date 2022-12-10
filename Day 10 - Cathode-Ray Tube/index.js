const { readFileSync } = require("fs");

function readFile1(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  let cycle = 0;
  let X = 1;
  let sum = 0;

  const signalStrength = (controlPoint, X) => {
    return controlPoint * X;
  };

  const controlPoint = [20, 60, 100, 140, 180, 220];

  for (let i = 0; i < arr.length; i++) {
    const instruction = arr[i];
    if (instruction.includes("addx")) {
      X += parseInt(instruction.split(" ")[1]);
      cycle += 2;
      if (controlPoint[0] <= cycle) {
        const temp = X - parseInt(instruction.split(" ")[1]);
        sum += signalStrength(controlPoint[0], temp);
        console.log([
          controlPoint[0],
          temp,
          signalStrength(controlPoint[0], temp),
        ]);
        controlPoint.shift();
      }
    }
    if (instruction.includes("noop")) {
      X += 0;
      cycle += 1;
      if (controlPoint[0] <= cycle) {
        const temp = X;
        sum += signalStrength(controlPoint[0], temp);
        console.log([
          controlPoint[0],
          temp,
          signalStrength(controlPoint[0], temp),
        ]);
        controlPoint.shift();
      }
    }
  }

  console.log("🏆 Part One :", sum);
}

function readFile2(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  let cycle = 0;
  let X = 1;
  let sprite = "###.....................................";
  let res = "";

  for (let i = 0; i < arr.length; i++) {
    const instruction = arr[i];
    if (instruction.includes("addx")) {
      for (let j = 0; j <= 1; j++) {
        if (sprite[cycle % 40] === "#") {
          res += "#";
          cycle += 1;
        } else {
          res += ".";
          cycle += 1;
        }
        if (j === 1) {
          X += parseInt(instruction.split(" ")[1]);
          let newSprite = "";
          for (let j = 0; j < sprite.length; j++) {
            if (j === X - 1 || j === X || j === X + 1) {
              newSprite += "#";
            } else {
              newSprite += ".";
            }
          }
          sprite = newSprite;
        }
      }
    }
    if (instruction.includes("noop")) {
      if (sprite[cycle % 40] === "#") {
        res += "#";
        cycle += 1;
      } else {
        res += ".";
        cycle += 1;
      }
    }
  }

  console.log(res.match(/.{1,40}/g));
}

// readFile1("./data.txt");
readFile2("./data.txt");
