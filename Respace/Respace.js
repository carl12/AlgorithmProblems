
class TrieNode {
  constructor(char, isEnd = false) {
    this.char = char;
    this.children = {};
    this.isEnd = isEnd;
  }

  addChild(char, isEnd = false) {
    if (this.children[char]) {
      this.children[char].isEnd = this.children[char].isEnd || isEnd
    } else {
      this.children[char] = new TrieNode(char, isEnd);
    }
    return this.children[char];
  }

  makeFinal() {
    this.isEnd = true;
  }
}

function Respace(text, words) {
  let trie = buildTrie(words);
  return findBestFrom(text, trie, 0);

  function findBestFrom(text, trie, loc) {
    let i = loc;
    let curr = trie;
    let posibilities = [];
    while (i < text.length) {
      curr = curr.children[text[i]];
      if (!curr) {
        posibilities.push(1 + findBestFrom(text, trie, loc + 1));
        return Math.min(...posibilities);
      }
      if (curr.isEnd) {
        posibilities.push(findBestFrom(text, trie, i + 1));
      }
      i++;
    }
    posibilities.push(text.length - loc);
    return Math.min(...posibilities);
  }

  function buildTrie(words) {
    let trie = new TrieNode(null);
    for (let word of words) {
      let curr = trie;
      for (let char of word) {
        curr = curr.addChild(char);
      }
      curr.makeFinal();
    }
    return trie;
  }
}

function RespaceCache(text, words) {
  console.time();
  let trie = buildTrie(words);
  console.timeEnd();
  let entries = new Array(text.length);
  let cache = 0;
  console.time();
  let res = findBestFrom(text, trie, 0);
  console.timeEnd();
  return res;

  function findBestFrom(text, trie, loc) {
    if (entries[loc] !== undefined) {
      cache++;
      return entries[loc];
    }
    let i = loc;
    let curr = trie;
    let posibilities = [];
    while (i < text.length) {
      curr = curr.children[text[i]];
      if (!curr) {
        posibilities.push(1 + findBestFrom(text, trie, loc + 1));
        entries[loc] = Math.min(...posibilities);
        return Math.min(...posibilities);
      }
      if (curr.isEnd) {
        let res = findBestFrom(text, trie, i + 1);
        if (res === 0) {
          return 0;
        }
        posibilities.push(res);
      }
      i++;
    }
    posibilities.push(text.length - loc);

    entries[loc] = Math.min(...posibilities);
    return Math.min(...posibilities);
  }

  function buildTrie(words) {
    let trie = new TrieNode(null);
    for (let word of words) {
      let curr = trie;
      for (let char of word) {
        curr = curr.addChild(char);
      }
      curr.makeFinal();
    }
    return trie;
  }
}
function RespaceSet(text, words) {
  console.time();
  let set = new Set(words);
  let longestWord = Math.max(...words.map(word => word.length));
  console.timeEnd();
  let cache = new Array(text.length);
  console.time();
  let res = getBestFrom(text, set, 0);
  console.timeEnd();
  
  return getBestFrom(text, set, 0);

  function getBestFrom(text, set, loc) {
    if (cache[loc] !== undefined) {
      return cache[loc];
    }
    if (loc >= text.length) {
      cache[loc] = 0;
      return 0;
    }
    let best = Infinity;
    let l = 0;
    for (let i = loc; i < text.length && l < longestWord; i++) {
      if (set.has(text.slice(loc, i + 1))) {
        let res = getBestFrom(text, set, i + 1);
        if (res === 0) {
          cache[loc] = 0;
          return 0;
        }
        best = Math.min(res, best);
      }
      l++;
    }
    best = Math.min(1 + getBestFrom(text, set, loc + 1), best);
    cache[loc] = best;
    return best;
  }
}

let words = [];
for (let i = 0; i < 100000; i++) {
  words.push(i.toString());
}

let text = [];
for (let i = 0; i < 5000; i++) {
  text.push(Math.floor(Math.random() * 10));
}
text.push('a');
text = text.join('');
console.log(text);
// console.log('starting');
// console.time();
// console.timeEnd();
// console.time();
// console.timeEnd();

console.log(RespaceCache(text, words));
console.log(RespaceSet(text, words));
// memoize
// shot circuit on zero solution
// maintain min rather than arr
// use for loop rather than while
// Trie vs set


