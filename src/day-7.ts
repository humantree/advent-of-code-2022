import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(7);

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
    const filesSize = this.files.reduce((runningTotal, file) => runningTotal + file.size, 0);
    const childrenSize =  this.childDirectories
      .map((child) => child.sizeOfContents())
      .reduce((runningTotal, size) => runningTotal + size, 0);
    return filesSize + childrenSize;
  }
}

const root = new Directory('/');
const allDirectories = [root];
let currentDirectory: Directory;

const changeDirectory = (directory: string) => {
  if (directory === '/') return currentDirectory = root;
  if (directory === '..') return currentDirectory = currentDirectory.parentDirectory;

  currentDirectory = currentDirectory.childDirectories
    .find((child) => child.name === directory);
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

const directorySizes = allDirectories.map((directory) => ({
  name: directory.name,
  size: directory.sizeOfContents(),
}));

const smallDirectories = directorySizes
  .filter((directory) => directory.size <= 100000);
const totalSize = smallDirectories
  .reduce((runningTotal, directory) => runningTotal + directory.size, 0);

console.log(`The total size of all directories with a size of 100000 at most is ${totalSize}`)
