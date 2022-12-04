import { readFileSync } from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getInputFile = (day: number, removeBlankLines: boolean = true) => {
  const inputPath = `${__dirname}/../../input/day-${day}.txt`;
  const input = readFileSync(inputPath, 'utf8').split('\n');
  if (!removeBlankLines) return input;
  return input.filter((line) => line.length);
};

export default getInputFile;
