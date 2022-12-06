import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(6);

const MARKER_SIZE = 4;

const datastream = input[0];
let markerPosition = 0;

while (true) {
  const marker = datastream.substring(markerPosition, markerPosition + MARKER_SIZE);
  if (new Set([...marker]).size === MARKER_SIZE) break;
  markerPosition++;
}

console.log(`The first marker is after character ${markerPosition + MARKER_SIZE}.`);
