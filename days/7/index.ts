import { getTextFromLines } from "../../utils/getData";

type BagData = {[key: string]: {[key: string]: number}};

const data = getTextFromLines(7);

const getBagsThatContain = (bagData: BagData, color: string): string[] => {
  return Object.keys(bagData).filter(key => Object.keys(bagData[key]).includes(color));
}

const getBagThatCanContainRecursivly = (bagData: BagData, color: string, alreadyCounted: {[key: string]: true}) => {
  const alreadyCountedKeys = Object.keys(alreadyCounted);
  const bagsToCheck = getBagsThatContain(bagData, color).filter(c => !alreadyCountedKeys.includes(c));

  bagsToCheck.forEach(bag => alreadyCounted[bag] = true);

  bagsToCheck.forEach(c => getBagThatCanContainRecursivly(bagData, c, alreadyCounted));
}

const getContainedBagsCount = (bagData: BagData, color: string): number => {
  let bagCount = 0;

  // console.log("getContainedBagsCount", color, Object.keys(bagData[color]));

  Object.keys(bagData[color]).forEach(subBag => {
    // console.log({subBag}, bagData[color][subBag], "*", getContainedBagsCount(subBag));
    bagCount += bagData[color][subBag];
    bagCount += bagData[color][subBag] * getContainedBagsCount(bagData, subBag);
  });

  return bagCount;
};

const getBagData = () => {
  const modData = data;

  const bagData: {[key: string]: {[key: string]: number}} = {};

  let split: string[] = [];
  let name = "";
  let subBagName = "";
  let count = 0;

  modData.forEach(line => {

    if (line.length > 0) {
      split = line
        .replace(/bags*/g, "")
        .replace(/\./g, "")
        .split("contain")
        .map(v => v.trim());

      name = split.shift();

      if (bagData[name] === undefined) bagData[name] = {};

      // console.log({line}, name, split)

      split.shift().split(",").forEach(part => {
        const match = part.match(/(\d+) (.+)/);

        // if (line.includes("shiny gold")) console.log(match);

        if (match !== null) {
          count = parseInt(match[1], 10);
          subBagName = match[2].trim();

          bagData[name][subBagName] = count;
        }
      });

    }
  });

  return bagData;
};

const bagData = getBagData();

const possibleBags = {};
getBagThatCanContainRecursivly(bagData, "shiny gold", possibleBags);
console.log("bags that contain shiny", Object.keys(possibleBags).length);


console.log("shiny contains", getContainedBagsCount(bagData, "shiny gold"));
