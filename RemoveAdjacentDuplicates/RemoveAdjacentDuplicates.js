/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicatesLL = function (S) {
  if (S.length < 2) {
    return S;
  }
  let l = new LinkedList();
  S.split('').forEach(val => l.addValue(val));
  let curr = l.head;

  while (curr && curr.next) {
    if (curr.value === curr.next.value) {
      let first = curr;
      let second = curr.next;
      if (curr.prev) {
        curr = curr.prev;
      } else {
        curr = curr.next.next;
      }
      l.delete(first);
      l.delete(second);
    } else {
      curr = curr.next;
    }
  }
  return l.toArray().join('');
};

/**
* @param {string} S
* @return {string}
*/
var removeDuplicates3 = function (S) {
  let arr = S.split('')
  for (let i = 0; i < arr.length - 1;) {
    if (arr[i] === arr[i + 1]) {
      arr.splice(i, 2)
      if (i > 0) {
        i--;
      }
    } else {
      i++;
    }
  }
  return arr.join('')

};

var removeDuplicatesStack = (S) => {
  var resArr = []
  for (let ch of S) {
    resArr[resArr.length - 1] === ch ? resArr.pop() : resArr.push(ch)
  }
  return resArr.join('')
};


class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  addValue(val) {
    let newNode = this.makeNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  makeNode(val) {
    return { value: val, next: null, prev: null };
  }

  delete(node) {
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (this.head === node) {
      this.head = node.next;
    }
    if (this.tail === node) {
      this.tail = node.prev;
    }
  }

  toArray() {
    let curr = this.head;
    let arr = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
}
function randomRange(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
function genRandom(len, num) {
  let aVal = 'a'.charCodeAt();
  let arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(String.fromCharCode(randomRange(aVal, aVal + num)));
  }
  return arr.join('');
}
function run(fn, gen, times, ...genArgs) {
  let before = Date.now();
  for (var i = 0; i < times; i++) {
    fn(gen(...genArgs));
  }
  return Date.now() - before;
}


function makeTable() {
  let a = {};
  let amounts = [10, 100, 1000, 10000];
  let chrAmounts = [1, 3, 10, 100];
  for (var amount of amounts) {
    a[amount] = {};
    for (var chrAmount of chrAmounts) {
      
      a[amount][chrAmount] = (
        run(removeDuplicatesStack, genRandom, 100000 / amount, amount, chrAmount) /
        run(removeDuplicatesLL, genRandom, 100000 / amount, amount, chrAmount)
      ).toFixed(2);
    }
  }
  console.table(a);
  console.log('done');
}


makeTable();