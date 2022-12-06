import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(6);

const datastream = input[0];

const findFirstMarkerOfSize = (markerSize: number) => {
  let markerPosition = 0;

  while (true) {
    const marker = datastream.substring(markerPosition, markerPosition + markerSize);
    if (new Set([...marker]).size === markerSize) break;
    markerPosition++;
  }

  return markerPosition + markerSize;
}

console.log(`The first start-of-packet marker is detected after character ${findFirstMarkerOfSize(4)}.`);
console.log(`The first start-of-message marker is detected after character ${findFirstMarkerOfSize(14)}.`);
