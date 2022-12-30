import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(14);

import { writeFileSync } from 'fs';

const ENABLE_PRINTING = false;
const SAND_SOURCE: Point = { x: 500, y: 0 };
const TICK_SPEED_MS = 0;

type Point = {
  x: number;
  y: number;
};

enum Tile {
  air = '.',
  rock = '#',
  sand = 'o',
  source = '+',
}

class Cave {
  width: number;
  height: number;
  origin: Point;

  tiles: Tile[][];

  constructor(lines: Point[][]) {
    let minX = 500;
    let maxX = -Infinity;
    const minY = 0;
    let maxY = -Infinity;

    lines.forEach((line) => {
      line.forEach((point) => {
        const { x, y } = point;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      });
    });

    this.width = maxX - minX + 1;
    this.height = maxY - minY + 1;
    this.origin = { x: minX, y: minY };

    this.tiles = Array.from({ length: this.width }, () =>
      Array.from({ length: this.height }, () => Tile.air)
    );

    this.setTile(SAND_SOURCE.x, SAND_SOURCE.y, Tile.source);

    lines.forEach((points) => {
      for (let i = 1; i < points.length; i++) {
        this.drawLineBetweenPoints(points[i - 1], points[i]);
      }
    });
  }

  drawLineBetweenPoints(a: Point, b: Point) {
    const startingPoint = a.x < b.x || a.y < b.y ? a : b;
    const endingPoint = startingPoint === a ? b : a;
    const axis = a.x === b.x ? 'y' : 'x';

    for (let i = startingPoint[axis]; i <= endingPoint[axis]; i++) {
      const x = axis === 'x' ? i : startingPoint.x;
      const y = axis === 'y' ? i : startingPoint.y;
      this.setTile(x, y, Tile.rock);
    }
  }

  dropSand() {
    let x = SAND_SOURCE.x;
    let y = SAND_SOURCE.y;
    let sandSettled = false;

    while (!sandSettled) {
      if (this.getTile(x, y + 1) === Tile.air) {
        y++;
        continue;
      }

      if (this.getTile(x - 1, y + 1) === Tile.air) {
        x--;
        y++;
        continue;
      }

      if (this.getTile(x + 1, y + 1) === Tile.air) {
        x++;
        y++;
        continue;
      }

      this.setTile(x, y, Tile.sand);
      sandSettled = true;
    }
  }

  getTile(x: number, y: number) {
    const tile = this.tiles[x - this.origin.x][y - this.origin.y];
    if (!tile) throw new Error('Out of bounds');
    return tile;
  }

  print() {
    console.clear();
    for (let x = 0; x < this.height; x++) {
      const row = this.tiles.map((columns) => columns[x][0]).join('');
      console.log(row);
    }
  }

  printToFile() {
    let data = '';

    for (let x = 0; x < this.height; x++) {
      data += this.tiles.map((columns) => columns[x][0]).join('') + '\n';
    }

    writeFileSync('cave.txt', data);
  }

  setTile(x: number, y: number, tile: Tile) {
    this.tiles[x - this.origin.x][y - this.origin.y] = tile;
  }
}

const lines = input.map((line) =>
  line.split(' -> ').map((value) => {
    const [x, y] = value.split(',').map((string) => +string);
    return { x, y } as Point;
  })
);

const cave = new Cave(lines);
let sandCount = 0;

const tick = () => {
  if (ENABLE_PRINTING) cave.printToFile();

  try {
    cave.dropSand();
  } catch {
    console.log(`${sandCount} units of sand can fall before they overflow`);
    process.exit();
  }

  sandCount++;
};

setInterval(tick, TICK_SPEED_MS);
