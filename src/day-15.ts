import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(15);

const ROW = 10;

type Point = {
  x: number;
  y: number;
};

class Sensor {
  location: Point;
  closestBeacon: Point;
  radius: number;

  constructor(location: Point, closestBeacon: Point) {
    this.location = location;
    this.closestBeacon = closestBeacon;
    this.radius =
      Math.abs(this.location.x - this.closestBeacon.x) +
      Math.abs(this.location.y - this.closestBeacon.y);
  }

  safeSpacesInRow(row: number) {
    const safeSpaces: Point[] = [];

    const distance = Math.abs(row - this.location.y);
    if (distance > this.radius) return safeSpaces;

    const firstSpace = this.location.x - (this.radius - distance);
    const lastSpace = this.location.x + (this.radius - distance);

    for (let i = firstSpace; i <= lastSpace; i++) {
      safeSpaces.push({ x: i, y: row });
    }

    return safeSpaces;
  }
}

const sensors = input.map((line) => {
  const [sensorData, beaconData] = line.split(':');
  const [sensorX, sensorY] = sensorData.match(/-?\d+/g).map((v) => +v);
  const [beaconX, beaconY] = beaconData.match(/-?\d+/g).map((v) => +v);
  return new Sensor({ x: sensorX, y: sensorY }, { x: beaconX, y: beaconY });
});

const safeSpaces = new Set<string>();
const allBeacons = new Set(
  sensors.map((sensor) => JSON.stringify(sensor.closestBeacon))
);

for (const sensor of sensors) {
  for (const safeSpace of sensor.safeSpacesInRow(ROW)) {
    const space = JSON.stringify(safeSpace);
    if (!allBeacons.has(space)) safeSpaces.add(space);
  }
}

console.log(
  `In row ${ROW} there are ${safeSpaces.size} positions that cannot contain a beacon`
);
