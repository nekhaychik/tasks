class Game {
  player1 = {
    name: '1',
    myfield: [
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
    ],
    notmyfield: [
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
    ],
    enemy: this.player2,
  }

  player2 = {
    name: '2',
    myfield: [
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
    ],
    notmyfield: [
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
    ],
    enemy: this.player1,
  }

  currentPlayer = this.player1;

  ships = {
    4: 1,
    3: 2,
    2: 3,
    1: 4,
  };

  setShips(player) {
    let row, column;
    // input

    this.set4(player, row, column, pos); //pos - hor or ver

    let i = 0;
    while (i !== this.ships[3]) {
        this.set3(row, column, pos);
        ++i;
    }

    i = 0;
    while (i !== this.ships[2]) {
        this.set2(row, column, pos);
        ++i;
    }

    i = 0;
    while (i !== this.ships[1]) {
        this.set1(row, column, pos);
        ++i;
    }

  }

  checkIsCorrect(field, row, column, pos, type) {

        if (pos === 'horizontal') {
            for (let j = column; j <= column + type; j++) {
                if (j = column && field[row][j - 1] === 'o') {
                    return null;
                }

                if (field[row + 1][j] === 'o' || field[row - 1][j] === 'o') return null;

                if (j = column + type - 1 && field[row][j + 1] === 'o') return null
            }
            return 'correct';
        }

        if (pos === 'vertical') {
            for (let j = row; j <= row + type; j++) {
                if (j = row && field[j - 1][column] === 'o') {
                    return null;
                }

                if (field[j][column + 1] === 'o' || field[j][column - 1] === 'o') return null;

                if (j = row + type - 1 && field[j + 1][column] === 'o') return null
            }
            return 'correct';
        }
  }

  set4(player, row, column, pos) {
    if (pos === 'horizontal') {
        if (column > 6) {
            console.log('Incorrect column')
            let newCol = 1; //input column
            return this.set4(row, newCol, pos);
        }
        for (let i = column; i < column + 4; i++) {
            player.myfield[row][i] = '4';
        }
    }

    if (pos === 'vertical') {
        if (row > 6) {
            console.log('Incorrect row');
            let newRow = 1; // input row
            return this.set4(newRow, column, pos);
        }
        for (let i = row; i < row + 4; i++) {
            player.myfield[i][column] = '4';
        }
    }

  }

  set3(player, row, column, pos) {
    if (!this.checkIsCorrect(player.myfield, row, column, pos, 3)) {
        console.log('Incorre value');
        let newRow, newCol, pos; // input
        return this.set3(player, newRow, newCol, pos);
    }

    if (pos === 'horizontal') {
        if (column > 7) {
            console.log('Incorrect column')
            let newCol = 1; //input column
            return this.set3(row, newCol, pos);
        }
        for (let i = column; i < column + 3; i++) {
            player.myfield[row][i] = '3';
        }
    }

    if (pos === 'vertical') {
        if (row > 7) {
            console.log('Incorrect row');
            let newRow = 1; // input row
            return this.set3(newRow, column, pos);
        }
        for (let i = row; i < row + 3; i++) {
            player.myfield[i][column] = '3';
        }
    }
  }

  set2(){}
  
  set1(){}

  isEnd(field) {
    let result;
    for (let i = 0; i < field.length; i++) {
        result = field[i].find(item => item === '1' || item === '2' || item === '3' || item === '4');
        if (result) return null;
    }
    return 'the end';
  }

  play() {
    let row, column; // input
    if (this.currentPlayer.enemy.myfield[row][column] !== '') {
        this.currentPlayer.notmyfield[row][column] = '!';
        this.currentPlayer.enemy.myfield[row][column] = 'x';
        if (this.isEnd(this.currentPlayer.enemy.myfield)) {
            console.log(`${this.currentPlayer.name} win`);
            return 0;
        } else return this.play();
    } else {
        this.currentPlayer.notmyfield[row][column] = '.';
        this.currentPlayer.enemy.myfield[row][column] = '.';
        this.currentPlayer = this.currentPlayer.enemy;
        return this.play();
    }

  }
}