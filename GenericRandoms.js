const randomFloatArr = (len = 10, max = 100, min = -100) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(Math.random() * (max - min) + min);
  }
  return arr;
}

const ascendingArr = (len = 10, start = 0) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(start + i);
  }
  return arr;
}

const descendingArr = (len = 10, end = 0) => {
  const arr = [];
  for (let i = len; i >= 0; i--) {
    arr.push(end + i);
  }
  return arr;
}

const randomChoiceArr = (options, len = 10) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(randomChoice(options));
  }
  return arr;
}

const randomRange = (low, hi) => {
  return Math.floor(Math.random() * (hi - low) + low);
}
const randomChoice = (options) => {
  return options[randomRange(0, options.length)];
}

const randomString = (len = 10, chars = 3) => {
  let charChoice = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'].slice(0, chars);
  let myLen = randomRange(0, len);
  let arr = [];
  for (let i = 0; i < myLen; i++) {
    arr.push(randomChoice(charChoice));
  }
  return arr.join('');

}

const wrapper = (a) => (...b) => [a(...b)];

module.exports = { 
  randomRange,
  randomFloatArr, 
  ascendingArr, 
  descendingArr, 
  randomChoiceArr, 
  randomString,
  wrapper,
  
};