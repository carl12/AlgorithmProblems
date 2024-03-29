const fs = require('fs');
// Filter out words which end in S. Wordl filters out plurals and past tense `ed` words
const words = fs.readFileSync('./wordle/5words.txt')
  .toString().split(',')
  .filter(word => !word.endsWith('s'));
const wordsSet = new Set(words);
class WordleGame {
  constructor() {
    this.myWord = 'kinky'; // chooseRandom();
    // console.log(this.myWord);
  }

  checkAnswer(ans) {
    if (!wordsSet.has(ans)) { return null; }

    return Array.from(ans).map((c, i) => {
      if (c === this.myWord[i]) {
        return 2;
      } else if (this.myWord.includes(c)) {
        return 1;
      }
      return 0;
    });
  }
}

class WordleGuesser {
  constructor(game, strat = 0) {
    this.strat = strat;
    this.possible = new Set(words);
    this.gueses = [];
    this.game = game;
    this.hasWon = false;
  }

  makeGuess(word = null) {
    if (this.hasWon) {
      return;
    }

    const guess = word == null ? this.getStratGuess() : word;
    console.log(guess);
    const res = this.game.checkAnswer(guess);
    this.handleResult(guess, res);
    console.log(`Guessed ${guess} and result was ${res}`);

  }

  getStratGuess() {
    if (this.strat === 0) {
      return this.getValidGuess();
    } else if (this.strat === 1) {
      return this.getRandomGuess();
    } else {
      return this.getCommonLetterGuess();
    }
  }

  getValidGuess() {
    return Array.from(this.possible)[0];
  }

  getRandomGuess() {
    const arr = Array.from(this.possible);
    // console.log(arr.length, ' is length');
    return arr[Math.floor(Math.random() * arr.length)];
  }

  getCommonLetterGuess() {
    const arr = Array.from(this.possible);
    const charCounts = new Map();
    for (let word of arr) {
      for(let char of word) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
      }
    }
    const counts = Array.from(charCounts).sort((a, b) => b[1] - a[1]);
    // console.log(counts);
    return this.getRandomGuess();
  }

  handleResult(guess, result, debug = false) {
    const invalidChars = guess.split('').filter((_, i) => result[i] === 0).filter(c => !findAll(guess, c).some(i => result[i] === 2));
    const presentChars = guess.split('').filter((_, i) => result[i] === 1 || result[i] == 2);
    const correctChars = guess.split('').map((c, i) => result[i] === 2 ? [c, i] : null).filter(a => a != null);
    // console.log(Array.from(this.possible).slice(0, 10));

    const posArr = Array.from(this.possible).filter(word => {
      if (result.map((val, i) => [guess[i], val, i]).filter(entry => entry[1] === 1).some(([c, val, loc]) => word[loc] === c)) {
        if (debug) { console.log('asdf'); }
        return false;
      } else if (invalidChars.some(c => word.includes(c))) {
        if (debug) { console.log('asdf1'); console.log('invalid chars are ', invalidChars); console.log(result);
        console.log(guess.split(''));
        console.log(guess.split('').filter((_, i) => result[i] === 0));
      }
        return false;
      } else if (!presentChars.every(c => word.includes(c))) {
        if (debug) { console.log('asdf2'); }
        return false;
      } else if (!correctChars.every(([c1, loc]) => Array.from(word).map((c2, i) => c2 === c1 ? i : -1).includes(loc))) {
        if (debug) { console.log('asdf3'); }
        return false;
      }
      return true;
    });
    this.possible = new Set(posArr);
    console.log(`Possible after ${guess} is [${posArr.slice(0, 10)}${posArr.length > 10 ? ',...' : '' }] with length ${posArr.length}`);
    this.gueses.push([guess, result]);
    this.hasWon = result.every(a => a === 2);
  }
}

function findAll(str, val) {
  return Array.from(str).map((c, i) => [c,i]).filter(([el]) => el === val).map(([_, i]) => i);
}

function chooseRandom() {
  return words[Math.floor(Math.random() * words.length)];
}

function getLetterCounts(possible) {
  const letters = new Map();
  Array.from(possible)
    .forEach(word => Array.from(word)
      .forEach((c, i) => letters.set(c, (letters.get(c) || 0) + 1)));
  return letters;
}

function getGuessFreqScores(words, letters, numPossible) {
  let scores = words.map(word =>{
    const used = new Set();
    const myScore = Array.from(word).reduce((sum, c) => {
      if (used.has(c)) {
        return sum;
      } else {
        used.add(c);
        return convertCountToScore(letters.get(c), numPossible) + sum;
      }
    }, 0);
    return  [word, myScore];
  }).sort((a,b) => b[1] - a[1]);
  scores = scores.map(val => [val[0], val[1]])
  return scores;
}

function convertCountToScore(val, max) {
  if (val == null) {
    return 0;
  }
  if (val < max / 2) {
    return val;
  } else if (val < max) {
    return max - val;
  } else {
    // console.log('weird', val, max);
    return 0;
  }
}

const a = new WordleGame();
const guesser = new WordleGuesser(a, 2);
guesser.handleResult('orate', [0,0,1,1,0]);
guesser.handleResult('finch', [0,0,1,0,0]);
guesser.handleResult('gutsy', [0,0,1,0,2]);
// guesser.handleResult('spiky', [2,0,2,1,0]);
// guesser.handleResult('skill', [2,2,2,0,0]);

const letters = getLetterCounts(guesser.possible);
const scores = getGuessFreqScores(words, letters, guesser.possible.size);
console.log();
console.log(`Unfiltered letter counts out of total ${guesser.possible.size} possible words: `)
console.log(Array.from(letters).sort((a,b) => b[1] - a[1]));
// letters.set('y', 0);
// letters.set('u', 0);

if (guesser.possible.size > 3) {
  console.log();
  console.log('High scoring words for remaining letters are: ')
  console.log(scores.slice(0,10));
  console.log();
  console.log('Potential valid guesses');
  console.log(guesser.getRandomGuess());
  console.log(guesser.getRandomGuess());
  console.log(guesser.getRandomGuess());
  console.log(guesser.getRandomGuess());
  console.log(guesser.getRandomGuess());
  console.log(guesser.getRandomGuess());
  console.log(guesser.getRandomGuess());
  
  console.log(guesser.gueses);
} else {
  console.log();
  if (guesser.possible.size == 1) {
    console.log('We found it!');
  }
  console.log('Possible words:');
  console.log(Array.from(guesser.possible));
}
