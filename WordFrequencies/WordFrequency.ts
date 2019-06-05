/*
Design a method to find the frequency of occurrences of any given word 
in a book. What if we were running this algorithm multiple times?

Key Takeaway: don't get fixated on a data structure. Prefix 
trees are often unnessessary if you want to look at an entire
word. Just use a hash map for lookup (assuming not many words).

On another note, try to find a solution that doesn't require
you to implement a datastructure. 

*/



function WordFrequencies(words: string[], text: string): Number[] {
  const count = {};
  const myTrie = new Trie(words);
  for (let word of words) {
    count[word] = 0;
  }
  let curr: (TrieNode | null);
  for(let char of text) {
    console.log(char)
    if (char === ' ') {
      if (curr && curr.finishedWord) {
        count[curr.finishedWord] += 1;
        console.log('found: ', curr.finishedWord);
      }
      curr = myTrie.root;
      continue;
    } 
    if (!curr) {
      continue;
    }
    curr = curr.children[char] || null;
  }

  if (curr && curr.finishedWord) {
    count[curr.finishedWord] += 1;
    console.log('found: ', curr.finishedWord);
  }

  const res: Number[] = [];
  for (let word of words) {
    res.push(count[word]);
  }
  return res;
}

interface TrieNode {
  finishedWord: (string | null),
  children: {[key: string]: TrieNode}
}

class Trie {
  root: TrieNode;
  constructor(words: string[]) {
    this.root = this.makeNode();
    for (let word of words) {
      let curr = this.root;
      for (let char of word) {
        if (!curr.children[char]) {
          curr.children[char] = this.makeNode();
        }
        curr = curr.children[char];
      }
      curr.finishedWord = word;
    }
  }



  makeNode(finishedWord = null): TrieNode {

    return {finishedWord: null, children: {}};
  }
}

function WordFrequencies2(words: string[], text: string): Number[] {
  let textWords = text.split(' ');
  let count = {};
  for (let word of words) {
    count[word] = 0;
  }

  for (let textWord of textWords) {
    if (count[textWord] !== undefined) {
      count[textWord] ++;
    }
  } 

  const res: Number[] = [];
  for (let word of words) {
    res.push(count[word]);
  }
  console.log(count)
  return res;
}
// console.log(a.root.children.a.children.s.children.d.children.f);

WordFrequencies2(['asdf', 'a', 'b', 'sdf'], 'asdf a b asdf asd sdf c d e asdf asdf a');
