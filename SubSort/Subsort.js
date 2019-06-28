 let rnd = require('../GenericRandoms');

function subSort(arr) {
  let lastInPlace = arr.length - 1;
  let firstInPlaceFromEnd = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      lastInPlace = i - 1;
      break;
    }
  }

  if (lastInPlace === arr.length -1) {
    return [0, 0];
  }

  for (let i = arr.length - 1; i >= 1; i--) {
    if (arr[i - 1] > arr[i]) {
      firstInPlaceFromEnd = i;
      break;
    }
  }

  // TODO - manually find min and max
  let middle = arr.slice(lastInPlace, firstInPlaceFromEnd + 1);
  let minMiddle = Math.min(...middle);
  let maxMiddle = Math.max(...middle);

  let left = lastInPlace;
  while (left > 0 && minMiddle <= arr[left - 1]) {
    left --;
  }
  
  let right = firstInPlaceFromEnd;
  while (right < arr.length - 1 && maxMiddle > arr[right + 1]) {
    right ++;
  }

  return [left, right];
}

function subSort2(arr) {
  let left = findFurthestLeftGreaterThanMin(arr);
  let right = findFurthestRightLessThanMax(arr);
  return [left, right];
}

function findFurthestLeftGreaterThanMin(arr) {
  let min = arr[arr.length - 1];
  let minLoc = 0;
  for (let i = arr.length - 2; i >= 0; i --) {
    if (arr[i] > min) {
      minLoc = i;
    } else {
      min = arr[i];
    }
  }
  return minLoc;
}

function findFurthestRightLessThanMax(arr) {
  let max = arr[0];
  let maxLoc = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < max) {
      maxLoc = i;
    } else {
      max = arr[i];
    }
  }
  return maxLoc;
}

// for (var i = 0; i < 10000; i++ ){ 
//   let arr = rnd.randomFloatArr(4);
//   let a = subSort(arr);
//   let b = subSort2(arr);
//   if (a[0] !== b[0] || a[1] !== b[1]) {
//     console.log(a, b);
//   }
// }