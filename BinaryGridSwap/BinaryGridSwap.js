const timer = require('../SolutionRunner');
const rnd = require('../GenericRandoms');


/**
 * @param {number[][]} grid
 * @return {number}
 */
var minSwaps = function (arr) {
  const N = arr.length
  // let arr = []
  // for(let i = 0 ; i < N; i ++ ){
  //     let cnt = 0
  //     for(let j = grid[i].length -1; j >=0; j --){
  //         if (grid[i][j] != 0){
  //             break
  //         }
  //         cnt++
  //     }
  //     arr.push(cnt)
  // }
  arr = arr.map(el => arr.length - el - 1);
  let swap = 0
  for (let i = 0; i < N; i++) {
    let idx = -1
    for (let j = i; j < N; j++) {
      if (arr[j] >= N - i - 1) {
        idx = j
        break
      }
    }
    if (idx == -1) {
      return -1
    }

    swap += (idx - i)
    let [v] = arr.splice(idx, 1)
    arr.splice(i, 0, v)
  }
  return swap
};



function convertRowToNum(row) {
  for (let i = row.length - 1; i >= 0; i--) {
    if (row[i] === 1) {
      return i;
    }
  }
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minSwaps2 = function (nums) {
  let a = new Set();
  // let nums = grid.map(row => convertRowToNum(row));
  // console.log(nums);
  let swaps = 0;
  for (i in nums) {
    while (a.has(nums[i])) {
      nums[i]++;
    }
    if (nums[i] >= nums.length) {
      return -1;
    }
    a.add(nums[i]);
  }
  for (let i = nums.length - 2; i >= 0;) {
    for (var j = i; nums[i] > j; j++) {

    }
    let [v] = nums.splice(i, 1);
    nums.splice(j, 0, v);
    // console.log(i, j);
    swaps += j - i;
    i = j - 1;
  }
  return swaps;
};

function makeInput(range) {
  size = Math.floor(Math.random() * range);
  return [new Array(size).fill(0).map(el => Math.floor(Math.random() * (size - 1)))];
}

timer([minSwaps, minSwaps2], makeInput, [1000], 1000);

// console.log(minSwaps2( [ 2, 0, 1, 0 ]))