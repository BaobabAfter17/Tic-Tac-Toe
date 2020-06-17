const Board = require("./board")

function Game(player1, player2) {
    this.board = new Board();
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
}

Game.prototype.promptPlayer = function(reader, promptCallback) {
    this.board.print();
    reader.question(
        `${this.currentPlayer.mark} Which row you want to put you mark?`,
        (res) => {
            let rowIndex = parseInt(res);
            reader.question(
                `${this.currentPlayer.mark} Which column you want to put your mark?`,
                (res) => {
                    let columnIndex = res;
                    promptCallback(rowIndex, columnIndex);
                }
            )
        }
    )
}

Game.prototype.switchPlayer = function() {
    this.currentPlayer = (this.currentPlayer === this.player1)
                        ? this.player2
                        : this.player1;
}


Game.prototype.run = function(reader, completionCallback) {
    this.promptPlayer(
        reader,
        (rowIndex, columnIndex) => {
            let pos = [rowIndex, columnIndex];
            if (this.board.empty(pos)) {
                let mark = this.currentPlayer.mark;
                this.board.place_mark(pos, mark);
                if (this.board.won() || this.board.noValidMove()) {
                    completionCallback(this.board.winner());
                } else {
                    this.switchPlayer();
                    this.run(reader, completionCallback);
                }
            }
        }
    );

}

module.exports = Game;
