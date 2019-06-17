
const max = (a, b) => {
  // generate value that is 1 if b is greater, and 0 if a is greater
  let k = - (((a - b) & (1 << 31)) >> 31);

  return b * k + a * !k;
};

console.log(max(4, 2));
console.log(max(2, 4));
console.log(max(2, 2));
console.log(max(2, 0));
console.log(max(0, 2));
console.log(max(-4, -2));
console.log(max(-2, -4));
console.log(max(0, -4));
console.log(max(-4, 0));
console.log(max(-4, 4));
console.log(max((-9000000000000000001), (900000000000000000000123)));
// console.log(max(-600000000000, -400000000));

k = - ((((-9000000000000000001)- (900000000000000000000123)) & (1 << 31)) >> 31);

// Float representation causes issues when shifting
console.log(((-9000000000000000001) - (-900000000000000000000123)) & (1 << 31));
console.log(((-9000000000000000001) - (-900000000000000000000123)) & (1 << 31) >> 31);