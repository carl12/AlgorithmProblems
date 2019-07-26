const Heap = require('collections/heap');
class ContinuousMedian {
  constructor() {
    this.low = new Heap(); //max heap
    this.high = new Heap([], null, (a, b) => b - a); //min heap
    this.med = null;
  }

  addNew(k) {
    let {low, high, med} = this;
    // base case for empty
    if (low.length === 0 && high.length === 0 && med === null) {
      this.med = k;
    } 
    // median present, put median and k in opposite heaps
    else if (med !== null) {
      let [lo, hi] = [med, k].sort((a, b) => a - b);
      low.push(lo);
      high.push(hi);
      this.med = null;
    } 
    // no median, new median is middle of low, k, high
    else if (k < low.peek()) {
      this.med = low.pop();
      low.push(k);
    } else if (k > high.peek()) {
      this.med = high.pop();
      high.push(k);
    } else {
      this.med = k;
    }
    console.log('added', k);
    console.log(low.toArray(), this.med, high.toArray());
    return this.getMedian();
  }

  getMedian() {
    if (this.med !== null) {
      return this.med;
    } else if (this.low.length > 0) {
      return this.getLoHighAvg();
    } else {
      return null;
    }
  }

  getLoHighAvg() {
    return this.high.peek() - (this.high.peek() - this.low.peek())/2;
  }
}

let med = new ContinuousMedian();

console.log(med.addNew(1));
console.log(med.addNew(3));
console.log(med.addNew(1));
console.log(med.addNew(5));
console.log(med.addNew(7));
console.log(med.addNew(10));
console.log(med.addNew(12));
console.log(med.addNew(15));
console.log(med.addNew(16));
console.log(med.addNew(-1));
