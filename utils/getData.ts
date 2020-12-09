import { readFileSync } from "fs"

export const getNumbersFromLines = (index: number): number[] => {
  return readFileSync(`./days/${index}/data.txt`, "utf-8")
    .split("\n")
    .map(v => parseInt(v, 10))
    .filter(v => !Number.isNaN(v));
}

export const getTextFromLines = (index: number): string[] => {
  return readFileSync(`./days/${index}/data.txt`, "utf-8")
    .split("\n");
}
