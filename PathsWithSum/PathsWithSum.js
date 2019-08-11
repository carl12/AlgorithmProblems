
function pathsWithSum(root, value){
  let self = pathsWithSumFrom(root, value);
  let left = root.left ? pathsWithSum(root.left, value) : 0;
  let right = root.right ? pathsWithSum(root.right, value) : 0;

  return self + left + right;

  function pathsWithSumFrom(root, value) {
    let sum = 0;
    let remaining = value - root.value
    if (remaining === 0) {
      sum += 1;
    }
    root.left && (sum += pathsWithSumFrom(root.left, remaining));
    root.right && (sum += pathsWithSumFrom(root.right, remaining));
    return sum;
  }
}


class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

let a = new Node(3);
let b = new Node(6);
let c = new Node(10);
let d = new Node(4);
// let c = new Node(10);

a.left = b;
a.right = c;
b.left = d;


console.log(pathsWithSum(a, 10));

// initial solution elegant but inefficient
// break down problem -> paths to leaf are basically a linked list -> find contiguous subsequence with sum 
  // thus, enter all running sums into hash table (keep count of each value to handle duplicates)
  // Do lookup in hash for current sum - target
  // if different exists in hash there is a subsequence
  // 1, 2, 3, 4, 5, -2 + looking for 7
  // {1,} 
  // {1, 3} + lookup -4 X
  // {1, 3, 6} + lookup -1 X
  // {1, 3, 6, 10} + lookup 3 ++
  // {1, 3, 6, 10, 15} + lookup 8 X
  // {1, 3, 6, 10, 15, 13} + lookup 6 ++

  // return 2
// With this approach you can incrementally add and remove to hash as you traverse
// Maximum hash size is depth of tree


// old approach is O(N * depth), this one is O(N)

// ---------------
// Takeaways 
// ---------------

// Don't stop at elegant recursive solution
// Break down essence of problem (finding contiguous subsequence in arr)

// 



