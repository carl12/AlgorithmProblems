const timeFunctions = require('../SolutionRunner');
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightSortPop = function(stones) {
    stones.sort((a, b) => a - b);
    let newRock;
    while(stones.length > 1) {
        let a = stones.pop();
        let b = stones.pop();
        newRock = a - b;
        if (newRock > 0) {
            // stones.splice(0, 0, newRock);  
            stones.push(newRock);  
            // insertLast(stones);
            stones.sort((a,b) => a - b);

        }
    }
    
    if (stones.length > 0) {
        return stones[0];
    } else {
        return 0;
    }
};
var lastStoneWeightInsertPop = function(stones) {
    stones.sort((a, b) => a - b);
    let newRock;
    while(stones.length > 1) {
        let a = stones.pop();
        let b = stones.pop();
        newRock = a - b;
        if (newRock > 0) {
            // stones.splice(0, 0, newRock);  
            stones.push(newRock);  
            insertLast(stones);
            // stones.sort((a,b) => a - b);

        }
    }
    
    if (stones.length > 0) {
        return stones[0];
    } else {
        return 0;
    }
};

function insertLast(arr) {
  if (arr.length === 1) {
    return arr;
  }
  let curr = 1;
  while (curr < arr.length - 1 && arr[curr - 1] <= arr[curr]) {
    curr ++;
  }
  if (curr !== arr.length - 1) {
    console.log(curr, arr.length, 'asdf');
    console.log(arr.slice(curr));
  } - 2
  while (curr > 0 && arr[curr] < arr[curr - 1]) {
    [arr[curr], arr[curr - 1]] = [arr[curr - 1], arr[curr]];
    curr --;
  }
}

var lastStoneWeightFindMax = function(stones) {
    let max
    let max$2
    let index
    while (stones.length >= 2) {
        max = Math.max(...stones)
        index = stones.indexOf(max)
        stones.splice(index, 1)
        max$2 = Math.max(...stones)
        index = stones.indexOf(max$2)
        stones.splice(index, 1)
        if (max !== max$2 || !stones.length) {
            stones.push(max - max$2)
        }
    }
    return stones[0]
};

var lastStoneWeightHeap = function(stones) {
    let heap = new BinaryHeap(true);
    while(stones.length) {
        heap.insert(stones.pop());
    }
    while (heap._heap.length > 1) {
        let a = heap.removeRoot();
        let b = heap.removeRoot();
        let newRock = a - b;
        if (newRock > 0) {
            heap.insert(newRock);
        }
    }
    if (heap._heap.length === 0) {
        return 0;
    } else {
        return heap.removeRoot();
    }
}


function BinaryHeap (isMaxHeap = false) {
  this._heap = [];
  // this compare function will result in a minHeap, use it to make comparisons between nodes in your solution
  if (isMaxHeap) {
    this._compare = function (i, j) { return i < j };
  } else {
    this._compare = function (i, j) { return i > j };
function BinaryHeap (isMaxHeap = false) {
  this._heap = [];
  // this compare function will result in a minHeap, use it to make comparisons between nodes in your solution
  if (isMaxHeap) {
    this._compare = function (i, j) { return i < j };
  } else {
    this._compare = function (i, j) { return i > j };
  }
}

// This function works just fine and shouldn't be modified
BinaryHeap.prototype.getRoot = function () {
  return this._heap[0];
}

BinaryHeap.prototype.insert = function (value) {
  this._heap.push(value);
  let index = this._heap.length - 1
  let parent = this.getParent(index);
  while (index !== 0 && this._compare(this._heap[parent], value)) {
    [this._heap[parent], this._heap[index]] = [value, this._heap[parent]];
    index = parent;
    parent = this.getParent(index);
  }
}

BinaryHeap.prototype.removeRoot = function() {
  let index = 0;
  let val;
  this.swap(this._heap.length - 1, 0);
  let root = this._heap.pop();
  let len = this._heap.length;
  let biggerLoc;
  while (true) {
    val = this._heap[index];
    let cLoc = this.getChildren(index);
    
    if (cLoc[0] < len && cLoc[1] < len) {
      if (this._compare(this._heap[cLoc[1]], this._heap[cLoc[0]])) {
        if (this._compare(val, this._heap[cLoc[0]])) {
          biggerLoc = cLoc[0];
        } else {
          break;
        }
      } else { 
        if (this._compare(val, this._heap[cLoc[1]])) {
          biggerLoc = cLoc[1]
        } else {
          break;
        }
      }
    } else if (cLoc[0] < len) {
      if (this._compare(val, this._heap[cLoc[0]])) {
        biggerLoc=cLoc[0]
      } else {
        break;
      }
    } else {
      break;
    }
    this.swap(index, biggerLoc);
    index = biggerLoc;
  }
  return root;
}

BinaryHeap.prototype.swap = function(i1, i2) {
  [this._heap[i1], this._heap[i2]] = [this._heap[i2], this._heap[i1]];
}

BinaryHeap.prototype.getParent = function(index) {
  return Math.floor(( index - 1) / 2);
}

BinaryHeap.prototype.getMaxChildLoc = function(index) {
  let children = this.getChildren;
  if (this._compare(this._heap(children[0]), this._heap(children[1]))) {
    return children[1];
  } 
  return children[0];
}


BinaryHeap.prototype.getChildren = function(index) {
  return [index * 2 + 1, index * 2 + 2];
}
  }
}

