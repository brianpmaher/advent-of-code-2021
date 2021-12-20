const fs = require('fs');

const rawInput = fs.readFileSync('input.txt', 'utf8');

let [template, ...pairInsertions] = rawInput.split('\r\n').filter(line => line.length);

console.log('template', template);

let pairMap = pairInsertions
    .map(insertion => insertion.split(' -> '))
    .reduce((map, [pair, outLetter]) => ({
        ...map,
        [pair]: outLetter
    }), {});

// Taking the initial template and setting the pair counts
let pairCounts = {};
for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i].concat(template[i+1]);
    pairCounts[pair] = (pairCounts[pair] || 0) + 1;
}

// Taking the initial template and setting the letter counts
const letterCounts = template.split('').reduce((letterCounts, letter) => ({
    ...letterCounts,
    [letter]: (letterCounts[letter] || 0) + 1
}), {});

for (let stepCount = 0; stepCount < 40; stepCount++) {
    const newPairCounts = {};
    Object.keys(pairCounts).forEach((pair) => {
        const letter = pairMap[pair];
        const pair1 = pair[0].concat(letter);
        const pair2 = letter.concat(pair[1]);
        newPairCounts[pair1] = (newPairCounts[pair1] || 0) + pairCounts[pair];
        newPairCounts[pair2] = (newPairCounts[pair2] || 0) + pairCounts[pair];
        letterCounts[letter] = (letterCounts[letter] || 0) + pairCounts[pair];
    });
    pairCounts = newPairCounts;
}

console.log(pairMap);
console.log(letterCounts);
console.log(pairCounts);
console.log(Object.values(letterCounts).reduce((sum, v) => sum + v, 0));
const largest = Math.max(...Object.values(letterCounts));
console.log('largest', largest);
const smallest = Math.min(...Object.values(letterCounts));
console.log('smallest', smallest);
console.log('result', largest - smallest);
