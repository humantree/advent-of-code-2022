import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(9);

const ROPE_LENGTH = 10;

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

const rope: Knot[] = [];
for (let i = 0; i < ROPE_LENGTH; i++) rope.push({ x: 0, y: 0});

const head = rope[0];
const tail = rope[rope.length - 1];
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
    updateRope();
    updateTailLog();
  }
};

const updateRope = () => {
  for (let i = 1; i < rope.length; i++) {
    updateKnot(rope[i], rope[i - 1]);
  }
};

const updateKnot = (knot: Knot, leader: Knot) => {
  const xDiff = leader.x - knot.x;
  const yDiff = leader.y - knot.y;

  if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) return;

  if (xDiff === 0) return knot.y += singleStep(yDiff);
  if (yDiff === 0) return knot.x += singleStep(xDiff);

  knot.x += singleStep(xDiff);
  knot.y += singleStep(yDiff);
};

const updateTailLog = () => tailLog.add(JSON.stringify(tail));

motions.forEach(followMotion);

console.log(`The tail of the rope vists ${tailLog.size} positions at least once.`);
