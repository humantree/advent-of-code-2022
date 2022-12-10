import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(10);

let x = 1;
let cycleCount = 0;
let signalStrengths = [];

const add = (value: number) => {
  tick();
  tick();
  x += value;
};

const noop = () => tick();

const tick = () => {
  cycleCount++;
  if ((cycleCount + 20) % 40 === 0) signalStrengths.push(cycleCount * x);
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

console.log(`The total of the signal strengths (20, 60, 100...) is ${totalSignalStrengths}`);
