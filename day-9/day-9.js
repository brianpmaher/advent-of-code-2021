const fs = require('fs');

const lines = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const width = lines[0].length;
const length = lines.length;

const heights = lines.join('').split('').map(s => parseInt(s));

const lowestPoints = [];

for (let y = 0; y < length; y++) {
    for (let x = 0; x < width; x++) {
        const index = y * width + x;
        const upIndex = (y - 1) * width + x;
        const leftIndex = y * width + (x - 1);
        const rightIndex = y * width + (x + 1);
        const downIndex = (y + 1) * width + x;

        const point = heights[index];

        const neighbors = [];

        // Grab all neighbors
        if (upIndex >= 0)
            neighbors.push(heights[upIndex]);
        if (leftIndex >= y * width)
            neighbors.push(heights[leftIndex]);
        if (rightIndex < y * width + width)
            neighbors.push(heights[rightIndex]);
        if (downIndex < width * length)
            neighbors.push(heights[downIndex]);

        // Check if this point is the lowest point
        if (neighbors.every(neighbor => point < neighbor))
            lowestPoints.push(point);
    }
}

let sum = 0;
for (let i = 0; i < lowestPoints.length; i++)
    sum = sum + lowestPoints[i] + 1;

console.log(sum);
