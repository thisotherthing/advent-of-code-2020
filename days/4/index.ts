import { parse } from "path";
import { getTextFromLines } from "../../utils/getData";

const data = getTextFromLines(4);

const run = (): number => {
  let validPassports = 0;

  // const modData = data.slice(0, 10);
  const modData = data;

  // console.log(modData);
  let lineBuilder: string[] = [];
  let merged = "";

  modData.forEach(line => {
    if (line.length > 0) {
      lineBuilder.push(line);
    } else {
      merged = lineBuilder.join(" ").trim();
      lineBuilder.length = 0;

      // console.log({merged});

      const isValid =
        merged.includes("byr:")
        && merged.includes("iyr:")
        && merged.includes("eyr:")
        && merged.includes("hgt:")
        && merged.includes("hcl:")
        && merged.includes("ecl:")
        && merged.includes("pid:")
        // && merged.includes("cid:")
        ;

    if (isValid) {
      validPassports++;
    }
    }
  });

  return validPassports;
}
console.log("with all fields passports", run());

const checkYear = (i: string, min: number, max: number): boolean => {
  if (i === undefined && i === null) return false;

  const parsed = parseInt(i, 10);

  if (Number.isNaN(parsed)) return false;

  if (parsed < min || parsed > max) return false;

  return true;
}

const checkHeight = (height: string): boolean => {

  if (height === undefined || height === null) return false;

  if (!height.endsWith("cm") && !height.endsWith("in")) return false;

  const parsed = parseInt((height.match(/\d+/) || [])[0], 10);

  if (Number.isNaN(parsed)) return false;

  if (height.endsWith("cm") && (parsed < 150 || parsed > 193)) return false;
  if (height.endsWith("in") && (parsed < 59 || parsed > 76)) return false;
  

  return true;
}

const checkHairColor = (i: string): boolean => {
  if (i === undefined || i === null) return false;
  
  return i.match(/#[0-9a-f]{6}/) !== null;
};

const checkPid = (i: string): boolean => {
  if (i === undefined || i === null) return false;
  if (i.length !== 9) return false;
  return i.match(/[0-9]{9}/) !== null
}

const eyeColors = [
  "amb",
  "blu",
  "brn",
  "gry",
  "grn",
  "hzl",
  "oth",
];

const runExtra = (): {withAllFields: number, valid: number, invalid: number} => {
  let withAllFields = 0;
  let validPassports = 0;
  let invalidPassports = 0;

  // const modData = data.slice(0, 10);
  const modData = data;

  modData.push("");

  // console.log(modData);
  let lineBuilder: string[] = [];
  let merged = "";

  modData.forEach(line => {
    if (line.length > 0) {
      lineBuilder.push(line);
    } else {
      merged = lineBuilder.join(" ").trim();
      lineBuilder.length = 0;

      // console.log({merged});

      const hasAllFields =
        merged.includes("byr:")
        && merged.includes("iyr:")
        && merged.includes("eyr:")
        && merged.includes("hgt:")
        && merged.includes("hcl:")
        && merged.includes("ecl:")
        && merged.includes("pid:")
        // && merged.includes("cid:")
        ;

      if (hasAllFields) {
        withAllFields++;

        const byr = (merged.match(/byr:([0-9]{4})/) || [])[1];
        const iyr = (merged.match(/iyr:([0-9]{4})/) || [])[1];
        const eyr = (merged.match(/eyr:([0-9]{4})/) || [])[1];
        const hgt = (merged.match(/hgt:([0-9]+(cm|in))/) || [])[1];
        const hcl = (merged.match(/hcl:([a-zA-Z0-9#]+)/) || [])[1];
        const ecl = (merged.match(/ecl:([a-zA-Z0-9#]+)/) || [])[1];
        const pid = (merged.match(/pid:([0-9]+)/) || [])[1];
        const cid = (merged.match(/cid:([a-zA-Z0-9#]+)/) || [])[1];

        if (
          checkYear(byr, 1920, 2002)
          && checkYear(iyr, 2010, 2020)
          && checkYear(eyr, 2020, 2030)
          && checkHeight(hgt)
          && checkHairColor(hcl)
          && eyeColors.includes(ecl.trim())
          && checkPid(pid)
        ) {
          validPassports++;
        } else {
          invalidPassports++;
        }

      }
    }
  });

  return {valid: validPassports, invalid: invalidPassports, withAllFields};
}
console.log("extra", runExtra());

console.log("byr 2002", checkYear("2002", 1920, 2002));
console.log("byr 2003", checkYear("2003", 1920, 2002));

console.log("60in", checkHeight("60in"));
console.log("190cm", checkHeight("190cm"));
console.log("190in", checkHeight("190in"));
console.log("190", checkHeight("190"));

console.log("#123abc", checkHairColor("#123abc"));
console.log("#123abz", checkHairColor("#123abz"));
console.log("123abc", checkHairColor("123abc"));

console.log("brn", eyeColors.includes("brn".trim()));
console.log("wat", eyeColors.includes("wat".trim()));

console.log("000000001", checkPid("000000001"));
console.log("0123456789", checkPid("0123456789"));
