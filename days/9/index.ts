import { parse } from "path";
import { getNumbersFromLines, getTextFromLines } from "../../utils/getData";

const data = getNumbersFromLines(9);
const numLines = data.length;

const preambleLength = 25;

const checkIfValid = (_data: number[], index: number): boolean => {
  const startIndex = index - preambleLength - 1;

  const targetNumber = _data[index];

  for (let i = startIndex; i < index; i++) {
    for (let j = i + 1; j < index; j++) {
      if (_data[i] + _data[j] === targetNumber) return true;
    }
  }

  return false;

  // return result;
}

const getRangeThatMatchesTo = (_data: number[], target: number): [number, number] => {
  const minMax: [number, number] = [-1, -1];

  let sum = 0;

  for (let i = 0, l = _data.length; i < l; i++) {
    let sum = 0;

    for (let j = i; j < l; j++) {
      sum += _data[j];
      if (sum === target) {
        minMax[0] = i;
        minMax[1] = j;
        return minMax;
      }
    }
  }

  return minMax;
};

let invalidNumber: number;

for (let i = preambleLength; i < numLines; i++) {
  if (!checkIfValid(data, i)) {
    console.log("not valid", i, data[i]);
    invalidNumber = data[i];
  }
}

const sumRange = getRangeThatMatchesTo(data, invalidNumber);
const sumValues = data.slice(sumRange[0], sumRange[1]);
const min = Math.min(...sumValues);
const max = Math.max(...sumValues);



console.log(invalidNumber, sumRange, sumValues, min + max);
