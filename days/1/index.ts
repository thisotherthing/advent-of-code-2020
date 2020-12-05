import { getNumbersFromLines } from "../../utils/getData";

const data = getNumbersFromLines(1);

const run = async () => {
  let addResult: number = 0;

  for (let i = 0, l = data.length; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      addResult = data[i] + data[j];
      if (addResult === 2020) {
        console.log(data[i], data[j], data[i] * data[j]);
        return;
      }
    }
  }
}
run();

const runExtra = async () => {
  let addResult: number = 0;

  for (let i = 0, l = data.length; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      for (let k = j + 1; k < l; k++) {
          addResult = data[i] + data[j] + data[k];
          if (addResult === 2020) {
            console.log(data[i], data[j], data[k], data[i] * data[j] * data[k]);
            return;
          }
      }
    }
  }
}
runExtra();