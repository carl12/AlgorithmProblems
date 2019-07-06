
function countOf2s(n){
  if (n < 2) {
    return 0;
  } else if (n % 1 !== 0) {
    n = math.floor(n);
  }

  let level = 1;
  let count = 0;
  while (level < n) {
    let digit = Math.floor(n % (level * 10) / level);

    count += amounts(level) * digit;
    if (digit === 2) {
      count += n % level + 1;
    } else if (digit > 2) {
      count += level;
    }
    level *= 10;
  }
  console.log(count);
  return count;

  function amounts(level) {
    tier = Math.round(Math.log(level) / Math.log(10));
    return (10 ** (tier - 1)) * tier;
  }
}

