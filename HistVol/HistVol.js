
function HistVol(bars){
  let left = 0;
  let right = bars.length - 1;
  let sum = 0;
  let leftVal = bars[left];
  let rightVal = bars[right];
  while (left < right) {
    console.log(left, right, sum);
    if (leftVal <= rightVal) {
      left = loop(left, rightVal, 1);
      leftVal = bars[left];
    } else {
      right = loop(right, leftVal, -1);
      rightVal = bars[right];
    }
  }
  console.log(sum);
  return sum;

  // uses closure on sum, bars
  function loop(start, otherSide, inc) {
    let i;
    for (i = start + inc; bars[i] < otherSide && bars[i] <= bars[start]; i += inc) {
      if (bars[i] < bars[start]) {
        sum += bars[start] - bars[i];
      }
    }
    return i;
  }
}

function HistVol2(bars) {
  let left = 0;
  let right = bars.length - 1;
  let sum = 0;
  let leftMax = bars[left];
  let rightMax = bars[right];
  while (left < right) {
    console.log('hi');
    while (leftMax <= rightMax && left < right) {
      console.log(left, leftMax, rightMax);
      let curr = bars[left];
      if (curr >= leftMax) {
        leftMax = curr;
      } else {
        sum += leftMax - curr;
      }
      left ++;
    }
    while (rightMax < leftMax) {
      let curr = bars[right];
      if (curr > rightMax) {
        rightMax = curr;
      } else {
        sum += rightMax - curr;
      }
      right --;

    }
  }
  console.log(sum);
  return sum;
}

HistVol2([3, 0, 0, 1, 5, 0, 2, 6]);
