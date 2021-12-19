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
console.log(connectionMap);

function makeTree(key, visitedSmallCaves = []) {
    const tree = {};
    let connectedCaves = connectionMap[key].filter(cave => cave === 'end' || !visitedSmallCaves.includes(cave));

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
console.log(tree);

function buildPaths(tree) {
    const paths = [];
    const caves = Object.keys(tree);

    for (cave of caves) {
        if (typeof tree[cave] === 'string')
            paths.push(cave);
        else {
            const childPaths = buildPaths(tree[cave]).map(path => path === 'end' ? path : `${cave},${path}`);
            paths.push(...childPaths);
        }
    }

    return paths;
}
const paths = buildPaths(tree).filter(path => path.endsWith('end'));
console.log(paths.length);
