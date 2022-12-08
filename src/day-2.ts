import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(2);

class MatchResult {
  result: 'Loss' | 'Draw' | 'Victory';
  value: number;

  constructor(key: string) {
    switch (key) {
      case 'X':
      case 'Loss':
        this.result = 'Loss';
        this.value = 0;
        return;
      case 'Y':
      case 'Draw':
        this.result = 'Draw';
        this.value = 3;
        return;
      case 'Z':
      case 'Victory':
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
      case 'X':
      case 'Rock':
        this.shape = 'Rock';
        this.value = 1;
        return;
      case 'B':
      case 'Y':
      case 'Paper':
        this.shape = 'Paper';
        this.value = 2;
        return;
      case 'C':
      case 'Z':
      case 'Scissors':
        this.shape = 'Scissors';
        this.value = 3;
    }
  }

  challenge(opponent: HandShape) {
    if (this.shape === opponent.shape) return new MatchResult('Draw');
    if ((this.shape === 'Rock' && opponent.shape === 'Scissors') ||
        (this.shape === 'Scissors' && opponent.shape === 'Paper') ||
        (this.shape === 'Paper' && opponent.shape === 'Rock')) return new MatchResult('Victory');
    return new MatchResult('Loss');
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

let part1Score = 0;

input.forEach((line) => {
  const [opponent, player] = line.split(' ').map((key) => new HandShape(key));
  const result = player.challenge(opponent);
  part1Score += result.value + player.value;
});

console.log(`The final score for part 1 is ${part1Score}`);

let part2Score = 0;

input.forEach((line) => {
  const codes = line.split(' ');
  const opponent = new HandShape(codes[0]);
  const result = new MatchResult(codes[1]);
  const move = opponent.forceResult(result);
  part2Score += result.value + move.value;
});

console.log(`The final score for part 2 is ${part2Score}`);
