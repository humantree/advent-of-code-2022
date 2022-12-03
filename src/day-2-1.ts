import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(2);

enum MatchResult {
  Loss = 0,
  Draw = 3,
  Victory = 6,
}

class HandShape {
  shape: 'Rock' | 'Paper' | 'Scissors';
  value: number;

  constructor(key: string) {
    switch(key) {
      case 'A':
      case 'X':
        this.shape = 'Rock';
        this.value = 1;
        return;
      case 'B':
      case 'Y':
        this.shape = 'Paper';
        this.value = 2;
        return;
      case 'C':
      case 'Z':
        this.shape = 'Scissors';
        this.value = 3;
    }
  }

  challenge(opponent: HandShape) {
    if (this.shape === opponent.shape) return MatchResult.Draw;
    if ((this.shape === 'Rock' && opponent.shape === 'Scissors') ||
        (this.shape === 'Scissors' && opponent.shape === 'Paper') ||
        (this.shape === 'Paper' && opponent.shape === 'Rock')) return MatchResult.Victory;
    return MatchResult.Loss;
  }
}

let totalScore = 0;

input.split('\n').forEach((line) => {
  if (!line.length) return;

  const [opponent, player] = line.split(' ').map((key) => new HandShape(key));
  const result = player.challenge(opponent);
  totalScore += result + player.value;
});

console.log(`The final score is ${totalScore}`);
