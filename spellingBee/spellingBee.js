const rnd = require('../GenericRandoms');

function spellingBee2(words, puzzles) {
  let puzzleSet = puzzles.map(puzzle => new Set(puzzle));
  let wordSet = words.map(word => new Set(word)); // needed to look up first of puzzle
  let res = [];

  for (let i = 0; i < puzzles.length; i++) {
    let matches = 0;
    for (let j = 0; j < words.length; j++) {
      let valid = true;
      if (!wordSet[j].has(puzzles[i][0])) {
        continue;
      }
      for (let char of words[j]) {
        if (!puzzleSet[i].has(char)) {
          valid = false;
          break;
        }
      }
      if (valid) { matches++; }
    }
    res.push(matches);
  }
  return res;
}


function spellingBee3(wordList, puzzles) {
  //     debugger;
  let setWords = [];
  let setPuzzles = [];
  let results = new Array(puzzles.length).fill(0)

  //     iterate wordList
  for (let i = 0; i < wordList.length; i++) {
    setWords.push(new Set(wordList[i]));
    // go through each puzzle for Apple 
    let word = wordList[i]
    for (let j = 0; j < puzzles.length; j++) {
      setPuzzles.length < puzzles.length && setPuzzles.push(new Set(puzzles[j]));

      let spelled = true;
      let keyLetter = puzzles[j][0];
      if (!setWords[i].has(keyLetter)) {
        spelled = false
      }

      for (let k = 0; k < word.length; k++) {
        let letter = word[k]
        if (!setPuzzles[j].has(letter)) {
          spelled = false;
        }
      }

      if (spelled === true) {
        results[j] += 1;
      }
    }
  }
  return results;
}

function spellingBee(wordList, puzzles) {
  //     debugger;
  let setWords = [];
  let setPuzzles = [];
  let results = new Array(puzzles.length).fill(0)

  //     iterate wordList
  for (let i = 0; i < wordList.length; i++) {
    setWords.push(new Set(wordList[i]));
    // go through each puzzle for Apple 
    let word = wordList[i]
    for (let j = 0; j < puzzles.length; j++) {
      setPuzzles.push(new Set(puzzles[j]));

      let spelled = true;
      let keyLetter = puzzles[j][0];
      if (!setWords[i].has(keyLetter)) {
        spelled = false
      }

      for (let k = 0; k < word.length; k++) {
        let letter = word[k]
        if (!setPuzzles[j].has(letter)) {
          spelled = false;
        }
      }

      if (spelled === true) {
        results[j] += 1;
      }
    }
  }
  return results;
}

var wordList = ['APPLE', 'PLEAS', 'PLEASE']
var puzzles = ['AELWXYZ', 'AELPXYZ', 'AELPSXY', 'SAELPXY', 'XAELPSY']


function rndWord(len = 10) {
  return rnd.randomChoiceArr(['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'], len);
}

let a = new Array(1000).fill(0).map(val => rndWord(5));
let b = new Array(1000).fill(0).map(val => rndWord(10));

console.time();
spellingBee2(a, b);
console.timeEnd();

console.time();
spellingBee3(a, b);
console.timeEnd();

console.time();
spellingBee(a, b);
console.timeEnd();



