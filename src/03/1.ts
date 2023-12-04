import readline from "readline";
import fs from "fs";

const lineReader = readline.createInterface({
    input: fs.createReadStream("./src/03/input.txt"),
});

let lines: string[][] = [];

lineReader.on("line", (line) => {
    lines.push(line.split(""));
});

lineReader.on("close", () => {
    let sumOfPartNumbers = 0;

    lines.forEach((line, rowIndex) => {
        let partNumber = "";
        let isValidPartNumber = false;
        line.forEach((char, columnIndex) => {            
            // dots can be skipped, if we were working on a number, we end now
            if (char === ".") {
                ifValidPartNumberAddToTotalAndReset();
            }
            // special char, if we were working on a number, we end now
            if (checkForSpecialChar(char)) {
                ifValidPartNumberAddToTotalAndReset();
            }
            // number char, add to partnumber and check surroundings if valid
            if ("0123456789".indexOf(char) >= 0) {
                // add char to number
                partNumber = partNumber + "" + char;
                
                // if line end reached
                if (columnIndex === line.length -1) {
                    // if we were working on a number, we end now
                    ifValidPartNumberAddToTotalAndReset();
                }

                // if it is not already valid
                if (!isValidPartNumber) {
                    // check all adjacent cells for special chars, if true, than it is valid part
                    // top left
                    if (checkCellForSpecialChar(rowIndex - 1, columnIndex - 1)) {
                        isValidPartNumber = true;
                        return;
                    }
                    // top
                    if (checkCellForSpecialChar(rowIndex - 1, columnIndex)) {
                        isValidPartNumber = true;
                        return;
                    }
                    // top right
                    if (checkCellForSpecialChar(rowIndex - 1, columnIndex + 1)) {
                        isValidPartNumber = true;
                        return;
                    }
                    // left
                    if (checkCellForSpecialChar(rowIndex, columnIndex - 1)) {
                        isValidPartNumber = true;
                        return;
                    }
                    // right
                    if (checkCellForSpecialChar(rowIndex, columnIndex + 1)) {
                        isValidPartNumber = true;
                        return;
                    }
                    // bottom left
                    if (checkCellForSpecialChar(rowIndex + 1, columnIndex - 1)) {
                        isValidPartNumber = true;
                        return;
                    }
                    // bottom
                    if (checkCellForSpecialChar(rowIndex + 1, columnIndex)) {
                        isValidPartNumber = true;
                        return;
                    }
                    // bottom right
                    if (checkCellForSpecialChar(rowIndex + 1, columnIndex + 1)) {
                        isValidPartNumber = true;
                        return;
                    }
                }
            }

            function ifValidPartNumberAddToTotalAndReset() {
                if (partNumber !== "" && isValidPartNumber) {
                    sumOfPartNumbers += parseInt(partNumber);
                }
                partNumber = "";
                isValidPartNumber = false;
            }
        });
    });

    console.log(sumOfPartNumbers);

    function checkCellForSpecialChar(row: number, column: number) {
        if (row < 0 || row > lines.length - 1 || column < 0 || column > lines[0].length - 1) {
            return false;
        }
        const char = lines[row][column];
        return checkForSpecialChar(char);
    }

    function checkForSpecialChar(char: string) {
        return Number.isNaN(parseInt(char)) && char !== "." ? true : false;
    }
});
