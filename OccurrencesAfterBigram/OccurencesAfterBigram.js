/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
var findOcurrences = function(text, first, second) {
  let state = [false, false];
  const res = [];
  for (let word of text.split(' ')) {
      if (state[1]) {
          res.push(word);
          state[1] = false;
      }
      state[1] = state[0] && word === second;
      state[0] = word === first;
      
  }
  return res;
};