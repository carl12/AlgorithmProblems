
function MissingTwo(arr) {
  let sum = arr.reduce((sum, val) => val + sum);
  let totalSum = ((arr.length + 2) * (arr.length + 3)) / 2;
  let diff = totalSum - sum;
  let prod = arr.reduce((prod, val) => val * prod);
  let fact = factorial(arr.length + 2);
  let quotient = fact / prod; 

  console.log(diff, quotient);
  for (let i = 1; i < diff / 2; i++) {
    let j = diff - i;
    if (i * j === quotient) {
      console.log([i, j]);
      return [i, j];
    }
  }
  console.log('null');
  return null;

  function factorial(n) {
    if (n < 2) {
      return 1;
    }
    return n * factorial(n - 1);
  }
}


MissingTwo([1,3,5, 6, 7, 2, 4, 10]);

// Solve system of equations instead of looping through options
// Quadratic formula for 
// BigInt for factorials
// Use sum of squares

let a = 30001n;
let b = BigInt(1000000000000000000008n);
console.log(b);
console.log(typeof (a * b));
console.log(a * b);
console.log(1234567890123456789n * 1200000000000000000000000000000000003n);