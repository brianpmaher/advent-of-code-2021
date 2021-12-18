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
const symbolValues = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};
const closingSequences = [];
lines.forEach(line => {
    symbolStack = [];

    for (let i = 0; i < line.length; i++) {
        const symbol = line[i];

        if (openingSymbols.includes(symbol)) {
            symbolStack.push(symbol);
        } else if (closingSymbols.includes(symbol)) {
            const indexOfSymbol = closingSymbols.indexOf(symbol);
            const matchingOpeningSymbol = openingSymbols[indexOfSymbol];
            const topOfStack = symbolStack.pop();

            // corrupt line, move on to next line
            if (topOfStack !== matchingOpeningSymbol) return;
        }
    }

    if (symbolStack.length > 0) {
        let closingSequence = '';
        for (let i = symbolStack.length - 1; i >= 0; i--) {
            const openingSymbol = symbolStack[i];
            const indexOfSymbol = openingSymbols.indexOf(openingSymbol);
            const matchingClosingSymbol = closingSymbols[indexOfSymbol];
            closingSequence += matchingClosingSymbol;
        }
        closingSequences.push(closingSequence);
    }
});

console.log(closingSequences);

const scores = closingSequences.map(closingSequence => {
    let totalScore = 0;
    for (let i = 0; i < closingSequence.length; i++) {
        const symbol = closingSequence[i];
        totalScore = totalScore * 5 + symbolValues[symbol];
    }
    return totalScore;
});

console.log('scores', scores);

const sortedScores = scores.sort((a, b) => a - b);

console.log('sorted scores', sortedScores);

const middleScore = sortedScores[Math.floor(sortedScores.length / 2)];

console.log('middle score', middleScore);
