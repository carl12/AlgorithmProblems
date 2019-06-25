/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  let store = new Array(nums.length);
  store[0] = nums[0];
  for (var i = 1; i < nums.length; i++) {
      
      store[i] = store[i - 1] * nums[i];
  }
  for (var i = nums.length - 1; i >= 0; i --) {
      let nP1 = nums[i + 1] === undefined ? 1 : nums[i + 1];
      let sM1 = store[i - 1] === undefined? 1 : store[i - 1];
      store[i] = sM1 * nP1;
      nums[i] = nP1 * nums[i];
  }
  return store;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  let store = new Array(nums.length);
  store[0] = nums[0];
  for (var i = 1; i < nums.length; i++) {
      store[i] = store[i - 1] * nums[i];
  }
  let right = 1;
  for (var i = nums.length - 1; i >= 0; i --) {
      let sM1 = store[i - 1] === undefined? 1 : store[i - 1];
      store[i] = sM1 * right;
      right *= nums[i];
  }
  return store;
};