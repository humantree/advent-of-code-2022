import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(13, true);

const normalizeArray = (packet: unknown) =>
  Array.isArray(packet) ? packet : [packet];

const checkArrayOrder = (left: unknown[], right: unknown[]) => {
  for (let i = 0; i < left.length; i++) {
    const l = left[i];
    const r = right[i];

    if (r === undefined) return false;

    if (Array.isArray(l) || Array.isArray(r)) {
      const result = checkArrayOrder(normalizeArray(l), normalizeArray(r));
      if (result !== undefined) return result;
      else continue;
    }

    if (+l === +r) continue;
    return +l < +r;
  }

  if (left.length === right.length) return undefined;
  return true;
};

const checkOrder = (left: unknown[], right: unknown[]) => {
  if (!right.length) return false;

  const result = checkArrayOrder(left, right);
  if (result !== undefined) return result;

  return true;
};

let indexTotal = 0;

for (let i = 0; i < input.length; i += 2) {
  const left = JSON.parse(input[i]);
  const right = JSON.parse(input[i + 1]);
  const isOrdered = checkOrder(left, right);

  if (isOrdered) {
    const pairIndex = Math.ceil((i + 1) / 2);
    indexTotal += pairIndex;
  }
}

console.log(`The sum of the indices of the ordered pairs is ${indexTotal}`);

const dividerPackets = ['[[2]]', '[[6]]'];
const sorted = [...input, ...dividerPackets].sort((a, b) =>
  checkOrder(JSON.parse(a), JSON.parse(b)) ? -1 : 1
);

const firstDivider = sorted.indexOf('[[2]]') + 1;
const secondDivider = sorted.indexOf('[[6]]') + 1;
const decoderKey = firstDivider * secondDivider;
console.log(`The decoder key for the distress signal is ${decoderKey}`);
