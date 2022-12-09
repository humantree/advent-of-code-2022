import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(9);

type Direction = 'U' | 'D' | 'L' | 'R';

type Knot = {
  x: number;
  y: number;
};

type Motion = {
  direction: Direction;
  distance: number;
};

const motions = input.map<Motion>((line) => {
  const elements = line.split(' ');
  const direction = elements[0] as Direction;
  const distance = +elements[1];
  return { direction, distance };
});

const head: Knot = { x: 0, y: 0 };
const tail: Knot = { x: 0, y: 0 };

const tailLog: Set<string> = new Set();

const singleStep = (number: number) => {
  if (number > 0) return 1;
  if (number < 0) return -1;
  return 0;
}

const followMotion = (motion: Motion) => {
  const x = motion.direction === 'L' ? -1 : (motion.direction === 'R' ? 1 : 0);
  const y = motion.direction === 'D' ? -1 : (motion.direction === 'U' ? 1 : 0);

  for (let i = 0; i < motion.distance; i++) {
    head.x += x;
    head.y += y;
    updateTail();
    updateTailLog();
  }
};

const updateTail = () => {
  const xDiff = head.x - tail.x;
  const yDiff = head.y - tail.y;

  if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) return;

  if (xDiff === 0) return tail.y += singleStep(yDiff);
  if (yDiff === 0) return tail.x += singleStep(xDiff);

  tail.x += singleStep(xDiff);
  tail.y += singleStep(yDiff);
};

const updateTailLog = () => tailLog.add(JSON.stringify(tail));

motions.forEach(followMotion);

console.log(`The tail of the rope vists ${tailLog.size} positions at least once.`);
