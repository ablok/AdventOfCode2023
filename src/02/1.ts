import readline from "readline";
import fs from "fs";

const lineReader = readline.createInterface({
    input: fs.createReadStream("./src/02/input.txt"),
});

const maxRedCubes = 12;
const maxGreenCubes = 13;
const maxBlueCubes = 14;

let totalOfIds = 0;

lineReader.on("line", (line) => {
    const idAndGames = line.split(":");
    const id = parseInt(idAndGames[0].replace("Game ", ""));
    const games = idAndGames[1].split(";");

    let invalid = false;
    games.forEach((game) => {
        game.split(",").forEach((amountAndColor) => {
            amountAndColor = amountAndColor.trim();
            const amountAndColorArray = amountAndColor.split(" ");
            const amount = parseInt(amountAndColorArray[0]);
            const color = amountAndColorArray[1];
            switch (color) {
                case "red":
                    if (amount > maxRedCubes) {
                        invalid = true;
                    }
                case "green":
                    if (amount > maxGreenCubes) {
                        invalid = true;
                    }
                case "blue":
                    if (amount > maxBlueCubes) {
                        invalid = true;
                    }
            }
        });
    });
    if (!invalid) totalOfIds += id;
});

lineReader.on("close", () => {
    console.log(totalOfIds);
});
