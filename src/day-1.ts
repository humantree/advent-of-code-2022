import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(1);

const elves: number[] = [];
let currentElfIndex = 0;

input.split('\n').forEach((line) => {
  if (!line.length) return currentElfIndex++;
  if (!elves[currentElfIndex]) elves[currentElfIndex] = 0;
  elves[currentElfIndex] += +line;
});

const sortedElves = elves.sort((a, b) => b - a);
const topThree = sortedElves.slice(0, 3);
const totalCalories = topThree.reduce((runningTotal, elf) => runningTotal + elf, 0);

console.log(`The elf carrying the most calories is carrying ${sortedElves[0]} calories`);
console.log(`The total calories carried by the top three elves is ${totalCalories} calories`);
