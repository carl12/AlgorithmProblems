
function LettersAnNumbers(arr) {
  let firstOccurrence = {0: -1};
  let max = 0;
  let curr = 0;
  for (let i = 0; i < arr.length; i++) {
    if (isNaN(arr[i])) {
      curr ++;
    } else {
      curr --;
    }
    if (firstOccurrence[curr] === undefined) {
      firstOccurrence[curr] = i;
    } else {
      max = Math.max(max, i - firstOccurrence[curr]);
    }
  }
  return max;
}


// console.log(LettersAnNumbers(['a',1, 'a', 'a', 'a', 'a', 1, 1, 'a', 1, 'a', 1, 1, 1]));