
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