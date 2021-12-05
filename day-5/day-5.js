const fs = require('fs');

const rawInputLines = fs.readFileSync('./input.txt', 'utf8').split('\r\n');
const lineSegments = rawInputLines
    .map(rawInputLine =>
        rawInputLine
            .split(' -> ')
            .map(rawPoint => rawPoint
                .split(',')
                .map(v => parseInt(v)))
            .map(([x, y]) => ({ x, y })))
    .filter(([pointA, pointB]) => pointA.x === pointB.x || pointA.y === pointB.y);

const numRows = 1000;
const numColumns = 1000;
const grid = new Array(numRows * numColumns).fill(0);

function markPosition(x, y) {
    const gridIndex = y * numColumns + x;
    grid[gridIndex]++;
}

for (let i = 0; i < lineSegments.length; i++) {
    const lineSegment = lineSegments[i];
    const [pointA, pointB] = lineSegment;
    const deltaX = pointB.x - pointA.x;
    const deltaY = pointB.y - pointA.y;
    let currentCell = { ...pointA };

    while (currentCell.x !== pointB.x || currentCell.y !== pointB.y) {
        markPosition(currentCell.x, currentCell.y);

        // walk the current cell
        if (deltaX > 0) {
            currentCell.x++;
        } else if (deltaX < 0) {
            currentCell.x--;
        } else if (deltaY > 0) {
            currentCell.y++;
        } else if (deltaY < 0) {
            currentCell.y--;
        }
    }

    markPosition(currentCell.x, currentCell.y);
}

function printAllRows() {
    for (let y = 0; y < numRows; y++) {
        let printLine = '';

        for (let x = 0; x < numColumns; x++) {
            printLine += grid[y * numColumns + x];
        }

        console.log(printLine);
    }
}

const answer = grid.filter(cell => cell > 1).length;
console.log(answer);
