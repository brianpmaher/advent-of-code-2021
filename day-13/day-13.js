const fs = require('fs');

const rawInput = fs.readFileSync('input.txt', 'utf8');

let [rawDotsInstructions, rawFoldInstructions] = rawInput.split('\r\n\r\n');

const dots = rawDotsInstructions
    .split('\r\n')
    // xy coordinate
    .map(dots => ([
        ...dots
            .split(',')
            .map(v => parseInt(v))
    ]));

const [x, y] = dots[0];
const [minX, maxX, minY, maxY] = dots.reduce(([minX, maxX, minY, maxY], [x, y]) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    return [minX, maxX, minY, maxY];
}, [x, x, y, y]);
const width = maxX + 1;
const length = maxY + 1;

const paperData = new Array(width * length).fill('.');

dots.forEach(([x, y]) => paperData[y * width + x] = '#');

function printPaper() {
    let line = '';
    for (let i = 0; i < paperData.length; i++) {
        if (i % width === 0)
            line += '\n';
        line += paperData[i];
    }
    console.log('paper data' + line);
}

function printFile() {
    let line = '';
    for (let i = 0; i < paperData.length; i++) {
        if (i % width === 0)
            line += '\n';
        line += paperData[i];
    }
    fs.writeFileSync('output.txt', line, 'utf8');
}

rawFoldInstructions
    .split('\r\n')
    .map(str => str.replace('fold along ', ''))
    .map(str => str.split('='))
    .map(([axis, valStr]) => [axis, parseInt(valStr)])
    .forEach(([foldAxis, foldValue], i) => {
        if (foldAxis === 'x') {
            for (let x = foldValue + 1; x <= maxX; x++) {
                for (let y = 0; y <= maxY; y++) {
                    const i = y * width + x;
                    if (paperData[i] === '#') {
                        paperData[i] = '.';
                        paperData[y * width + (foldValue - (x - foldValue))] = '#';
                    }
                }
            }
        } else /* foldAxis === 'y' */ {
            for (let y = foldValue + 1; y <= maxY; y++) {
                for (let x = 0; x <= maxX; x++) {
                    const i = y * width + x;
                    if (paperData[i] === '#') {
                        paperData[i] = '.';
                        paperData[(foldValue - (y - foldValue)) * width + x] = '#';
                    }
                }
            }
        }
    });

printFile();