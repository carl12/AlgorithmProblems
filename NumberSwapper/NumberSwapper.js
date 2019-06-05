// Write a function to swap two numbers in place

function swap(a, b) {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
  return [a, b];
}

function swap2(a, b) {
  a ^= b;
  b ^= a;
  a ^= b;
  return [a, b];
}

function swap3(a, b) {
  a = a + b;
  b = a - b;
  a = a - b;
  return [a, b];
}
console.log(swap3(-1 , 3));