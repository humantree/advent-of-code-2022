import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(2);

class MatchResult {
  result: 'Loss' | 'Draw' | 'Victory';
  value: number;

  constructor(key: string) {
    switch (key) {
      case 'X':
        this.result = 'Loss';
        this.value = 0;
        return;
      case 'Y':
        this.result = 'Draw';
        this.value = 3;
        return;
      case 'Z':
        this.result = 'Victory';
        this.value = 6;
    }
  }
}

class HandShape {
  shape: 'Rock' | 'Paper' | 'Scissors';
  value: number;

  constructor(key: string) {
    switch (key) {
      case 'A':
      case 'Rock':
        this.shape = 'Rock';
        this.value = 1;
        return;
      case 'B':
      case 'Paper':
        this.shape = 'Paper';
        this.value = 2;
        return;
      case 'C':
      case 'Scissors':
        this.shape = 'Scissors';
        this.value = 3;
    }
  }

  forceResult(result: MatchResult) {
    if (result.result === 'Draw') return this;

    if (result.result === 'Victory') {
      if (this.shape === 'Rock') return new HandShape('Paper');
      if (this.shape === 'Paper') return new HandShape('Scissors')
      if (this.shape === 'Scissors') return new HandShape('Rock');
    }

    if (result.result === 'Loss') {
      if (this.shape === 'Rock') return new HandShape('Scissors');
      if (this.shape === 'Paper') return new HandShape('Rock')
      if (this.shape === 'Scissors') return new HandShape('Paper');
    }
  }
}


let totalScore = 0;

input.forEach((line) => {
  const codes = line.split(' ');
  const opponent = new HandShape(codes[0]);
  const result = new MatchResult(codes[1]);
  const move = opponent.forceResult(result);

  console.log(`The opponent played ${opponent.shape}. To force a ${result.result} you should play ${move.shape}.`);
  totalScore += result.value + move.value;
});

console.log(`The final score is ${totalScore}`);
