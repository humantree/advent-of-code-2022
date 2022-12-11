import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(6);

const datastream = input[0];

const findFirstMarkerOfSize = (markerSize: number) => {
  for (
    let markerPosition = 0;
    markerPosition < datastream.length;
    markerPosition++
  ) {
    const marker = datastream.substring(
      markerPosition,
      markerPosition + markerSize
    );

    if (new Set([...marker]).size === markerSize)
      return markerPosition + markerSize;
  }
};

const startOfPacket = findFirstMarkerOfSize(4);
console.log(
  `The first start-of-packet marker is detected after character ${startOfPacket}.`
);

const startOfMessage = findFirstMarkerOfSize(14);
console.log(
  `The first start-of-message marker is detected after character ${startOfMessage}.`
);
