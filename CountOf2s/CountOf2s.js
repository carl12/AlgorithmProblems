
function countOf2s(n){
  if (n < 2) {
    return 0;
  } else if (n % 1 !== 0) {
    n = math.floor(n);
  }

  let level = 1;
  let count = 0;
  while (level <= n) {
    let digit = Math.floor(n % (level * 10) / level);
    count += amounts(level) * digit;
    if (digit === 2) {
      count += n % level + 1;
    } else if (digit > 2) {
      count += level;
    }
    level *= 10;
  }

  return count;

  function amounts(level) {
    tier = Math.round(Math.log(level) / Math.log(10));
    return (10 ** (tier - 1)) * tier;
  }
}

function countOf2s2(n) {
  let count = 0;
  len = n.toString().length;
  for (let digit = 0; digit < len; digit ++) {
    count += count2sInRange(n, digit);
  }
  return count;

  function count2sInRange(n, d) {
    let powerOf10 = 10 ** d;
    let nextPowerof10 = powerOf10 * 10;
    let right = n % powerOf10;

    let roundDown = n - n % nextPowerof10;
    let roundUp = roundDown + nextPowerof10;

    let digit = Math.floor(n / powerOf10) % 10;
    if (digit < 2) {
      return Math.floor(roundDown / 10);
    } else if (digit === 2) {
      return Math.floor(roundDown / 10) + right + 1;
    } else {
      return Math.floor(roundUp / 10);
    }
  }
}


// for (let i = 0; i < 100000; i++) {
//   if (countOf2s(i) !== countOf2s2(i)) {
//     console.log(`${i}: ${countOf2s(i)}, ${countOf2s2(i)}`);
//     return;
//   }
// }

