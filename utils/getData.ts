import { readFileSync } from "fs"

export const getNUmbersFromLines = (path: string): number[] => {
  return readFileSync(path, "utf-8")
    .split("\n")
    .map(v => parseInt(v, 10));
}
