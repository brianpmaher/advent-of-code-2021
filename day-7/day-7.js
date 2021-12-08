const fs = require('fs');

const horizontalPositions = fs
  .readFileSync('./input.txt', 'utf8')
  .split(',')
  .map(c => parseInt(c));

const horizontalPositionsAscending = horizontalPositions.sort((a, b) => a - b)
const medianIndex = Math.floor((horizontalPositions.length - 1) / 2);
const median = horizontalPositionsAscending[medianIndex];
console.log('median', median);

let totalFuel = horizontalPositions.reduce((sum, val) => sum + Math.abs(val - median), 0);
console.log('totalFuel', totalFuel);

const average = Math.floor(horizontalPositions.reduce((sum, val) => sum + val) / horizontalPositions.length);
console.log('average', average);

const positionsCounts = horizontalPositions.reduce((countsByNumber, position) => {
  if (!countsByNumber[position])
    countsByNumber[position] = 0;
  countsByNumber[position]++;
  return countsByNumber;
}, {});
const maxValue = Math.max(...Object.values(positionsCounts));
const mode = Object.keys(positionsCounts).find(key => positionsCounts[key] === maxValue);
console.log('mode', mode);

function computeGrowingFuel(horizontalPositions, target) {
  let totalFuel = 0;

  horizontalPositions.forEach(position => {
    for (let i = 1; i <= Math.abs(position - target); i++)
      totalFuel += i;
  });

  return totalFuel;
}

totalFuel = computeGrowingFuel(horizontalPositions, average);
console.log('totalFuel', totalFuel);

console.log('computeGrowingFuel test1', computeGrowingFuel([1, 2, 3], 2) === 2);
console.log('computeGrowingFuel test2', computeGrowingFuel([1, 2, 3, 4, 5], 3) === 8);
console.log('computeGrowingFuel test3', computeGrowingFuel([1, 2, 3, 4], 3) === 5);
console.log('computeGrowingFuel test4', computeGrowingFuel([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 5) === 168);
