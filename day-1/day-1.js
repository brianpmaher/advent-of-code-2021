const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map(v => parseInt(v));

function part1(input) {
  let totalIncreases = 0;
  let previousMeasurement = input[0];
  for (let i = 1; i < input.length; i++) {
    const currentMeasurement = input[i];

    if (currentMeasurement > previousMeasurement)
      totalIncreases++;

    previousMeasurement = currentMeasurement;
  }

  return totalIncreases;
}

console.log('part1', part1(input));

function part2() {
  const sumOfThrees = [];

  for (let i = 0; i < input.length - 2; i++) {
    sumOfThrees.push(input[i] + input[i+1] + input[i+2]);
  }

  return part1(sumOfThrees);
}

console.log('part2', part2());
