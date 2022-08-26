import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';


class Game {
  field = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.'],
  ];

  player1 = 'cross';
  player2 = 'zero';

  currentPlayer = this.player1;

  setValue(row, column) {
    if (this.currentPlayer === this.player1) {
      this.field[row][column] = 'x';  
    } else {
      this.field[row][column] = '0';  
    }
  }

  checkIsWinHor() {
    for (let i = 0; i < this.field.length; i++) {
      if (this.field[i].join('') === '000') {
        return 'Zero win!';
      }
      if (this.field[i].join('') === 'xxx') {
        return 'Cross win!';
      }
    }

    return null;
  }

  checkIsWinVertical() {
    let i = 0;
    while (i < this.field.length) {
        let vert = [];
        for (let j = 0; j <= this.field[i].length; j++) {
          vert.push(this.field[i][j]);
        }
        if (vert.length === 3) {
          let result = vert.join('');
          if (result === '000') return 'Zero win';
          if (result === 'xxx') return 'Cross win'; 
        }
        ++i;
    }

    return null;
  }

  checkIsWinDiag() {
    let i = 0, j = 0;
    while (i < this.field.length) {
      let result = [];
      result.push(this.field[i][j]);
      ++i; ++j;
      if (result.length === 3) {
        if (result.join('') === '000') return 'Zero win';
        if (result.join('') === 'xxx') return 'Cross win';
      }
    }
    
    i = 0, j = this.field[i].length - 1;
    while (i < this.field.length) {
      let result = [];
      result.push(this.field[i][j]);
      ++i; --j;
      if (result.length === 3) {
        if (result.join('') === '000') return 'Zero win';
        if (result.join('') === 'xxx') return 'Cross win';
      }
    }

    return null;
  }

  checkIsWin() {
    return this.checkIsWinHor() || this.checkIsWinVertical || this.checkIsWinDiag();
  }

  step() {
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i]); 
    }
    
    const rl1 = readline.createInterface({ input, output });

    const row = await rl.question(
    'Row? '
    );

    const rl = readline.createInterface({ input, output });

    const column = await rl.question(
      'Column? '
    );

    this.setValue(row, column);

    const check = this.checkIsWin();

    if (check) {
      return  check;
    }

    this.currentPlayer === this.player1 ? this.currentPlayer = this.player2 : this.currentPlayer = this.player1;

    return this.step();
  }


}

let game = new Game();

game.step();
