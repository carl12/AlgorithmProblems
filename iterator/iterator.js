
function minAbsDifference(nums, goal) {
  const posArr = nums.filter((a, i, { length }) => i < Math.floor(length / 2));
  const negArr = nums.filter((a, i, { length }) => i >= Math.floor(length / 2));
  if (negArr.length === 0 && goal < 0) {
    return -goal;
  }
  const posSum = getSortedAllSums(posArr);
  // const posSum2 = getSortedAllSums(posArr);
  // console.log(JSON.stringify(posSum) === JSON.stringify(posSum2))
  const negSum = getSortedAllSums(negArr);
  let pos = 0;
  let neg = negSum.length - 1;
  let best = Infinity;
  // console.log(posSum, negSum);
  while (pos < posSum.length && neg >= 0) {
    let sum = posSum[pos] + negSum[neg];
    best = Math.min(best, Math.abs(sum - goal));
    // console.log(pos, neg, sum);
    if (sum === goal) {
      return 0;
    } else if (sum > goal) {
      neg--;
    } else {
      pos++;
    }
  }
  return best;
  function getSortedAllSums2(nums) {
    set = new Set([0]);
    dfsSums(nums)
    return Array.from(set).sort((a, b) => a - b);
    function dfsSums(nums, i = 0, sum = 0) {
      if (i >= nums.length) {
        return;
      }
      set.add(sum + nums[i]);
      dfsSums(nums, i + 1, sum + nums[i]);
      dfsSums(nums, i + 1, sum);
    }
  }
  function getSortedAllSums(nums) {
    let oldCache = {};
    let newCache = { [JSON.stringify([[], nums.length])]: 0 };
    const res = new Set([0]);
    for (let numNums = 1; numNums <= nums.length; numNums++) {
      oldCache = newCache;
      newCache = {};
      let combos = [];
      combos.length = numNums;
      for (let i = 0; i < combos.length; i++) {
        combos[i] = i;
      }
      while (isValid(combos, nums.length)) {
        const last = combos.pop();
        const cached = oldCache[JSON.stringify([combos, nums.length])];
        combos.push(last);
        newCache[JSON.stringify([combos, nums.length])] = cached + nums[last];
        res.add(cached + nums[last]);
        next(combos, nums.length);
      }

    }
    // console.log(res, cache);
    return Array.from(res).sort((a, b) => a - b);

    function isValid(combos, length) {
      return !combos.some(val => val >= length);
    }

    function next(combos, length) {
      combos[combos.length - 1]++;
      if (combos[combos.length - 1] < length) {
        return;
      }
      const last = combos.pop();
      if (combos.length === 0) {
        combos.push(length);
        return;
      }
      next(combos, length - 1);
      combos.push(combos[combos.length - 1] + 1);
    }

    function compress([combos, length]) {
      if (combos.length === 0) {
        return -1;
      }
      let factor = 1;
      let i = 0;
      let val = 0;
      for (let i = 0; i < combos.length; i++) {
        val += combos[i] * factor;
        factor *= length;
      }
      return val;
    }
  }
}

const vals = [
  [5, -7, 3, 5],
  6,
  [0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1],
  -2,
  [10000000, 10000000, 10000000, 10000000, -10000000, -10000000, -10000000, -6285, -1782, -5306, 8809, -8656, 1370, -7465, -6992, -6619, -171, 388, -1843, -1175, 7354, -8370, 1854, -8979, -7434, -5445, 3085, 2191, -2069, -6925, 774, 10000000, 10000000, 10000000, -10000000, -10000000, -10000000, -10000000],
  100000,
  [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, -1, -2, -4, -8, -16, -32, -64, -128, -256, -512, -1024, -2048, -4096, -8192, -16384, -32768, -65536, -131072, -262144, -524288],
  1048574,
];

for (let i = 0; i < vals.length - 1; i+= 2) {
  console.log(minAbsDifference(vals[i], vals[i + 1]));
}

