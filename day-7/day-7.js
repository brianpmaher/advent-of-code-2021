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
