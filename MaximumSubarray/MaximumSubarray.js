/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  if (!nums || !nums.length) {
      return null;
  }
  let left = 0;
  let bestSum = nums[0];
  let currSum = nums[0];
  for (let right = 1; right < nums.length; right++) {
      if (currSum < 0) {
          left = right;
          currSum = 0;
      }
      currSum += nums[right];
      bestSum = Math.max(currSum, bestSum);
  }
  return bestSum;
};

var maxSubArray = function(nums) {
  if (!nums || !nums.length) {
      return null;
  }
  let currSum = nums[0];
  return nums.reduce((bestSum, val) => {
    currSum = Math.max(0, currSum);
    currSum += val;
    return Math.max(currSum, bestSum);
  });
};