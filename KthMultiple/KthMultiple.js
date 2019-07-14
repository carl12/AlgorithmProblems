
function kthMultiple(k){
  let primes = [3, 5, 7, 11];
  let multLevels = [];
  let counters = [];
  primes.forEach((_, i) => {
    multLevels[i] = [1];
    counters.push(0);
  });

  while (multLevels[primes.length - 1].length < k) {
    let min = primes[0] * multLevels[0][counters[0]];
    let minLoc = 0;
    
    multLevels.forEach((arr, i) => {
      if (arr[counters[i]] * primes[i] < min) {
        min = arr[counters[i]] * primes[i];
        minLoc = i;
      }
    });

    counters[minLoc] ++;

    for (let i = minLoc; i < primes.length; i++) {
      multLevels[i].push(min);
    }
  }
  console.log(multLevels[primes.length - 1]);
  return multLevels[primes.length - 1];
}


kthMultiple(20);