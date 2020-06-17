Game = require("./game");

const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const game = new Game({ mark: 'x' }, { mark: 'o' });
game.run(
    reader,
    (winner) => {
        if (winner === undefined) {
            console.log("Draw.")
        } else {
            console.log(`${winner} won!`)
        }
        reader.close();
    }
);
