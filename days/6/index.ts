import { getTextFromLines } from "../../utils/getData";

const data = getTextFromLines(6);

const run = () => {
  let count = 0;

  let lineBuilder: string[] = [];
  let merged = "";

  data.forEach(line => {
    if (line.length > 0) {
      lineBuilder.push(line);
    } else {
      merged = lineBuilder.join("").replace(/"\s"/g, "").trim();
      lineBuilder.length = 0;

      // console.log(merged);

      const tmpObject: {[key: string]: boolean} = {}

      merged.split("").forEach(c => tmpObject[c] = true);
      count += Object.keys(tmpObject).length;
    }
  });
 
  return count;
}
console.log(run());

const runExtra = () => {
  let count = 0;

  let lineBuilder: string[] = [];
  let merged = "";

  data.forEach(line => {
    if (line.length > 0) {
      lineBuilder.push(line);
    } else {
      merged = lineBuilder.join("").replace(/"\s"/g, "").trim();
      const numLines = lineBuilder.length;
      lineBuilder.length = 0;

      // console.log(merged);

      const tmpObject: {[key: string]: number} = {}

      merged.split("").forEach(c => {
        if (tmpObject[c] === undefined) tmpObject[c] = 0;
        tmpObject[c]++;
      });

      Object.keys(tmpObject).forEach(v => {
        if (tmpObject[v] === numLines) {
          count++;
        }
      })
    }
  });
 
  return count;
}
console.log(runExtra());
