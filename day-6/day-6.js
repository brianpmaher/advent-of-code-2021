const fs = require('fs');

const lanternfishLifeTimers = fs
 .readFileSync('./input.txt', 'utf8')
 .split(',')
 .map(numChar => parseInt(numChar));

function updateLanternfishLifeTimers(lanternfishLifeTimers) {
 const lanternFishTimersLength = lanternfishLifeTimers.length

 for (let i = 0; i < lanternFishTimersLength; i++) {

   if (lanternfishLifeTimers[i] === 0) {
     lanternfishLifeTimers[i] = 7;
     lanternfishLifeTimers.push(8);
   }

   lanternfishLifeTimers[i]--;
 }

 console.log('length', lanternfishLifeTimers.length);
}

function part1() {
  const timersClone = [...lanternfishLifeTimers];

  for (let day = 0; day < 80; day++) {
    updateLanternfishLifeTimers(timersClone);
  }

  return timersClone.length;
}

function part2() {
  const numTimersByNumber = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  };

  lanternfishLifeTimers.forEach((value) => {
    numTimersByNumber[value]++;
  });

  for (let days = 0; days < 256; days++) {
    const numZeros = numTimersByNumber[0];

    for (let i = 1; i < 9; i++) {
      numTimersByNumber[i-1] = numTimersByNumber[i];
    }

    numTimersByNumber[6] += numZeros;
    numTimersByNumber[8] = numZeros;
  }

  return Object.values(numTimersByNumber).reduce((sum, val) => sum + val, 0);
}

console.log(part2());
