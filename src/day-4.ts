import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(4);

const enumerateSections = (start: number, end: number) => {
  const sections = [];
  for (let i = start; i <= end; i++) sections.push(i);
  return sections;
};

let fullyOverlappingCount = 0;

input.split('\n').forEach((line) => {
  if (!line.length) return;

  const [firstElf, secondElf] = line
    .split(',')
    .map((sections) => {
      const [start, end] = sections.split('-');
      return enumerateSections(+start, +end);
    });

  const primaryElf = firstElf.length < secondElf.length ? firstElf : secondElf;
  const secondaryElf = firstElf.length < secondElf.length ? secondElf : firstElf;

  const fullyOverlapping = primaryElf.find((section) => !secondaryElf.includes(section)) === undefined;
  if (fullyOverlapping) fullyOverlappingCount++;
});

console.log(`The number of assignment pairs where one range fully contains the other is ${fullyOverlappingCount}.`);
