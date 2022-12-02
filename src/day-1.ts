import { readFileSync } from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = `${__dirname}/../input/day-1.txt`;
const input = readFileSync(inputPath, 'utf8');

const elves = [];
let currentElfIndex = 0;
let biggestElfIndex = 0;

input.split('\n').forEach((line) => {
  if (!line.length) {
    if (elves[currentElfIndex] > elves[biggestElfIndex]) {
      biggestElfIndex = currentElfIndex;
    }

    return currentElfIndex++;
  }

  if (!elves[currentElfIndex]) elves[currentElfIndex] = 0;
  elves[currentElfIndex] += +line;
});

const mostCalories = elves[biggestElfIndex];
console.log(`The elf carrying the most calories is carrying ${mostCalories} calories`);
