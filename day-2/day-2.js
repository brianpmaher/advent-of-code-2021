const fs = require('fs');

const commands = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

function part1() {
  let depth = 0;
  let horizontalPosition = 0;

  commands.forEach(command => {
    const [instruction, valueStr] = command.split(' ');
    const value = parseInt(valueStr);

    switch (instruction) {
      case 'forward':
        horizontalPosition += value;
        break;
      case 'up':
        depth -= value;
        break;
      case 'down':
        depth += value;
        break;
    }
  });

  return depth * horizontalPosition;
}

console.log('part1', part1());

function part2() {
  let depth = 0;
  let horizontalPosition = 0;
  let aim = 0;

  commands.forEach(command => {
    const [instruction, valueStr] = command.split(' ');
    const value = parseInt(valueStr);

    switch (instruction) {
      case 'forward':
        horizontalPosition += value;
        depth += aim * value;
        break;
      case 'up':
        aim -= value;
        break;
      case 'down':
        aim += value;
        break;
    }
  });

  return horizontalPosition * depth;
}

console.log('part2', part2());
