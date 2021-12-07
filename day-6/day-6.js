const fs = require('fs');

const lanternfishLifeTimers = fs
 .readFileSync('./input.txt', 'utf8')
 .split(',')
 .map(numChar => parseInt(numChar));

function updateLanternfishLifeTimers() {
 const lanternFishTimersLength = lanternfishLifeTimers.length

 for (let i = 0; i < lanternFishTimersLength; i++) {

   if (lanternfishLifeTimers[i] === 0) {
     lanternfishLifeTimers[i] = 7;
     lanternfishLifeTimers.push(8);
   }

   lanternfishLifeTimers[i]--;
 }
}

for (let day = 0; day < 80; day++) {
 updateLanternfishLifeTimers();
}

console.log(lanternfishLifeTimers.length);
