const Heap = require('collections/heap');
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
  console.log(h.toArray());
  return h.toArray().sort((a, b) => a - b);
}

console.log(SmallestK([1,2,3,4,5,-10,0,5,1], 6));


