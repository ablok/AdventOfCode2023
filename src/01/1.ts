import readline from "readline";
import fs from "fs";

const lineReader = readline.createInterface({
    input: fs.createReadStream("./src/01/input.txt"),
});

let total = 0;

lineReader.on("line", (line) => {
    const chars = line.split("");
    const firstDigit = findFirstDigit(chars);
    const lastDigit = findFirstDigit(chars.reverse());

    total += parseInt(firstDigit + lastDigit);
});

lineReader.on("close", () => {
    console.log(total);
});

function findFirstDigit(chars: string[]) {
    return chars.find((char) => !Number.isNaN(parseInt(char)))!;
}
