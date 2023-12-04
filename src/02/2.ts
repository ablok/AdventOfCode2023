import readline from "readline";
import fs from "fs";

const lineReader = readline.createInterface({
    input: fs.createReadStream("./src/02/input.txt"),
});

let totalOfPower = 0;

lineReader.on("line", (line) => {
    let minimumRedCubes = 0;
    let minimumGreenCubes = 0;
    let minimumBlueCubes = 0;

    const idAndGames = line.split(":");
    const games = idAndGames[1].split(";");

    games.forEach((game) => {
        game.split(",").forEach((amountAndColor) => {
            amountAndColor = amountAndColor.trim();
            const amountAndColorArray = amountAndColor.split(" ");
            const amount = parseInt(amountAndColorArray[0]);
            const color = amountAndColorArray[1];
            switch (color) {
                case "red":
                    if (amount > minimumRedCubes) {
                        minimumRedCubes = amount;
                    }
                    break;
                case "green":
                    if (amount > minimumGreenCubes) {
                        minimumGreenCubes = amount;
                    }
                    break;
                case "blue":
                    if (amount > minimumBlueCubes) {
                        minimumBlueCubes = amount;
                    }
                    break;
            }
        });
    });
    const power = minimumRedCubes * minimumGreenCubes * minimumBlueCubes;
    totalOfPower += power;
});

lineReader.on("close", () => {
    console.log(totalOfPower);
});
