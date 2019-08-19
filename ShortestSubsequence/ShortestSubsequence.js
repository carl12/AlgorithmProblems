
function ShortestSubsequence(a, b) {
  let aNums = a.reduce((obj, entry) => {
    obj[entry] = 0;
    return obj;
  }, {});
  // console.log(aNums);
  let max = [0, b.length];
  let back = 0;
  let valid = 0;
  for (let front = 0; front < b.length; front++) {
    if (aNums[b[front]] === undefined) {
      // console.log('jumping', front);
      if (valid === 0) {
        // console.log('jumping back', back);
        back ++;
      }
      continue;
    }
    // console.log(front, b[front], aNums[b[front]]);
    // console.log(aNums);
    if (aNums[b[front]] === 0) {
      valid ++;
    }
    aNums[b[front]] ++;
    // console.log(b[front], b[back])
    if (front > back && b[front] === b[back]) {
      // console.log(aNums);      
      while (back < front && (aNums[b[back]] === undefined || aNums[b[back]] > 1)) {
        if (aNums[b[back]] !== undefined) {
          aNums[b[back]] --;
          // console.log('decrementing', b[back]);
        }
        back ++;
        // console.log(aNums);
      }
    }
    if (valid === a.length && front - back < max[1] - max[0]) {
      max = [back, front];
    }
  }
  console.log(max);
  return max[1] === b.length ? null : max;
}

ShortestSubsequence([1, 5, 9], [7, 7, 7, 7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7]);
  
  // proper reduce syntax - asignment evaluates to value not object

  // proper variables
    // aNums instead of b
    // use element instead of index in hash
  
  // leading variable was assumed to be a valid number, but was initialized to any number
  // Understanding what values represent in algorithm, and making sure initialization is valid
    // (consider initialization and maintenance and termination)

    
      