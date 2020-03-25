
function oneMoreThan(list, target) {
  let lo = 0;
  let hi = list.length;
  while (lo != hi) { // while more than one potential value
    mid = Math.floor(lo + (hi - lo) / 2); // Fancy avg for int overflow
    if (list[mid] <= target) {
      lo = mid + 1; // location must be greater than curr mid
    } else {
      hi = mid; // mid could be the value we're looking for but nothing more
    }
  }
  return list[lo % list.length];
}

console.log(oneMoreThan([5, 6, 7, 8], 10))

/* 
[1 .... 1000], 700 => ~701
    ""       , -1 => 1
    ""       , 1001 => NULL?
    ""       , 1000 => NULL?
[500 ... 500], 500 => NULL
[500 ... 500], 499 => 500 (1st one)
[500 ... 500], 501 => NULL
  Loop while more than one potential value
    0. Get middle (round down)
    1. Check 'middle'
      1.1 if less than or equal => low = mid + 1
      1.2 if more than => hi = mid

*/
