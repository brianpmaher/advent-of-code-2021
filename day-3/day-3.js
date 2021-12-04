const fs = require('fs');

const diagnosticReport = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

function binaryToValue(binary) {
  let value = 0;

  for (let i = binary.length - 1; i >= 0; i--) {
    const character = binary[i];
    const binaryVal = parseInt(character);
    const exponent = binary.length - i - 1;
    value += (Math.pow(2, exponent) * binaryVal);
  }

  return value;
}

function part1() {
  const rows = diagnosticReport;
  const columns = new Array(diagnosticReport[0].length);

  for (let x = 0; x < columns.length; x++) {
    columns[x] = {
      numOnes: 0,
      numZeros: 0,
    }
  }

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y];

    for (let x = 0; x < columns.length; x++) {
      const character = row[x];

      if (character === '1') {
        columns[x].numOnes++;
      } else /* character === '0' */ {
        columns[x].numZeros++;
      }
    }
  }

  let gammaRate = '';
  let epsilonRate = '';

  for (let x = 0; x < columns.length; x++) {
    const column = columns[x];

    if (column.numOnes > column.numZeros) {
      gammaRate += '1';
      epsilonRate += '0';
    } else {
      gammaRate += '0';
      epsilonRate += '1';
    }
  }

  const gammaRateValue = binaryToValue(gammaRate);
  const epsilonRateValue = binaryToValue(epsilonRate);

  return gammaRateValue * epsilonRateValue;
}

function part2() {
  let remainingRows = diagnosticReport;

  while (remainingRows.length > 1) {
    for (let x = 0; x < remainingRows[0].length; x++) {
      let numOnes = 0;
      let numZeros = 0;

      for (let y = 0; y < remainingRows.length; y++) {
        const bitCharacter = remainingRows[y][x];

        if (bitCharacter === '1') {
          numOnes++;
        } else {
          numZeros++;
        }
      }

      const bitCriteria = numOnes >= numZeros ? '1' : '0';

      remainingRows = remainingRows.filter(row => row[x] === bitCriteria);
    }
  }

  const oxygenGeneratorRating = remainingRows[0];

  remainingRows = diagnosticReport;

  const rowLength = remainingRows[0].length;

  while (remainingRows.length > 1) {
    for (let x = 0; x < rowLength; x++) {
      let numOnes = 0;
      let numZeros = 0;

      for (let y = 0; y < remainingRows.length; y++) {
        const bitCharacter = remainingRows[y][x];

        if (bitCharacter === '1') {
          numOnes++;
        } else {
          numZeros++;
        }
      }

      const bitCriteria = numOnes < numZeros ? '1' : '0';

      if (remainingRows.length > 1)
        remainingRows = remainingRows.filter(row => row[x] === bitCriteria);
    }
  }

  const c02ScrubberRating = remainingRows[0];

  return binaryToValue(oxygenGeneratorRating) * binaryToValue(c02ScrubberRating);
}

console.log('part1', part1());
console.log('part2', part2());
