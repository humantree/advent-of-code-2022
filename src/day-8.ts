import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(8);

const grid = input.map((line) => line
  .split('')
  .map((number) => +number));

const xMax = grid.length;
const yMax = grid[0].length;

const isDirectionVisible = (trees: number[], maxHeight: number) => {
  return trees.reduce(
    (visible, height) => visible && height < maxHeight,
    true);
};

const isTreeVisible = (x: number, y: number) => {
  if (x === 0 || x === xMax ||
      y === 0 || y === yMax) return true;

  const tree = grid[y][x];

  const left = grid[y].slice(0, x);
  if (isDirectionVisible(left, tree)) return true;

  const right = grid[y].slice(x + 1);
  if (isDirectionVisible(right, tree)) return true;

  const column = grid.map((row) => row[x]);
  const up = column.slice(0, y);
  if (isDirectionVisible(up, tree)) return true;

  const down = column.slice(y + 1);
  if (isDirectionVisible(down, tree)) return true;

  return false;
};

let visibleCount = 0;

for (let y = 0; y < yMax; y++) {
  for (let x = 0; x < xMax; x++) {
    if (isTreeVisible(x, y)) visibleCount++;
  }
}

console.log(`The number of trees that are visible are ${visibleCount}`);
