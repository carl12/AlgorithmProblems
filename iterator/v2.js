var minAbsDifference = function (nums, goal) {
  var n = nums.length;
  var half = Math.floor(n / 2);
  var left = dfs(nums.slice(0, half));
  var right = dfs(nums.slice(half, n));
  var res = Math.abs(goal);
  for (var val of left) {
    // find the first (right[i] + val > goal), upperbound
    var i = binarySearch_upper(right, goal - val);
    res = Math.min(res, Math.abs(val + right[i] - goal));
    if (i - 1 > 0) {
      res = Math.min(res, Math.abs(val + right[i - 1] - goal));
    }
  }
  return res;
  function binarySearch_upper(arr, target) {
    var l = 0;
    var r = arr.length - 1;
    while (l < r) {
      var mid = Math.floor((l + r) / 2);
      if (arr[mid] <= target) {
        l = mid + 1;
      }
      else {
        r = mid;
      }
    }
    return l;
  }
  function dfs(arr) {
    var s = [0]; // can select any single number
    for (var val of arr) {
      var size = s.length;
      for (var i = 0; i < size; i++) {
        s.push(s[i] + val);
      }
    }
    s.sort((x, y) => x - y);
    return s;
  }
};

const vals = [
  // [5, -7, 3, 5],
  // 6,
  [1, 1, 1, -1, 1, 1, 1, 1, 1, 1, -1, 1, 1],
  -2,
  // [10000000, 10000000, 10000000, 10000000, -10000000, -10000000, -10000000, -6285, -1782, -5306, 8809, -8656, 1370, -7465, -6992, -6619, -171, 388, -1843, -1175, 7354, -8370, 1854, -8979, -7434, -5445, 3085, 2191, -2069, -6925, 774, 10000000, 10000000, 10000000, -10000000, -10000000, -10000000, -10000000],
  // 100000,
  // [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, -1, -2, -4, -8, -16, -32, -64, -128, -256, -512, -1024, -2048, -4096, -8192, -16384, -32768, -65536, -131072, -262144, -524288],
  // 1048574,
];

for (let i = 0; i < vals.length - 1; i+= 2) {
  console.log(minAbsDifference(vals[i], vals[i + 1]));
}
