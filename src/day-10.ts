import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(10);

const LINE_WIDTH = 40;

let x = 1;
let line = 0;
let cycleCount = 0;
let signalStrengths: number[] = [];

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
}

input.forEach((instruction) => {
  if (instruction === 'noop') return noop();

  if (instruction.startsWith('addx')) {
    const [_, value] = instruction.split(' ');
    add(+value);
  }
});

const totalSignalStrengths = signalStrengths.reduce(
  (runningTotal, signalStrength) => runningTotal += signalStrength, 0);

console.log(`\nThe total of the signal strengths (20, 60, 100...) is ${totalSignalStrengths}`);
