import readline from "readline";
import fs from "fs";

const lineReader = readline.createInterface({
    input: fs.createReadStream("./src/03/input.txt"),
});

let lines: string[][] = [];
let gears: Gear[] = [];
let parts: Part[] = [];
let gearRatioSum = 0;

type Gear = { rowIndex: number; columnIndex: number };
type Part = { rowIndex: number; startIndex: number | null; endIndex: number | null; partNumber: number | null };

lineReader.on("line", (line) => {
    lines.push(line.split(""));
});

lineReader.on("close", () => {
    lines.forEach((line, rowIndex) => {
        let part: Part = { rowIndex, startIndex: null, endIndex: null, partNumber: null };
        line.forEach((char, columnIndex) => {
            if ("0123456789".indexOf(char) >= 0) {
                if (part.startIndex === null) {
                    part.partNumber = parseInt(char);
                    part.startIndex = columnIndex;
                    part.endIndex = columnIndex;
                } else {
                    part.partNumber = parseInt(part.partNumber + "" + char);
                    part.endIndex = columnIndex;
                    // line end reached, if we were working on a number, we end now
                    if (columnIndex === line.length -1) {
                        parts.push(part);
                        part = { rowIndex, startIndex: null, endIndex: null, partNumber: null };
                    }
                }
            } else {
                if (part.startIndex !== null) {
                    parts.push(part);
                    part = { rowIndex, startIndex: null, endIndex: null, partNumber: null };
                }
            }

            if (char === "*") {
                gears.push({ rowIndex, columnIndex });
            }
        });
    });

    gears.forEach((gear) => {
        // if gear has 2 numbers around then valid
        const partsCloseToGear = parts.filter(
            (part) =>
            gear.rowIndex <= part.rowIndex + 1 &&
            gear.rowIndex >= part.rowIndex - 1 &&
            gear.columnIndex >= part.startIndex! - 1 &&
            gear.columnIndex <= part.endIndex! + 1
        );
        
        if (partsCloseToGear.length === 2) {
            console.log(partsCloseToGear[0].partNumber! * partsCloseToGear[1].partNumber!);
            const ratio = partsCloseToGear[0].partNumber! * partsCloseToGear[1].partNumber!;
            gearRatioSum += ratio;
        }
    });

    console.log(gearRatioSum);
});
