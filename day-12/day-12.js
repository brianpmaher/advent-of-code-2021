const fs = require('fs');

function isSmallCave(char) {
    return char !== 'start' && char !== 'end' && char.toLowerCase() === char;
}

const inputData = fs.readFileSync('input.txt', 'utf8').split('\r\n');
const instructionPairs = inputData.map(connectionString => connectionString.split('-'));

const connectionMap = {};
instructionPairs.forEach(([a, b]) => {
    if (a !== 'end' && connectionMap[a] === undefined)
        connectionMap[a] = [];
    if (b !== 'end' && connectionMap[b] === undefined)
        connectionMap[b] = [];
    if (b !== 'start' && a !== 'end' && !connectionMap[a].includes(b))
        connectionMap[a].push(b);
    if (a !== 'start' && b !== 'end' && !connectionMap[b].includes(a))
        connectionMap[b].push(a);
});

function makeTree(key, visitedSmallCaves = []) {
    const tree = {};
    const visitedSmallCavesHasDuplicates = visitedSmallCaves.some(cave => visitedSmallCaves.filter(c => c === cave).length > 1);
    let connectedCaves = connectionMap[key]
        .filter(cave => cave === 'end' || !visitedSmallCaves.includes(cave) || !visitedSmallCavesHasDuplicates);

    if (connectedCaves.length === 0)
        return 'dead-end';

    for (const cave of connectedCaves) {
        if (cave === 'end')
            tree[cave] = 'end';
        else
            tree[cave] = makeTree(cave, isSmallCave(cave) ? [...visitedSmallCaves, cave] : visitedSmallCaves);
    }

    return tree;
}
const tree = { 'start': makeTree('start') };

function countEnds(tree) {
    if (tree === 'dead-end') return 0;
    if (tree === 'end')      return 1;
    return Object.values(tree).reduce((sum, subtree) => sum + countEnds(subtree), 0);
}
const numEnds = countEnds(tree);

console.log('num ends', numEnds);
