const { readFileSync } = require("fs");

function hasRepeatedCharacters(str) {
  // Créer un ensemble vide pour stocker les caractères uniques
  const uniqueChars = new Set();

  // Parcourir chaque caractère de la chaîne
  for (const char of str) {
    // Ajouter le caractère à l'ensemble des caractères uniques
    uniqueChars.add(char);
  }

  // Vérifier si le nombre d'éléments dans l'ensemble est inférieur à la longueur de la chaîne
  return uniqueChars.size < str.length;
}

// Part One
function readFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/).toString();

  // Part One
  for (let i = 0; i < arr.length; i++) {
    if (i > 2) {
      const marker = arr.slice(i - 3, i + 1);
      if (hasRepeatedCharacters(marker) === false) {
        console.log("🏆 Résultat 1 :", i+1);
        break;
      }
    }
  }
  // Part One
  for (let i = 0; i < arr.length; i++) {
    if (i > 12) {
      const marker = arr.slice(i - 13, i + 1);
      if (hasRepeatedCharacters(marker) === false) {
        console.log("🏆 Résultat 2 :", i+1);
        break;
      }
    }
  }
}

readFile("./data.txt");
