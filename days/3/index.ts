import { getTextFromLines } from "../../utils/getData";

const data = getTextFromLines(3);

const run = (slopeX: number, slopeY: number): number => {
  let numTrees = 0;

  // const modData = data.slice(0, 10);
  const modData = data;

  let x = 0;
  let y = 0;

  const end = modData.length - 1;

  // console.log(modData);

  while (y < end) {
    x += slopeX;
    y += slopeY;

    const line = modData[y];

    if (line !== undefined && line[x % line.length] === "#") numTrees++;
  }

  return numTrees;
}
console.log("trees", run(3, 1));

const extraSlopes: number[][] = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

let extraMultiplier = 1;
extraSlopes.forEach(slope => {
  extraMultiplier *= run(slope[0], slope[1]);
});

console.log("muliplied slopes", extraMultiplier);