 
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

  console.log(middle)
  console.log(minMiddle, maxMiddle);

  let left = lastInPlace;
  while (left > 0 && minMiddle <= arr[left - 1]) {
    left --;
  }
  
  let right = firstInPlaceFromEnd;
  while (right < arr.length - 1 && maxMiddle > arr[right + 1]) {
    console.log(right)
    right ++;
  }
  console.log(left, right);

  return [left, right];
}

subSort([-10,2,3,4,-1, 2, 20, 2, 3, 4, 50]);