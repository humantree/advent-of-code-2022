import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(5, false);

let stackCount: number;
const stacks = <string[][]>[];
let buildingStacks = true;

input.forEach((line, index) => {
  if (index === 0) {
    stackCount = (line.length + 1) / 4;
    for (let i = 0; i < stackCount; i++) stacks.push([]);
  }

  if (!line.length) {
    buildingStacks = false;
    return;
  }

  if (buildingStacks) {
    line = line.substring(1);
    let stackCounter = 0;

    while (line.length) {
      if (line.charAt(0).match(/[A-Z]/))
        stacks[stackCounter].unshift(line.charAt(0));
      stackCounter++;
      line = line.substring(4)
    }

    return;
  }

  const [numberOfCrates, from, to] = line.match(/\d+/g);
  for (let i = 0; i < +numberOfCrates; i++) {
    const fromStack = +from - 1;
    const toStack = +to - 1;
    const crate = stacks[fromStack].pop();
    stacks[toStack].push(crate);
  }
});

const topCrates = stacks.map((stack) => stack.pop()).join('');
console.log(`The crates that will be on top of each stack are: ${topCrates}`);
