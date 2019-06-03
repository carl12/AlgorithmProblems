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
  console.log(store);
  for (var i = nums.length - 1; i >= 0; i --) {
      store[i] = (store[i - 1] || 1) * (nums[i + 1] || 1);
      nums[i] = (store[i + 1] || 1) * nums[i];
  }
  console.log(store);
  console.log(nums);
};