import readline from "readline";
import fs from "fs";

const lineReader = readline.createInterface({
    input: fs.createReadStream("./src/01/input.txt"),
});

let total = 0;

lineReader.on("line", (line) => {
    const firstNumber = findFirstNunber(line);
    const lastNumber = findLastNumber(line);
    console.log(firstNumber, lastNumber);

    total += parseInt(firstNumber + "" + lastNumber);
});

lineReader.on("close", () => {
    console.log(total);
});

function findFirstNunber(line: string) {
    const { digitIndex, digit } = findDigit(line, "first");
    const foundWord = findWord(line, "first")!;
    if (!foundWord) {
        return digit;
    }
    if (digitIndex < foundWord.wordIndex) {
        return digit;
    } else {
        return foundWord.word;
    }
}

function findLastNumber(line: string) {
    const { digitIndex, digit } = findDigit(line, "last");
    const foundWord = findWord(line, "last");
    if (!foundWord) {
        return digit;
    }
    if (digitIndex > foundWord.wordIndex) {
        return digit;
    } else {
        return foundWord.word;
    }
}

function findDigit(line: string, occurence: Occurence) {
    let chars = line.split("");
    if (occurence === "last") {
        chars = chars.reverse();
    }

    let digitIndex = 0;
    const digit = Number(
        chars.find((char, _index) => {
            digitIndex = _index;
            return !Number.isNaN(parseInt(char));
        })
    );
    if (occurence === "last") {
        digitIndex = chars.length - 1 - digitIndex;
    }
    return { digitIndex: digitIndex, digit };
}

function findWord(line: string, occurence: Occurence) {
    let indexes = [];
    indexes.push({ word: 1, wordIndex: getIndex(line, "one", occurence) });
    indexes.push({ word: 2, wordIndex: getIndex(line, "two", occurence) });
    indexes.push({ word: 3, wordIndex: getIndex(line, "three", occurence) });
    indexes.push({ word: 4, wordIndex: getIndex(line, "four", occurence) });
    indexes.push({ word: 5, wordIndex: getIndex(line, "five", occurence) });
    indexes.push({ word: 6, wordIndex: getIndex(line, "six", occurence) });
    indexes.push({ word: 7, wordIndex: getIndex(line, "seven", occurence) });
    indexes.push({ word: 8, wordIndex: getIndex(line, "eight", occurence) });
    indexes.push({ word: 9, wordIndex: getIndex(line, "nine", occurence) });

    const filtered = indexes.filter((index) => index.wordIndex >= 0);
    const sorted = filtered.sort((a, b) => a.wordIndex - b.wordIndex);
    if (occurence === "first") {
        return sorted[0];
    } else {
        return sorted[sorted.length - 1];
    }
}

function getIndex(line: string, substring: string, occurence: Occurence) {
    switch (occurence) {
        case "first":
            return line.indexOf(substring);
        case "last":
            return line.lastIndexOf(substring);
    }
}

type Occurence = "first" | "last";
