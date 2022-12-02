const { readFileSync } = require("fs");

const opponent = {
  A: 0, // Pierre
  B: 0, //Papier
  C: 0, //Ciseau
};

const player = {
  X: 1, // Pierre
  Y: 2, //Papier
  Z: 3, //Ciseau
};

const partyPoint = {
  win: 6,
  duce: 3,
  lose: 0,
};

const winParty = ["A Y", "B Z", "C X"];
const duceParty = ["A X", "B Y", "C Z"];
const loseParty = ["A Z", "B X", "C Y"];

function readFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  // Part 1
  let score = 0;

  for (let i = 0; i < arr.length; i++) {
    const party = arr[i];
    if (winParty.includes(party)) {
      score += partyPoint.win;
    }
    if (duceParty.includes(party)) {
      score += partyPoint.duce;
    }
    if (party.includes("X")) {
      score += player.X;
    }
    if (party.includes("Y")) {
      score += player.Y;
    }
    if (party.includes("Z")) {
      score += player.Z;
    }
  }

  console.log("💰 Part 1 : ", score);

  // Part 2
  score = 0;

  for (let i = 0; i < arr.length; i++) {
    const party = arr[i];

    if (party.includes("X")) {
      score += partyPoint.lose;
      score +=
        player[
          loseParty[
            loseParty.findIndex((v) => v.charAt(0) === party.charAt(0))
          ].charAt(2)
        ];
    }
    if (party.includes("Y")) {
      score += partyPoint.duce;
      score +=
        player[
          duceParty[
            loseParty.findIndex((v) => v.charAt(0) === party.charAt(0))
          ].charAt(2)
        ];
    }
    if (party.includes("Z")) {
      score += partyPoint.win;
      score +=
        player[
          winParty[
            loseParty.findIndex((v) => v.charAt(0) === party.charAt(0))
          ].charAt(2)
        ];
    }
  }

  console.log("💰 Part 2 : ", score);
}

readFile("./data.txt");
