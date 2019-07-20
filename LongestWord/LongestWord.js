
function LongestWord(words){
  let wordSet = new Set(words);
  let longest = null;
  
  for (let word of words) {
    if (madeOfWords(word, wordSet)) {
      if (!longest || longest.length < word.length) {
        longest = word;
      } 
    }
  }

  return longest;ame, ans] = res.split('~~');
  return

}
function madeOfWords(word, set) {
  let hashedValidLocs = [];
  function madeOfWordsFrom(word, set, loc = 0) {
    let first = loc === 0;
    if (hashedValidLocs[loc] !== undefined) {
      return hashedValidLocs[loc]
    }
    // console.log(loc);
    if (loc === word.length) {
      return true;
    }
  
    for (let i = loc + 1; i <= word.length; i++) {
      if (set.has(word.slice(loc, i))) {
        if (first && i === word.length) {
          return false;
        }
        let valid = madeOfWordsFrom(word, set, i);
        if (valid) {
          hashedValidLocs[loc] = true;
          return true;
        }
      }
    }
    hashedValidLocs[loc] = false;
    return false;
  }
  return madeOfWordsFrom(word, set, 0);
}

// console.log(madeOfWords('aaaaaaaaaaaaadog', new Set(['abdogdogggaazaabdoggazabdogiuhouih','a', 'b', 'dog', 'dogg', 'ga', 'az', 'aabdoggaz', 'aba', 'aaaaaaaaaaaaadog'])))

// let set = new Set(['a', 'b', 'dog', 'dogg', 'ga', 'az']);

// console.log(madeOfWordsFrom('aabdoggaz', set));

// console.log(LongestWord(['abdogdogggaazaabdoggazabdogiuhouih','a', 'b', 'dog', 'dogg', 'ga', 'az', 'aabdoggaz', 'aba', 'aaaaaaaaaaaaadog']));

// word composed of only itself is not valid
  // different ways to resolve
  // flag for when called on first word
  // remove item from set, then replace before finish 