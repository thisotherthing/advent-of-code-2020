import { parse } from "path";
import { getTextFromLines } from "../../utils/getData";

const data = getTextFromLines(5);

const parseBinaryNumber = (i: string, lowChar: string, highChar: string): number => {
  const formattedString = i
    .replace(new RegExp(lowChar, "g"), "0")
    .replace(new RegExp(highChar, "g"), "1");

  // console.log(formattedString);
  
  return parseInt(formattedString, 2);
}

interface ISeat {
  row: number;
  column: number;
  id: number;
}

const getSeatFromString = (i: string): ISeat => {
  const result = {
    row: 0,
    column: 0,
    id: 0,
  };

  result.row = parseBinaryNumber(i.split("").slice(0, 7).join(""), "F", "B");
  result.column = parseBinaryNumber(i.split("").slice(7).join(""), "L", "R");
  result.id = result.row * 8 + result.column;

  return result;
};

const run = () => {
  const result = {
    maxId: 0,
    seat: null,
  }

  // const modData = data.slice(0, 10);
  const modData = data.filter(v => v.length > 2);

  // console.log(getSeatFromString("FBFBBFFRLR"));
  // console.log(getSeatFromString("BFFFBBFRRR"));
  // console.log(getSeatFromString("FFFBBBFRRR"));
  // console.log(getSeatFromString("BBFFBBFRLL"));

  const allSeats: ISeat[] = [];

  const usedRows: {[key: number] : boolean} = {};

  for (let row = 0; row < 127; row++)
  {
    for (let column = 0; column < 8; column++)
    {
      allSeats.push({
        row,
        column,
        id: row * 8 + column,
      })
    }
  }

  modData.forEach(line => {
    const seatData = getSeatFromString(line);

    const index = allSeats.findIndex(seat => seat.id === seatData.id);

    allSeats.splice(index, 1);

    if (usedRows[seatData.row] === undefined) usedRows[seatData.row] = true;

    result.maxId = Math.max(
      result.maxId,
      seatData.id,
    );
  });

  const rowsWithSeats = Object.keys(usedRows).map(v => parseInt(v, 10));

  // console.log(rowsWithSeats.length * 8, modData.length);

  result.seat =
    allSeats.filter(s => rowsWithSeats.includes(s.row))
    .filter(s => s.column > 0 && s.column < 7);
 
  return result;
}


console.log(run());
