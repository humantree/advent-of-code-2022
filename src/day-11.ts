import getInputFile from './helpers/get-input-file.js';
const input = getInputFile(11);

const ROUNDS = 10000;
const WORRY_ABOUT_DAMAGE = false;

type Monkey = {
  inspectionCount: number;
  items: number[];
  testDivisor: number;
  testFalseRecipient: number;
  testTrueRecipient: number;

  worryOperation: (worry: number) => number;
};

const monkeys: Monkey[] = [];

const worryOperationBuilder = (operation: string) => {
  const [a, operator, b] = operation.split(' ');

  if (operator === '+')
    return (worry: number) =>
      (a === 'old' ? worry : +a) + (b === 'old' ? worry : +b);

  if (operator === '*')
    return (worry: number) =>
      (a === 'old' ? worry : +a) * (b === 'old' ? worry : +b);
};

input.forEach((line, i) => {
  if (!line.startsWith('Monkey')) return;

  const items = input[i + 1]
    .split(':')[1]
    .split(',')
    .map((value) => +value);

  const worryOperation = worryOperationBuilder(input[i + 2].split('= ')[1]);
  const testDivisor = +input[i + 3].substring(21);
  const testTrueRecipient = +input[i + 4].substring(29);
  const testFalseRecipient = +input[i + 5].substring(30);

  const monkey: Monkey = {
    inspectionCount: 0,
    items,
    testDivisor,
    testFalseRecipient,
    testTrueRecipient,
    worryOperation,
  };

  monkeys.push(monkey);
});

const commonDivisor = monkeys
  .map((monkey) => monkey.testDivisor)
  .reduce((acc, divisor) => acc * divisor);

for (let i = 0; i < ROUNDS; i++) {
  monkeys.forEach((monkey) => {
    while (monkey.items.length) {
      let item = monkey.items.shift();
      item = monkey.worryOperation(item);

      if (WORRY_ABOUT_DAMAGE) item = Math.floor(item / 3);
      else item = item % commonDivisor;

      if (item % monkey.testDivisor === 0) {
        monkeys[monkey.testTrueRecipient].items.push(item);
      } else {
        monkeys[monkey.testFalseRecipient].items.push(item);
      }

      monkey.inspectionCount++;
    }
  });
}

const inspectionCounts = monkeys
  .sort((a, b) => b.inspectionCount - a.inspectionCount)
  .map((monkey) => monkey.inspectionCount);

const monkeyBusiness = inspectionCounts[0] * inspectionCounts[1];
console.log(
  `The level of monkey business after ${ROUNDS} rounds is ${monkeyBusiness}`
);
