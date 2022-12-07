const { readFileSync } = require("fs");

function readFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  const fileSystem = {};

  let currentDir = "/";

  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    if (row.startsWith("$ cd ")) {
      const command = row.split(" ")[2];
      if (command == "/") {
        if (!fileSystem.hasOwnProperty(command)) {
          fileSystem[command] = 0;
        }
        currentDir = "/";
      } else if (command == "..") {
        const temp = currentDir.split("/");
        temp.pop();
        curentDir = temp.join("/") + "/";
      } else {
        currentDir = currentDir + command + "/";
        if (!fileSystem.hasOwnProperty(currentDir)) {
          fileSystem[currentDir] = 0;
        }
      }
    }
  }

  console.log(fileSystem);
}

readFile("./data.txt");
