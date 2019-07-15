
function majorityElement(nums){
  if (nums.length === 0) {
    return -1;
  }
  let halfLength = nums.length / 2;

  let curr = nums[0];
  let match = 1;
  let total = 1;
  let start = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === curr) {
      match ++;
    }
    total ++;
    if (match/total < 0.5) {
      curr = nums[i];
      match = 1;
      total = 1;
      start = i;
    }
    if (match > halfLength) {
      return curr;
    }
  }

  for (let i = start - 1; i >= 0; i --) {
    if (nums[i] === curr) {
      match ++;
    }
    total ++;
    if (match/total < 0.5) {
      curr = nums[i];
      match = 1;
      total = 1;
      start = i;
    }
    if (match > halfLength) {
      return curr;
    }
  }

  return -1;
}

console.log(majorityElement([1, 2, 5, 6, 5, 6, 5, 5, 5]));