class Board {
    constructor() {
        this.grid = Board.createEmptyGrid();
    }

    static createEmptyGrid () {
        return Array(3)
            .fill()
            .map( el => Array(3).fill() );

    }

    won() {
        let rows = this.grid;
        let columns = this.columns();
        let diagonals = this.diagonals();
        let allLines = rows.concat(columns).concat(diagonals);
        let won = false;
        allLines.forEach( (line) => {
            if (Board.wonOne(line)) {
                won = true;
                this.winMark = line[0];
            }
        })
        return won;
    }

    // board size of 3 is hard coded here
    static wonOne(line) {
        return line[0] && line[0] === line[1] && line[1] === line[2];
    }

    columns() {
        let columns = Board.createEmptyGrid();
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                columns[i][j] = this.grid[j][i];
            }
        }
        return columns;
    }

    diagonals() {
        let diagonals = [[], []];
        for (let i = 0; i < this.grid.length; i++) {
            diagonals[0].push(this.grid[i][i]);
            diagonals[1].push(this.grid[this.grid.length - i - 1][i]);
        }
        return diagonals;
    }

    winner() {
        if (this.won()) {
            return this.winMark;
        }
    }

    empty(pos) {
        return this.grid[pos[0]][pos[1]] === undefined;
    }

    place_mark(pos, mark) {
        if (this.empty(pos)) {
            this.grid[pos[0]][pos[1]] = mark;
            return true;
        } else {
            return false;
        }
    }

    noValidMove() {
        let result = true;
        for (let i = 0; i < this.grid.length; i++){
            for (let j = 0; j < this.grid.length; j++){
                if (this.empty([i, j])) {
                    result = false;
                }
            }
        }
        return result;
    }

    // board size 3 is hared coded here
    print() {
        console.log(this.grid);
    }
}

module.exports = Board;

