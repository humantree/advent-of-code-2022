import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(15);

const ROW = 2000000;
const MIN_XY = 0;
const MAX_XY = 4000000;

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

  rangeCoveredInRow(row: number) {
    const distance = Math.abs(row - this.location.y);
    const firstSpace = this.location.x - (this.radius - distance);
    const lastSpace = this.location.x + (this.radius - distance);
    return [firstSpace, lastSpace];
  }
}

const sensors = input.map((line) => {
  const [sensorData, beaconData] = line.split(':');
  const [sensorX, sensorY] = sensorData.match(/-?\d+/g).map((v) => +v);
  const [beaconX, beaconY] = beaconData.match(/-?\d+/g).map((v) => +v);
  return new Sensor({ x: sensorX, y: sensorY }, { x: beaconX, y: beaconY });
});

const beacons = [
  ...new Set(sensors.map((sensor) => JSON.stringify(sensor.closestBeacon))),
].map((sensor) => JSON.parse(sensor) as Point);

function getCoveredRangesForRow(row: number) {
  return sensors
    .filter((sensor) => Math.abs(row - sensor.location.y) <= sensor.radius)
    .map((sensor) => sensor.rangeCoveredInRow(row))
    .sort((a, b) => (a[0] < b[0] ? -1 : 1));
}

function countCoveredSpacesInRow(row: number) {
  const coveredRanges = getCoveredRangesForRow(row);

  let count = 0;
  let [start, end] = coveredRanges[0];

  for (let i = 1; i < coveredRanges.length; i++) {
    const [rangeStart, rangeEnd] = coveredRanges[i];

    if (rangeStart > end) {
      count += end - start + 1;
      start = rangeStart;
      end = rangeEnd;
    } else if (rangeEnd > end) {
      end = rangeEnd;
    }
  }

  count += end - start + 1;
  return count;
}

function findUncoveredSpaceInRow(row: number) {
  const coveredRanges = getCoveredRangesForRow(row);

  let end = coveredRanges[0][1];

  for (let i = 1; i < coveredRanges.length; i++) {
    const [rangeStart, rangeEnd] = coveredRanges[i];

    if (rangeStart > end) {
      return rangeStart - 1;
    } else if (rangeEnd > end) {
      end = rangeEnd;
    }

    if (end > MAX_XY) return undefined;
  }

  return undefined;
}

function getSpacesWithoutBeaconsInRow(row: number) {
  const coveredSpaces = countCoveredSpacesInRow(row);
  const beaconsInRow = beacons.filter((beacon) => beacon.y === row).length;
  return coveredSpaces - beaconsInRow;
}

const partOneSpacesWithoutBeacons = getSpacesWithoutBeaconsInRow(ROW);

console.log(
  `In row ${ROW} there are ${partOneSpacesWithoutBeacons} positions that cannot contain a beacon`
);

for (let row = MIN_XY; row <= MAX_XY; row++) {
  const uncoveredSpace = findUncoveredSpaceInRow(row);

  if (uncoveredSpace) {
    const tuningFrequency = uncoveredSpace * 4000000 + row;

    console.log(
      `The tuning frequency for the distress beacon is ${tuningFrequency}`
    );

    break;
  }
}
