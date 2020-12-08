import { parse } from "path";
import { getTextFromLines } from "../../utils/getData";

const data = getTextFromLines(8);

interface IResult {
  finished: boolean;
  acc: number;
}

const run = (_data: string[], flipIndex?: number): IResult => {

  const numLines = _data.length;

  let lineIndex = 0;

  let splitLine: string[] = [];
  let instruction = "";
  let parsedNumber = 0;

  let acc = 0;

  let visitedLines: {[key: number]: true} = {};

  while (lineIndex < numLines) {
    if (visitedLines[lineIndex] === true) {
      // console.log("repeated at", {lineIndex}, {acc});
      return {finished: false, acc};
    }

    visitedLines[lineIndex] = true;

    splitLine = _data[lineIndex].split(" ");
    instruction = splitLine[0];
    parsedNumber = parseInt(splitLine[1], 10);

    // flip bit
    if (lineIndex === flipIndex) {
      if (instruction === "jmp") {
        instruction = "nop"
      } else {
        instruction = "jmp"
      }
    }

    // console.log(modData[lineIndex], {instruction}, {parsedNumber});

    if (instruction === "jmp") {
      lineIndex += parsedNumber;
    } else {
      if (instruction === "acc") {
        acc += parsedNumber;
      }
  
      lineIndex++;
    }
  }

  return {finished: true, acc};

  // return result;
}


console.log("at first repeat", run(data));

const jmpOrNopLines = data.map((v, i) => v.startsWith("jmp") || v.startsWith("nop") ? i : -1).filter(v => v >= 0);
// console.log({jmpOrNopLines});

let result: IResult;
let flippedIndex = -1;

for (let i = 0, l = jmpOrNopLines.length; i < l; i++) {
  result = run(data, jmpOrNopLines[i]);

  if (result.finished === true) {
    flippedIndex = i;
    break;
  }
}

if (result.finished) {
  console.log("fixed", `wrong ${data[flippedIndex]} at line ${flippedIndex}`, {result});
} else {
  console.log("no fix found");
}
