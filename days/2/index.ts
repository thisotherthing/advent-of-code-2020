import { getTextFromLines } from "../../utils/getData";

const data = getTextFromLines(2);

const run = async () => {
  let numValidPasswords = 0;

  // const modData = data.slice(0, 10);

  // modData.forEach(line => {
    data.forEach(line => {
    // console.log(line);
    const match = line.match(/^(\d+)-(\d+) (.): (.+)$/);

    // console.log(match, match[1]);

    if (match !== null) {
      const min = parseInt(match[1], 10);
      const max = parseInt(match[2], 10);
      const char = match[3];
      const password = match[4];

      // const count = password.split(char).length;
      const count = (password.match(new RegExp(char, "g")) || []).length;

      if (count >= min && count <= max) numValidPasswords++;
    }

  });

  console.log("valid", numValidPasswords);
}
run();

const runExtra = async () => {
  let numValidPasswords = 0;

  // const modData = data.slice(0, 10);

  // modData.forEach(line => {
    data.forEach(line => {
    // console.log(line);
    const match = line.match(/^(\d+)-(\d+) (.): (.+)$/);

    // console.log(match, match[1]);

    if (match !== null) {
      const first = parseInt(match[1], 10) - 1;
      const second = parseInt(match[2], 10) - 1;
      const char = match[3];
      const password = match[4];

      const firstMatches = password[first] === char;
      const secondMatches = password[second] === char;

      if (
       !(firstMatches && secondMatches)
       && (firstMatches || secondMatches)
      ) {
        numValidPasswords++;
      }
    }

  });

  console.log("valid", numValidPasswords);
}
runExtra();