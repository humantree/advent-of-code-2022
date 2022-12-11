import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(4);

const enumerateSections = (start: number, end: number) => {
  const sections = [];
  for (let i = start; i <= end; i++) sections.push(i);
  return sections;
};

let fullyOverlappingCount = 0;
let anyOverlappingCount = 0;

input.forEach((line) => {
  const [elfA, elfB] = line.split(',').map((sections) => {
    const [start, end] = sections.split('-');
    return enumerateSections(+start, +end);
  });

  const primaryElf = elfA.length < elfB.length ? elfA : elfB;
  const secondaryElf = elfA.length < elfB.length ? elfB : elfA;

  const fullyOverlapping =
    primaryElf.find((section) => !secondaryElf.includes(section)) === undefined;
  if (fullyOverlapping) fullyOverlappingCount++;

  const anyOverlapping =
    primaryElf.find((section) => secondaryElf.includes(section)) !== undefined;
  if (anyOverlapping) anyOverlappingCount++;
});

console.log(
  `The number of assignment pairs where one range fully contains the other is ${fullyOverlappingCount}.`
);

console.log(
  `The number of assignment pairs where one range overlaps at all with the other is ${anyOverlappingCount}.`
);
