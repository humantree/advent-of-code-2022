import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(12);

import chalk from 'chalk';

const ENABLE_DRAWING = false;
const DRAWING_REFRESH_RATE = 100;

type Coordinate = {
  x: number;
  y: number;
};

type MapTile = {
  height: number;
  label: string;
  visited: boolean;
};

type Node = {
  coordinate: Coordinate;
  cost: number;
};

let startingPosition: Coordinate;
let bestSignal: Coordinate;
const lowestPoints: Coordinate[] = [];

const mapTileFromLetter = (letter: string, label?: string | undefined) => ({
  height: letter.charCodeAt(0) - 96,
  label: label || letter,
  visited: false,
});

const map = input.map<MapTile[]>((line, y) =>
  line.split('').map((letter, x) => {
    if (letter === 'S' || letter === 'a') {
      lowestPoints.push({ x, y });
    }

    if (letter === 'S') {
      startingPosition = { x, y };
      return mapTileFromLetter('a', 'S');
    }

    if (letter === 'E') {
      bestSignal = { x, y };
      return mapTileFromLetter('z', 'E');
    }

    return mapTileFromLetter(letter);
  })
);

const getValidNeighbors = ({ x, y }: Coordinate): Coordinate[] => {
  const currentHeight = map[y][x].height;

  const up = y > 0 ? { x, y: y - 1 } : undefined;
  const down = y < map.length - 1 ? { x, y: y + 1 } : undefined;
  const left = x > 0 ? { x: x - 1, y } : undefined;
  const right = x < map[0].length - 1 ? { x: x + 1, y } : undefined;

  return [up, down, left, right].filter((neighbor) => {
    if (!neighbor) return false;
    const height = map[neighbor.y][neighbor.x].height;
    return height <= currentHeight + 1;
  });
};

const delay = (timeoutMS: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeoutMS));
};

const resetMap = () => {
  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      map[y][x].visited = false;
    }
  }
};

const searchMap = async (startingPosition: Coordinate) => {
  const queue: Array<Node> = [{ coordinate: startingPosition, cost: 0 }];
  let finalCost;

  const processNode = async (node: Node) => {
    const { coordinate, cost } = node;
    const { x, y } = coordinate;

    if (x === bestSignal.x && y === bestSignal.y) {
      return (finalCost = cost);
    }

    if (map[y][x].visited) return;
    map[y][x].visited = true;

    queue.push(
      ...getValidNeighbors(coordinate).map((neighbor) => ({
        coordinate: neighbor,
        cost: cost + 1,
      }))
    );

    if (ENABLE_DRAWING) {
      await delay(DRAWING_REFRESH_RATE);
      printMap(cost);
    }
  };

  while (queue.length && !finalCost) {
    const node = queue.shift();
    await processNode(node);
  }

  return finalCost;
};

const printMap = (currentCost: number) => {
  console.clear();

  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    const colored = row.map((tile) =>
      tile.visited ? chalk.bgYellow.black(tile.label) : tile.label
    );

    console.log(colored.join(''));
  }

  console.log(`\nSteps: ${currentCost}`);
};

const cost = await searchMap(startingPosition);
console.log(
  `The fewest steps required to get to the goal from the starting location is ${cost}`
);

let lowestCost = Infinity;
for (const lowestPoint of lowestPoints) {
  resetMap();
  const cost = await searchMap(lowestPoint);
  if (cost < lowestCost) lowestCost = cost;
}

console.log(
  `The fewest steps required to get to the goal from any square with low elevation is ${lowestCost}`
);
