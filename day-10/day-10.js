const fs = require('fs');

const lines = fs
    .readFileSync('./input.txt', 'utf8')
    .split('\n')
    .map(l => l.replace('\r', ''));

const openingSymbols = ['[', '(', '{', '<'];
const closingSymbols = [']', ')', '}', '>'];
let symbolStack = [];
const symbolsCount = {
    ')': 0,
    ']': 0,
    '}': 0,
    '>': 0,
};
lines.forEach(line => {
    for (let i = 0; i < line.length; i++) {
        const symbol = line[i];

        if (openingSymbols.includes(symbol)) {
            symbolStack.push(symbol);
        } else if (closingSymbols.includes(symbol)) {
            const indexOfSymbol = closingSymbols.indexOf(symbol);
            const matchingOpeningSymbol = openingSymbols[indexOfSymbol];

            if (symbolStack.pop() !== matchingOpeningSymbol) {
                symbolsCount[symbol]++;
            }
        }
    }

    symbolStack = [];
});

const totalScore =
    symbolsCount[')'] * 3 +
    symbolsCount[']'] * 57 +
    symbolsCount['}'] * 1197 +
    symbolsCount['>'] * 25137;

console.log('totalScore', totalScore);
