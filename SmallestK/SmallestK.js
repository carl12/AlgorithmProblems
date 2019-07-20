const Heap = require('collections/heap');
const sol = require('../SolutionRunner');
const rnd = require('../GenericRandoms');
// console.log(Heap);


function SmallestK(arr, k) {
  let h = new Heap();
  for (let num of arr) {
    if (h.length < k) {
     h.push(num);
    } else if (h.peek() > num) {
      h.pop();
      h.push(num);
    }
  }
  return h.toArray();
}

function SmallestK2(arr, k) {
  if (k <= 0 ) {
    return [];
  }
  let last = arr;
  let [less, more] = partition(arr);
  while (less.length > k) {
    last = less;
    [less, more] = partition(less);
  }

  return less.concat(SmallestK(more, k - less.length))

  function partition(arr) {
    let a = arr[0];
    let less = [];
    let more = [];
    for (let el of arr) {
      if (el < a) {
        less.push(el);
      } else {
        more.push(el)
      }
    }
    return [less, more];
  }
}

function SmallestK3(arr, k, start = 0, end = arr.length) {
  // console.log('---------------');
  // console.log(arr);
  // console.log(k, start, end);
  if (k <= 0 ) {
    return [];
  }
  let last = end;
  let firstOfSecond = partition(arr, start, end);
  // console.log('looping', firstOfSecond, last);
  while (firstOfSecond - start > k) {
    last = firstOfSecond;
    firstOfSecond = partition(arr, start, firstOfSecond);
  }
  // console.log('sliced', start, firstOfSecond)
  return arr.slice(start, firstOfSecond).concat(SmallestK3(arr, k - (firstOfSecond - start), firstOfSecond, last))

  function partition(arr, start, loc) {
    if (start === loc - 1) {
      return loc;
    }
    swap(arr, start, loc - 1);
    let pivot = arr[start];
    let nextUnder = start;
    for (let i = start; i < loc; i++) {
      if (arr[i] < pivot) {
        [arr[nextUnder], arr[i]] = [arr[i], arr[nextUnder]];
        nextUnder ++;
      }
    }
    return nextUnder;
  }

  function swap(arr, a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }
}

// console.log(partition([4, 9, 6, 5, 1, 2, 3, 20, -1], 0, 9))

// console.log(SmallestK3([4,3,1,6,10,-1,20], 7));

let size = 3200000;
function genInput(size = 10) {
  return [rnd.randomFloatArr(size), Math.floor(Math.random() * size)];
}
sol([SmallestK, SmallestK3], genInput, [size], 10);
