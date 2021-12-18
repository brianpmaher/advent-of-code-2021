const fs = require('fs');

function parseInputFromFile(file) {
    return fs
        .readFileSync(file, 'utf8')
        .split('\n')
        .map(line => {
            const [input, output] = line.replace('\r', '').split(' | ');
            return {
                input: input.split(' '),
                output: output.split(' '),
            };
        });
}

String.prototype.containsAllChars = function (other) {
    if (other.length > this.length)
        return false;
    const str = this.toString();
    for (let i = 0; i < other.length; i++)
        if (!str.includes(other[i]))
            return false;
    return true;
}

console.log('test1 containsAllChars', 'abc'.containsAllChars('ca') === true);
console.log('test2 containsAllChars', 'abc'.containsAllChars('dac') === false);

let result = 0;
parseInputFromFile('./input.txt').forEach(({ input, output }) => {
    // calibrate
    const one = input.find(s => s.length === 2);
    const four = input.find(s => s.length === 4);
    const seven = input.find(s => s.length === 3);
    const eight = input.find(s => s.length === 7);
    const nine = input.find(s => s.length === 6 && s.containsAllChars(four));
    const three = input.find(s => s.length === 5 && s.containsAllChars(one));
    const zero = input.find(s => s.length === 6 && s.containsAllChars(seven) && s !== nine);
    const six = input.find(s => s.length === 6 && s !== nine && s !== zero);
    const five = input.find(s => s.length === 5 && s !== three && six.containsAllChars(s));
    const two = input.find(s => s.length === 5 && s !== three && s !== five);

    let outputNumberStr = '';
    const numberKeys = [zero, one, two, three, four, five, six, seven, eight, nine];
    output.forEach(digitKey => {
        const digit = numberKeys.findIndex((k) => {
            if (!k)
                console.log('it happened');
            return digitKey.length === k.length && digitKey.containsAllChars(k)
        });
        outputNumberStr = outputNumberStr.concat(digit);
    });
    result += parseInt(outputNumberStr);
});

console.log(result);
