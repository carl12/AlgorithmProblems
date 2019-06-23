
function divingBoardLengths(d1, d2, k) {
  if (d1 === d2) {
    return [d1 * k];
  }
  const distances = [];
  for (let i = 0; i <= k; i++) {
    distances.push(d1 * i + d2 * (k - i));
  }
  return distances;
}

function divingBoardLengths2(d1, d2, k) {
  if (d1 === d2) {
    return [d1 * k];
  }
  const distances = [];
  let currDist = d1 * k;
  distances.push(currDist);
  let diff = d2 - d1;
  for (let i = 1; i <= k; i++) {
    currDist -= diff;
    distances.push(currDist);
  }
  return distances;
}

// console.log(divingBoardLengths(1, 2, 5));
// console.log(divingBoardLengths(1, 2, 6));
// console.log(divingBoardLengths(2, 3, 5));
// console.log(divingBoardLengths(1, 1, 5));