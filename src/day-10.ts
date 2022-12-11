import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(10);

const LINE_WIDTH = 40;

let x = 1;
let line = 0;
let cycleCount = 0;
const signalStrengths: number[] = [];

const add = (value: number) => {
  tick();
  tick();
  x += value;
};

const noop = () => tick();

const tick = () => {
  cycleCount++;
  if ((cycleCount + 20) % 40 === 0) signalStrengths.push(cycleCount * x);

  const spritePositions = [x, x + 1, x + 2];
  const cyclePosition = cycleCount - line * LINE_WIDTH;
  const pixel = spritePositions.includes(cyclePosition) ? '#' : '.';
  process.stdout.write(pixel);

  if (cycleCount % 40 === 0) {
    process.stdout.write('\n');
    line++;
  }
};

input.forEach((instruction) => {
  if (instruction === 'noop') return noop();

  if (instruction.startsWith('addx')) {
    const value = instruction.split(' ')[1];
    add(+value);
  }
});

const total = signalStrengths.reduce((acc, strength) => acc + strength);
console.log(`\nThe total of the signal strengths (20, 60, 100...) is ${total}`);
