const timeFuncs = require('../SolutionRunner');
const { randomFloatArr, ascendingArr, descendingArr, wrapper } = require('../GenericRandoms');

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
  let start = nums.slice(0, 2).sort(sortFn);
  let largest1 = start[1];
  let smallest1 = start[0];
  let largest2 = smallest2 = largest1 * smallest1;
  let largest3 = -Infinity;
  for (var i = 2; i < nums.length; i++) {
      let curr = nums[i];
      largest3 = Math.max(curr * largest2, curr * smallest2, largest3);
      [smallest2, _, _, largest2] = [curr * largest1, curr * smallest1, largest2, smallest2].sort(sortFn);
      [smallest1, _, largest1] = [smallest1, curr, largest1].sort(sortFn);
  }
  return largest3;
};
  
  
const sortFn = (a, b) => a - b;
const revSortFn = (a, b) => b - a;

var maximumProductFancy = function(nums) {
  let num = 3;
  let maxes = nums.slice(0, num).sort(revSortFn);
  let mins = nums.slice(0, num).sort(sortFn);
  mins.pop();
  nums.slice(3).forEach(val => {
    maxes.push(val);
    maxes.sort(revSortFn).pop();
    mins.push(val);
    mins.sort(sortFn).pop();
  });
  return Math.max(
    maxes.reduce((prod, val) => val * prod),
    maxes[0] * mins.reduce((prod, val) => prod * val),
  );
}

const maximumProductSort = nums => {

  nums.sort((a, b) => a - b)

  const max = nums.length

  let x = nums[max - 1] * nums[max - 2] * nums[max - 3]

  let y = nums[0] * nums[1] * nums[max - 1]

  return Math.max(x, y)
}


var maximumProductEfficient = function(nums) {
  if (!nums || nums.constructor.name !== 'Array' || nums.length < 3) {
    return;
  }

  let min1 = Number.MAX_SAFE_INTEGER,
    min2 = Number.MAX_SAFE_INTEGER,
    max1 = Number.MIN_SAFE_INTEGER,
    max2 = Number.MIN_SAFE_INTEGER,
    max3 = Number.MIN_SAFE_INTEGER

  const length = nums.length;
  for (let i = 0; i < length; i++) {
    const element = nums[i];
    if (element <= min1) {
      min2 = min1;
      min1 = element;
    } else if (element <= min2 ) {
      min2 = element;
    }

    if (element >= max1) {
      max3 = max2;
      max2 = max1;
      max1 = element;
    } else if (element >= max2) {
      max3 = max2;
      max2 = element;
    } else if (element >= max3) {
      max3 = element;
    }
  }
  return Math.max(min1 * min2 * max1, max1 * max2 * max3);
};

var maximumProductEfficient2 = function(nums) {
  if (!nums || nums.constructor.name !== 'Array' || nums.length < 3) {
    return;
  }

  let min1 = Number.MAX_SAFE_INTEGER,
    min2 = Number.MAX_SAFE_INTEGER,
    max1 = Number.MIN_SAFE_INTEGER,
    max2 = Number.MIN_SAFE_INTEGER,
    max3 = Number.MIN_SAFE_INTEGER

  const length = nums.length;
  for (let i = 0; i < length; i++) {
    const element = nums[i];
    if (element <= min2 ) {
      if (element <= min1) {
        min2 = min1;
        min1 = element;
      } else {
        min2 = element;
      }
    }
    
    if (element >= max3) {
      if (element >= max2) {
        if (element >= max1) {
          max3 = max2;
          max2 = max1;
          max1 = element;
        } else {
          max3 = max2;
          max2 = element;
        }
      } else {
        max3 = element;
      }
    }

  }

  return Math.max(min1 * min2 * max1, max1 * max2 * max3);
};

timeFuncs(
  [
    maximumProduct, 
    maximumProductSort, 
    maximumProductFancy, 
    maximumProductEfficient,
    maximumProductEfficient2,
  ],
  wrapper(randomFloatArr),
  [10000, 1000, -1000],
  1000
  );
