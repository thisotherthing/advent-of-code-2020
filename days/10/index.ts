import { count } from "console";
import { getNumbersFromLines } from "../../utils/getData";

const data = getNumbersFromLines(10);
data.sort((a, b) => a - b);

const modData = JSON.parse(JSON.stringify(data));

// add outlet
modData.unshift(0);

// add internal adapter
modData.push(modData[modData.length - 1] + 3);

const run = (_data: number[], diffs: {[key: number]: number}) => {
  for (let i = 1, l = _data.length; i < l; i++) {
    const diff = _data[i] - _data[i - 1];

    if (diffs[diff] === undefined) diffs[diff] = 0;
    diffs[diff]++;
  }
};
const diffs = {};

run(modData, diffs);

console.log(diffs);
console.log(diffs[1] * diffs[3]);



// recursive
// const runCountingSplits = (_data: number[]): number => {
//   let currentEndNodes = [_data[0]];
//   let possibleOptions = 0;

//   for (let i = 1, l = _data.length; i < l; i++) {
//     currentEndNodes.forEach(v => {
//       if (Math.abs(_data[i] - v) <= 3) {
//         currentEndNodes.push(_data[i]);

//         if (i === l - 1) {
//           possibleOptions++;
//         }
//       }
//     });

//     currentEndNodes = currentEndNodes.filter(v => Math.abs(_data[i] - v) <= 3);
//   }

//   return possibleOptions;
// };
// console.log(runCountingSplits(modData));

// const runCountingSplits = (_data: number[]): number => {
//   let currentEndNodes = [_data[0]];
//   let possibleOptions = 0;

//   for (let i = 1, l = _data.length; i < l; i++) {
//     currentEndNodes.forEach(v => {
//       if (Math.abs(_data[i] - v) <= 3) {
//         currentEndNodes.push(_data[i]);

//         if (i === l - 1) {
//           possibleOptions++;
//         }
//       }
//     });

//     currentEndNodes = currentEndNodes.filter(v => Math.abs(_data[i] - v) <= 3);
//   }

//   return possibleOptions;
// };
// console.log(runCountingSplits(modData));

// interface INode {
//   v: number;
//   p: INode[];
//   c: INode[];
// }

// const allNodes: {[key: number]: INode} = {};

// modData.forEach(v => {
//   allNodes[v] = {
//     v,
//     p: [],
//     c: [],
//   };
// })

// const parseNodes = (_data: number[]) => {

//   for (let i = 0, l = _data.length; i < l; i++) {

//     for (let j = i + 1; j < l; j++) {
//       const diff = _data[j] - _data[i];

//       if (diff <= 3) {
//         if (!allNodes[_data[i]].c.includes(allNodes[_data[j]])) {
//           allNodes[_data[i]].c.push(allNodes[_data[j]]);
//           allNodes[_data[j]].p.push(allNodes[_data[i]]);
//         }
//       } else {
//         break;
//       }
//     }
//   }
// };
// parseNodes(modData);

// const getNumPathsRecursive = (node: INode, endValue: number, counter: {count: number, overflowsCount: number, overflowStep: number}) => {
//   if (node.v === endValue) {
//     counter.count++;

//     if (counter.count >= counter.overflowStep) {
//       counter.overflowsCount++;
//       counter.count = 0;
//     }

//     // if (counter.count % 1000000 === 0) {
//     //   process.stdout.cursorTo(0);
//     //   process.stdout.write(counter.count.toFixed(0));
//     // }
//   }
  
//   node.c.forEach(c => getNumPathsRecursive(c, endValue, counter));
// };



// console.log("before", Object.keys(allNodes).length);

// // // remove nodes with just one parent and child
// // Object.keys(allNodes).reverse().forEach(key => {
// //   const node: INode = allNodes[key];

// //   if (
// //     node.c.length === 1 &&
// //     node.p.length === 1 &&
// //     !node.p[0].c.some(c => c.v === node.c[0].v) // don't remove loop
// //   ) {
// //     node.p[0].c[0] = node.c[0];
// //     node.c[0].p[0] = node.p[0];

// //      delete allNodes[key];
// //   }
// // });

// // merge nodes, if they have a single connection between themselfs
// Object.keys(allNodes).forEach(key => {
//   const node: INode = allNodes[key];

//   if (
//     node.p.length === 1 &&
//     node.p[0].c.length === 1
//   ) {
//     const parent = node.p[0];
//     parent.c.splice(parent.c.findIndex(c => c.v === node.v), 1);

//     node.c.forEach(child => {
//       parent.c.push(child);

//       const nodeIndexInChild = child.p.findIndex(p => p.v === node.v);
//       child.p[nodeIndexInChild] = parent;
//     });

//      delete allNodes[key];
//   }
// });


// console.log("after", Object.keys(allNodes).length);
// // console.log(allNodes);

// Object.keys(allNodes).forEach(key => {
//   const node = allNodes[key];
//   console.log(node.v, "parents", node.p.map(n => n.v).join(","), "children", node.c.map(n => n.v).join(","));
// });

// const allNodesKeys = Object.keys(allNodes);

// const counter = {count: 0, overflowsCount: 0, overflowStep: Number.MAX_SAFE_INTEGER};
// const endValue = allNodes[allNodesKeys[allNodesKeys.length - 1]].v;


// console.time("getNumPathsRecursive");
// getNumPathsRecursive(allNodes[Object.keys(allNodes)[0]], endValue, counter);
// console.timeEnd("getNumPathsRecursive");

// console.log(counter);

// const runSplitsMultiplying = (_data: number[]) => {
//   let result = 1;

//   for (let i = 1, l = _data.length; i < l; i++) {

//     let stepSize = 0;

//     for (let j = i + 1; j < l; j++) {
//       const diff = _data[j] - _data[i];

//       if (diff < 3) {
//         stepSize++
//         // const stepSize = j - i;
//         // if (stepSize > 1) result *= stepSize;
//         // // if (stepSize > 0) result++;

//         // console.log(stepSize);
//         // // i = j - 1;
//         // break;
//       } else {
//         console.log(stepSize);
//         result *= Math.max(stepSize, 1);
//         break;
//       }
//     }
//   }

//   // console.log("t", result);
// };
// runSplitsMultiplying(modData);


const runRecursive = (
  _data: number[],
  startIndex: number,
  endIndex: number,
  ways: {count: number},
) => {
  // currentNumbers.push(_data[startIndex]);

  for (let i = startIndex + 1, l = endIndex; i < l; i++) {
    const diff = _data[i] - _data[startIndex];

    if (diff <= 3) {
      if (i === l - 1) {
        // ways.push(`${currentNumbers.join(", ")}, ${_data[l - 1]}`)
        ways.count++;
      } else {
        runRecursive(
          _data,
          i,
          endIndex,
          // i,
          // JSON.parse(JSON.stringify(currentNumbers)),
          // l,
          ways
        );
      }
    } else {
      break;
    }
  }
};

const ways = {totalCount: 1, count: 0};

let lastCheckIndex = 0;

for (let i = 1, l = modData.length; i < l; i++) {
  const diff = modData[i] - modData[i - 1];

  if (diff === 3) {
    ways.count = 0;
    runRecursive(modData, lastCheckIndex, i, ways);
    lastCheckIndex = i - 1;
    ways.totalCount *= ways.count;
  }
}

console.log(ways);
