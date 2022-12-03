import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(3);

const getPriority = (letter: string) => {
  if (letter === letter.toUpperCase()) {
    return letter.charCodeAt(0) - 38;
  } else {
    return  letter.charCodeAt(0) - 96;
  }
};

let cumulativePriority = 0;

input.split('\n').forEach((line) => {
  if (!line.length) return;

  const midpoint = line.length / 2;
  const compartmentOne = [...new Set(line.substring(0, midpoint))];
  const compartmentTwo = [...new Set(line.substring(midpoint))];
  const shared = compartmentOne.filter((item) => compartmentTwo.includes(item));
  const priorities = shared.map(getPriority);
  const totalPriority = priorities.reduce((runningTotal, priority) => runningTotal + priority, 0);
  cumulativePriority += totalPriority;
});

console.log(`The total priority of all items that appear in both compartments of each rucksack is ${cumulativePriority}`);
