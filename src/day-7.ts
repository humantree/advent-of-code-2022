import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(7);

const TOTAL_DISK_SPACE = 70000000;
const REQUIRED_DISK_SPACE = 30000000;

type File = {
  name: string;
  size: number;
};

class Directory {
  childDirectories: Directory[];
  files: File[];
  name: string;
  parentDirectory?: Directory;

  constructor(name: string, parentDirectory?: Directory) {
    this.childDirectories = [];
    this.files = [];
    this.name = name;
    this.parentDirectory = parentDirectory;
  }

  sizeOfContents() {
    const filesSize = this.files.reduce((acc, file) => acc + file.size, 0);
    const childrenSize = this.childDirectories
      .map((child) => child.sizeOfContents())
      .reduce((runningTotal, size) => runningTotal + size, 0);
    return filesSize + childrenSize;
  }
}

const root = new Directory('/');
const allDirectories = [root];
let currentDirectory: Directory;

const changeDirectory = (directory: string) => {
  if (directory === '/') return (currentDirectory = root);
  if (directory === '..')
    return (currentDirectory = currentDirectory.parentDirectory);

  currentDirectory = currentDirectory.childDirectories.find(
    (child) => child.name === directory
  );
};

const createDirectory = (name: string) => {
  const directory = new Directory(name, currentDirectory);
  currentDirectory.childDirectories.push(directory);
  allDirectories.push(directory);
};

const createFile = (name: string, size: number) => {
  const file: File = { name, size };
  currentDirectory.files.push(file);
};

const processCommand = (command: string) => {
  if (command.startsWith('cd')) return changeDirectory(command.substring(3));
};

input.forEach((line) => {
  if (line.startsWith('$')) return processCommand(line.substring(2));

  const [dirOrSize, name] = line.split(' ');
  if (dirOrSize === 'dir') return createDirectory(name);
  createFile(name, +dirOrSize);
});

const directorySizes = allDirectories.map((dir) => dir.sizeOfContents());
const smallDirectories = directorySizes.filter((size) => size <= 100000);
const totalSize = smallDirectories.reduce((acc, size) => acc + size, 0);

console.log(
  `The total size of all directories with a size of 100000 at most is ${totalSize}`
);

const availableSpace = TOTAL_DISK_SPACE - root.sizeOfContents();
const minDirSize = REQUIRED_DISK_SPACE - availableSpace;
const suitableDirectories = directorySizes.filter((size) => size >= minDirSize);
const smallestSuitableDirectory = suitableDirectories.sort((a, b) => a - b)[0];

console.log(
  `The size of the smallest suitable directory for deletion is ${smallestSuitableDirectory}`
);
