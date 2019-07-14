
function kthMultiple(k){
  let primes = [3, 5, 7];
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

function kthMultiple2(k) {
  let val = 0;
  let q3 = [3];
  let q5 = [5];
  let q7 = [7];
  let ans = [1];
  for (let i = 1; i < k; i++) {
    let v3 = q3[0] || Infinity;
    let v5 = q5[0] || Infinity;
    let v7 = q7[0] || Infinity;

    val = Math.min(v3, v5, v7) 
    if (val === v3) {
      q3.shift();
      q3.push(3 * val);
      q5.push(5 * val);
    } else if (val === v5) {
      q5.shift();
      q5.push(5 * val);
    } else {
      q7.shift();
    }
    q7.push(7 * val);
    ans.push(val);
  }
  console.log(ans);
  return ans;
}


kthMultiple2(20);
kthMultiple(20);