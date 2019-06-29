const rnd = require('../GenericRandoms');
function palindrome(str) {
  if (str.length === 0) {
    return '';
  }
  let furthestIn = 0;
  let currFurthestCenter = 0;
  let pals = [1];
  let maxLen = 1;
  let maxStr = str[0];
  for (var curr = 1; curr < str.length; curr++) {
    // console.log('----------');
    if (pals[curr - 1] > maxLen) {
      maxLen = pals[curr - 1];
      maxStr = str.slice(curr - 1 - maxLen + 1, curr + maxLen - 1);
    }
    let mirror = getMirroredLoc(currFurthestCenter, curr);
    let left;
    let right;
    let currPal;
    
    if (curr < currFurthestCenter && mirror >= 0) {
      if (curr + pals[mirror] >= currFurthestCenter) {
        // console.log(curr, furthestIn, currFurthestCenter, mirror)
        right = currFurthestCenter + 1;
        left = curr - (right - curr);
        currPal = right - curr; 
        // console.log(left, right, currPal);
      } else {
        // console.log(str[curr], currPal), 'contained';
        pals.push(pals[mirror]);
        continue;
      }
    } else {
      left = curr - 1;
      right = curr + 1;
      currPal = 1;
    }
    while (left >= 0 && right < str.length  && str[left] === str[right]) {
      left --;
      right ++;
      currPal ++;
    }
    // console.log(str[curr], currPal);
    pals.push(currPal);
    if (curr + currPal - 1 > furthestIn) {
      furthestIn = curr + currPal - 1;
      currFurthestCenter = curr;
    }
  }
  // console.log(pals);
  return maxStr;
  function getMirroredLoc(center, curr) {
    return center - (curr - center);
  }
}

var palindrome2 = function (string) {

  let currLenCheck = string.length;
  let longestPal = '';
  let lastLoc = string.length - 1;
  while (currLenCheck > longestPal.length) {
    let minPalSpace = currLenCheck / 2 - 0.5;
    for(
      let middle = minPalSpace; 
      middle <= lastLoc - minPalSpace; 
      middle += 0.5 
    ) {
        let found = getLongestPalindromeCenteredAt(string, middle);
        if (found.length > longestPal.length) {
          longestPal = found;
        }
      }
    currLenCheck --;
  }
  return longestPal;
};

var palindrome3 = function (string) {

  let currLenCheck = string.length;
  let longestPal = '';
  let lastLoc = string.length - 1;
  while (currLenCheck > longestPal.length) {
    let minPalSpace = Math.floor(currLenCheck / 2 - 0.5);
    for(
      let middle = minPalSpace; 
      middle <= lastLoc - minPalSpace; 
      middle += 1 
    ) {
        let found = getLongestPalindromeCenteredAt(string, middle);
        if (found.length > longestPal.length) {
          longestPal = found;
        }
      }
    currLenCheck --;
  }
  return longestPal;
};

function getLongestPalindromeCenteredAt(string, middle) {
  let lo = Math.floor(middle);
  let hi = Math.ceil(middle);
  if (string[lo] !== string[hi]) {
    return '';
  }
  while (lo > 0 && string[lo - 1] === string[hi + 1]) {
    lo --;
    hi ++;
  }
  return string.slice(lo, hi + 1);
}
//          0123456789
//          1221311112141272141211111
// console.log(palindrome('wewerewvasabasasabasawefw'));
// console.log(palindrome2('wewerewvasabasasabasawefw'));


for (let i = 0; i < 1000; i++ ) {
  let str = rnd.randomString(1000, 3);
  let p1 = palindrome(str);
  let p2 = palindrome3(str);
  if (p1.length !== p2.length) {
    console.log(p1, p2);
    console.log(str);
    return;
  }
}