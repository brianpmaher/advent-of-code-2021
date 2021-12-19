const fs = require('fs');

const rawInput = fs.readFileSync('input.txt', 'utf8');

let [template, ...pairInsertions] = rawInput.split('\r\n').filter(line => line.length);

const pairMap = pairInsertions
    .map(insertion => insertion.split(' -> '))
    .reduce((map, [pair, insertion]) => ({
        ...map,
        [pair]: `${pair[0]}${insertion}`,
    }), {});

console.log('\n');
console.log(`Template\t${template}`);
for (let stepCount = 0; stepCount < 10; stepCount++) {
    let newTemplate = '';

    for (let i = 0; i < template.length - 1; i++) {
        const pair = template[i] + template[i + 1];
        const outPair = pairMap[pair];
        newTemplate += outPair;
    }

    newTemplate += template[template.length - 1];

    template = newTemplate;
    console.log(`After step ${stepCount + 1}:\t${template.length}`);
}

const elementCounts = template.split('').reduce((elementCounts , element) => ({
    ...elementCounts,
    [element]: (elementCounts[element] || 0) + 1
}), {});

const mostCommon  = Math.max(...Object.values(elementCounts));
const leastCommon = Math.min(...Object.values(elementCounts));

const result = mostCommon - leastCommon;
console.log('result', result);
