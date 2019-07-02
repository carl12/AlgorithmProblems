
function sumSwap(a1, a2) {
  if (a1.length === 0 || a2.length === 0) {
    return null;
  }
  let nums = new Set();
  let s1 = 0;
  let s2 = 0;
  let diffAmount;
  for (let num of a1) {
    s1 += num;
    nums.add(num);
  }

  for (let num of a2) {
    s2 += num;
  }

  diffAmount = (s2 - s1) / 2;
  if (diffAmount % 1 !== 0) {
    return null;
  }

  for (let num of a2) {
    if (nums.has(num - diffAmount)) {
      return [num, num - diffAmount];
    }
  }

  return null;
}

function sumSwap2(a1, a2) {
  let diff = getDiff(a1, a2);
  if (diff === null) { return null }
  return findSwap(a1, a2, diff);

  function getDiff(a1, a2) {
    let s1 = 0;
    let s2 = 0;
    let diffAmount;
    for (let num of a1) {
      s1 += num;
    }

    for (let num of a2) {
      s2 += num;
    }

    diffAmount = (s2 - s1) / 2;
    if (diffAmount % 1 !== 0) {
      return null;
    }
    return diffAmount;
  }

  function findSwap(a1, a2, diff) {
    let nums = new Set(a1);
    for (let num of a2) {
      if (nums.has(num - diff)) {
        return [num, num - diff];
      }
    }
    return null;
  }
}

// console.log(sumSwap2([1, 1, 1, 5], [4, 3, 1]));
