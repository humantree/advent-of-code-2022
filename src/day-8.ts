import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(8);

const grid = input.map((line) => line.split('').map((number) => +number));
const xMax = grid.length;
const yMax = grid[0].length;

const isDirectionVisible = (trees: number[], maxHeight: number) =>
  trees.reduce((visible, height) => visible && height < maxHeight, true);

const getColumn = (x: number) => grid.map((row) => row[x]);
const getUpTrees = (x: number, y: number) => getColumn(x).slice(0, y).reverse();
const getDownTrees = (x: number, y: number) => getColumn(x).slice(y + 1);
const getLeftTrees = (x: number, y: number) => grid[y].slice(0, x).reverse();
const getRightTrees = (x: number, y: number) => grid[y].slice(x + 1);

const isTreeVisible = (x: number, y: number) => {
  if (x === 0 || x === xMax || y === 0 || y === yMax) return true;

  const tree = grid[y][x];

  const left = getLeftTrees(x, y);
  if (isDirectionVisible(left, tree)) return true;

  const right = getRightTrees(x, y);
  if (isDirectionVisible(right, tree)) return true;

  const up = getUpTrees(x, y);
  if (isDirectionVisible(up, tree)) return true;

  const down = getDownTrees(x, y);
  if (isDirectionVisible(down, tree)) return true;

  return false;
};

const getDirectionScore = (trees: number[], maxHeight: number) => {
  const firstBlocker = trees.findIndex((tree) => tree >= maxHeight);
  return firstBlocker === -1 ? trees.length : firstBlocker + 1;
};

const getScenicScore = (x: number, y: number) => {
  const tree = grid[y][x];
  return (
    getDirectionScore(getUpTrees(x, y), tree) *
    getDirectionScore(getDownTrees(x, y), tree) *
    getDirectionScore(getLeftTrees(x, y), tree) *
    getDirectionScore(getRightTrees(x, y), tree)
  );
};

let visibleCount = 0;
let highestScenicScore = 0;

for (let y = 0; y < yMax; y++) {
  for (let x = 0; x < xMax; x++) {
    if (isTreeVisible(x, y)) visibleCount++;

    const scenicScore = getScenicScore(x, y);
    if (scenicScore > highestScenicScore) highestScenicScore = scenicScore;
  }
}

console.log(`The number of trees that are visible are ${visibleCount}`);
console.log(`The highest scenic score possible is ${highestScenicScore}`);
