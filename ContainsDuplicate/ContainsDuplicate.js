/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = (nums) => {
  let chars = new Set();
  return nums.reduce((duplicate, val) => duplicate || chars.has(val) || !chars.add(val), false);
};
