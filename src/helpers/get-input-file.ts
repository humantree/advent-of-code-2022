import { readFileSync } from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getInputFile = (day: number) => {
  const inputPath = `${__dirname}/../../input/day-${day}.txt`;
  return readFileSync(inputPath, 'utf8');
};

export default getInputFile;
