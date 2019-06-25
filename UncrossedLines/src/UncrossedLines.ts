
const maxUncrossedLines = function(A: number[], B: number[]): number {

  const store: number[][] = new Array(A.length + 1)
    .fill(0)
    .map(() => new Array(B.length + 1).fill(0));
  
  let lastRow: number[] = new Array(B.length + 1).fill(0);
  let currRow: number[] = new Array(B.length + 1);
  currRow[0] = 0;

  for (var i = 1; i < A.length + 1; i++) {
    for (var j = 1; j < B.length + 1; j++) {
      if (A[i - 1] === B[j - 1]) {
        currRow[j] = lastRow[j - 1] + 1;
      } else {
        currRow[j] = Math.max(currRow[j - 1], lastRow[j]);
      }
    }
    lastRow = currRow;
    currRow = new Array(B.length + 1);
    currRow[0] = 0;
  }
  return lastRow[j - 1];
}

console.log(maxUncrossedLines([1,3,7,1,7,5],
  [1,9,2,5,1]
  ));
