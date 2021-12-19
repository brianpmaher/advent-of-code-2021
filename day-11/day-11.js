const fs = require('fs');

const rawData = fs.readFileSync('./input.txt', 'utf8').split('\r\n');
const width = rawData[0].length;
const length = rawData.length;
const octopuses = rawData.join('').split('').map((c, i) => ({
    energyLevel: parseInt(c),
    hasFlashedThisStep: false,
    index: i,
    x: i - Math.floor(i / width) * width,
    y: Math.floor(i / width),
}));

let numFlashes = 0;

function flash(octopus) {
    octopus.energyLevel = 0;
    octopus.hasFlashedThisStep = true;
    numFlashes++;

    const {x, y} = octopus;
    const upIndex = (y - 1) * width + x;
    const upLeftIndex = (y - 1) * width + (x - 1);
    const leftIndex = y * width + (x - 1);
    const downLeftIndex = (y + 1) * width + (x - 1);
    const downIndex = (y + 1) * width + x;
    const downRightIndex = (y + 1) * width + (x + 1);
    const rightIndex = y * width + (x + 1);
    const upRightIndex = (y - 1) * width + (x + 1);

    if (upIndex >= 0 && !octopuses[upIndex].hasFlashedThisStep) {
        octopuses[upIndex].energyLevel++;
        if (octopuses[upIndex].energyLevel > 9)
            flash(octopuses[upIndex]);
    }
    if (upLeftIndex >= 0 && upLeftIndex >= (y-1) * width && !octopuses[upLeftIndex].hasFlashedThisStep) {
        octopuses[upLeftIndex].energyLevel++;
        if (octopuses[upLeftIndex].energyLevel > 9)
            flash(octopuses[upLeftIndex]);
    }
    if (leftIndex >= y * width && !octopuses[leftIndex].hasFlashedThisStep) {
        octopuses[leftIndex].energyLevel++;
        if (octopuses[leftIndex].energyLevel > 9)
            flash(octopuses[leftIndex]);
    }
    if (downLeftIndex < width * length && downLeftIndex >= (y+1) * width && !octopuses[downLeftIndex].hasFlashedThisStep) {
        octopuses[downLeftIndex].energyLevel++;
        if (octopuses[downLeftIndex].energyLevel > 9)
            flash(octopuses[downLeftIndex]);
    }
    if (downIndex < width * length && !octopuses[downIndex].hasFlashedThisStep) {
        octopuses[downIndex].energyLevel++;
        if (octopuses[downIndex].energyLevel > 9)
            flash(octopuses[downIndex]);
    }
    if (downRightIndex < width * length && downRightIndex < (y+1) * width + width && !octopuses[downRightIndex].hasFlashedThisStep) {
        octopuses[downRightIndex].energyLevel++;
        if (octopuses[downRightIndex].energyLevel > 9)
            flash(octopuses[downRightIndex]);
    }
    if (rightIndex < y * width + width && !octopuses[rightIndex].hasFlashedThisStep) {
        octopuses[rightIndex].energyLevel++;
        if (octopuses[rightIndex].energyLevel > 9)
            flash(octopuses[rightIndex]);
    }
    if (upRightIndex >= 0 && upRightIndex < (y-1) * width + width && !octopuses[upRightIndex].hasFlashedThisStep) {
        octopuses[upRightIndex].energyLevel++;
        if (octopuses[upRightIndex].energyLevel > 9)
            flash(octopuses[upRightIndex]);
    }
}

let outputStr = '';
for (let y = 0; y < length; y++) {
    outputStr += '\n';
    for (let x = 0; x < width; x++)
        outputStr += octopuses[y * width + x].energyLevel;
}
console.log('\n');
console.log('before any steps', outputStr);

for (let stepCount = 0; stepCount < 100; stepCount++) {
    octopuses.forEach(octopus => octopus.hasFlashedThisStep = false);

    for (let i = 0; i < octopuses.length; i++) {
        const octopus = octopuses[i];

        if (octopus.hasFlashedThisStep)
            continue;

        octopus.energyLevel++;

        if (octopus.energyLevel > 9)
            flash(octopus);
    }

    let outputStr = '';
    for (let y = 0; y < length; y++) {
        outputStr += '\n';
        for (let x = 0; x < width; x++)
            outputStr += octopuses[y * width + x].energyLevel;
    }
    console.log('\n');
    console.log(`step ${stepCount + 1}`, outputStr);
}

console.log('num flashes', numFlashes);
