
function MaxSubmatrix(numMat) {
  if (numMat.length === 0 || numMat[0].length === 0) {
    return null;
  }
  // precompute top-corner sums
  // loop over row pairs
    // Sum row pairs
    // run get largest diff
    // compare to max
  // return max
  
  let topCornerSums = getTopCornerSums(numMat);
  let largestSum = numMat[0][0];
  console.log(topCornerSums);
  for (let i = 0; i < numMat.length; i++) {
    for (let j = i + 1; j < numMat.length; j++) {
      let sumPairs = getTopCornerRowSumPairs(topCornerSums, j, i);
      largestSum = Math.max(getLargestOrderedDiff(sumPairs), largestSum);
    }
  }
  return largestSum;

  function getTopCornerSums(mat) {
    let newMat = new Array(mat.length).fill(0).map(val => new Array(mat[0].length));
    for (let i = 0; i < mat.length; i++) {
      for (let j = 0; j < mat[i].length; j++) {
        let up;
        let left;
        let upLeft;
        if (i > 0 && j > 0) {
          up = newMat[i - 1][j];
          left = newMat[i][j - 1];
          upLeft = newMat[i - 1][j - 1];
        } 
        if (j === 0) {
          left = 0;
          upLeft = 0;
        } else {
          left = newMat[i][j - 1];
        }
        if (i === 0) {
          up = 0;
          upLeft = 0;
        } else {
          up = newMat[i - 1][j];
        }
        
        let curr = mat[i][j];
        newMat[i][j] = curr + up + left - upLeft;
      }
    }
    return newMat;
  }

  function getTopCornerRowSumPairs(topCornerSums, botRow, topRow) {
    return topCornerSums[botRow].map((botRowVal, i) => botRowVal - topCornerSums[topRow][i]);
  }

  function getLargestOrderedDiff(sumPairs) {

    let maxDiff = sumPairs[0] - 0;
    let min = Math.min(sumPairs[0], 0);
    for (let i = 1; i < sumPairs.length; i++) {
      maxDiff = Math.max(maxDiff, sumPairs[i] - min);
      min = Math.min(min, sumPairs[i]);
    }
    return maxDiff;
  }
}

let mat = [
  [1, 2, -1, 10],
  [-2, 3, -5, -3],
  [-5, 6, 5, 4],
  [-8, 3, -2, 5],
];

console.log(MaxSubmatrix(mat));

// Constant time operations that require a particular start aren't as useful as arbitrary time
  // ie. being able to precompute and give a sum for any square in constant time is more useful 
  // than being able to determine a sum if you have previously computed the neighboring squares 
  // with the same corner

// If looking for 4 vectors of information, try to iterate over 3 of them and do a constant lookup for the 4th. 
// Often hold two constant and then see if you can find the remaining two in linear time
