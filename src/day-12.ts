import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(12);

type Coordinate = {
  x: number;
  y: number;
};

type Node = {
  coordinate: Coordinate;
  cost: number;
};

let startingPosition: Coordinate;
let bestSignal: Coordinate;

const mapTileFromLetter = (letter: string) => letter.charCodeAt(0) - 96;

const map = input.map<number[]>((line, y) =>
  line.split('').map((letter, x) => {
    if (letter === 'S') {
      startingPosition = { x, y };
      return mapTileFromLetter('a');
    }

    if (letter === 'E') {
      bestSignal = { x, y };
      return mapTileFromLetter('z');
    }

    return mapTileFromLetter(letter);
  })
);

const getValidNeighbors = ({ x, y }: Coordinate): Coordinate[] => {
  const currentHeight = map[y][x];

  const up = y > 0 ? { x, y: y - 1 } : undefined;
  const down = y < map.length - 1 ? { x, y: y + 1 } : undefined;
  const left = x > 0 ? { x: x - 1, y } : undefined;
  const right = x <= map[0].length - 1 ? { x: x + 1, y } : undefined;

  return [up, down, left, right].filter((neighbor) => {
    if (!neighbor) return false;
    const height = map[neighbor.y][neighbor.x];
    return height <= currentHeight + 1;
  });
};

const searchMap = () => {
  const queue: Array<Node> = [{ coordinate: startingPosition, cost: 0 }];
  const visited = new Set<string>();

  while (queue.length) {
    const node = queue.shift();

    if (
      node.coordinate.x === bestSignal.x &&
      node.coordinate.y === bestSignal.y
    )
      return node.cost;

    if (visited.has(JSON.stringify(node.coordinate))) continue;
    visited.add(JSON.stringify(node.coordinate));

    queue.push(
      ...getValidNeighbors(node.coordinate).map((neighbor) => ({
        coordinate: neighbor,
        cost: node.cost + 1,
      }))
    );
  }
};

const cost = searchMap();
console.log(`The path was reached in ${cost} steps`);