// This function works just fine and shouldn't be modified
BinaryHeap.prototype.getRoot = function () {
  return this._heap[0];
}

BinaryHeap.prototype.insert = function (value) {
  this._heap.push(value);
  let index = this._heap.length - 1
  let parent = this.getParent(index);
  while (index !== 0 && this._compare(this._heap[parent], value)) {
    [this._heap[parent], this._heap[index]] = [value, this._heap[parent]];
    index = parent;
    parent = this.getParent(index);
  }
}

BinaryHeap.prototype.removeRoot = function() {
  let index = 0;
  let val;
  this.swap(this._heap.length - 1, 0);
  let root = this._heap.pop();
  let len = this._heap.length;
  let biggerLoc;
  while (true) {
    val = this._heap[index];
    let cLoc = this.getChildren(index);
    
    if (cLoc[0] < len && cLoc[1] < len) {
      if (this._compare(this._heap[cLoc[1]], this._heap[cLoc[0]])) {
        if (this._compare(val, this._heap[cLoc[0]])) {
          biggerLoc = cLoc[0];
        } else {
          break;
        }
      } else { 
        if (this._compare(val, this._heap[cLoc[1]])) {
          biggerLoc = cLoc[1]
        } else {
          break;
        }
      }
    } else if (cLoc[0] < len) {
      if (this._compare(val, this._heap[cLoc[0]])) {
        biggerLoc=cLoc[0]
      } else {
        break;
      }
    } else {
      break;
    }
    this.swap(index, biggerLoc);
    index = biggerLoc;
  }
  return root;
}

BinaryHeap.prototype.swap = function(i1, i2) {
  [this._heap[i1], this._heap[i2]] = [this._heap[i2], this._heap[i1]];
}

BinaryHeap.prototype.getParent = function(index) {
  return Math.floor(( index - 1) / 2);
}

BinaryHeap.prototype.getMaxChildLoc = function(index) {
  let children = this.getChildren;
  if (this._compare(this._heap(children[0]), this._heap(children[1]))) {
    return children[1];
  } 
  return children[0];
}


BinaryHeap.prototype.getChildren = function(index) {
  return [index * 2 + 1, index * 2 + 2];
}

function genRandArr(len = 10) {
  let arr = [];
  while (arr.length < len) {
    arr.push(Math.random()) 
  }
  return [arr];
}

timeFunctions([lastStoneWeightHeap, lastStoneWeightSortPop, lastStoneWeightFindMax], genRandArr, [50], 100);
console.log('---');
timeFunctions([lastStoneWeightHeap, lastStoneWeightSortPop, lastStoneWeightFindMax], genRandArr, [500], 100);
console.log('---');
timeFunctions([lastStoneWeightHeap, lastStoneWeightSortPop, lastStoneWeightFindMax], genRandArr, [5000], 1);
console.log('---');
timeFunctions([lastStoneWeightHeap, lastStoneWeightSortPop, lastStoneWeightFindMax], genRandArr, [10000], 1);
console.log('---');
timeFunctions([lastStoneWeightHeap, lastStoneWeightSortPop, lastStoneWeightFindMax], genRandArr, [20000], 1);
console.log('---');
timeFunctions([lastStoneWeightHeap, lastStoneWeightSortPop, lastStoneWeightFindMax], genRandArr, [40000], 1);
console.log('---');
