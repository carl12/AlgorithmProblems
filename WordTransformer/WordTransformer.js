let _ = require('underscore');

class GraphNode {
  constructor(val) {
    this.val = val;
    this.neighbors = new Set();
    this.distance = null;
  }

  addNeighbor(otherNode) {
    this.neighbors.add(otherNode);
    otherNode.neighbors.add(this);
  }

  neighArr() {
    return Array.from(this.neighbors);
  }

}
function getChars() {
  let chars = [];
  for (let i = 65; i <= 90; i++) {
    chars.push(String.fromCharCode(i));
  }

  for (let i = 97; i <= 122; i++) {
    chars.push(String.fromCharCode(i));
  }

  return chars;
}

let chars = getChars();

function WordTransformer(dictionary, start, end) {
  let endNode = buildGraph(dictionary, start);
  if (!endNode) {
    return null;
  }
  endNode.distance = 0;
  let queue = [endNode];
  while (queue.length) {
    let currNode = queue.shift();

  }
}


function buildGraph(dictionary, start, end) {
  let chars = getChars();
  let enqueuedSet = new Set();
  let startNode = new GraphNode(start);
  let stringQueue = [startNode];
  let stringToNode = {[start]: startNode};
  enqueuedSet.add(startNode);

  while (stringQueue.length) {
    let currNode = stringQueue.shift();
    let a = currNode.val;
    for (let i = 0; i < a.length; i++) {
      for (let possibleChar of chars) {
        let newWord = a.slice(0, i) + possibleChar + a.slice(i + 1);
        if (newWord === a) {
          continue;
        }
        if (dictionary.has(newWord)) {
          if (newWord === 'aaa') {
            console.log(stringToNode[newWord]);
          }
          let otherNode = stringToNode[newWord] || new GraphNode(newWord);
          stringToNode[newWord] = otherNode;
          currNode.addNeighbor(otherNode);
          if (!enqueuedSet.has(otherNode)) {
            stringQueue.push(otherNode);
            enqueuedSet.add(otherNode);
          }
        }
      }
    }
  }
  return stringToNode[end];
}

function genPossible(word) {
  let combos = [];
  for (let i = 0; i < word.length; i++) {
    for (let char of chars) {
      let newWord = word.slice(0, i) + char + word.slice(i + 1);
      if (newWord !== word) {
        combos.push(newWord);
      }
    }
  }
  return combos;
}

function WordTransformer2(dictionary, start, end) {
  let queue = [[start, 0]];
  let enqueued = new Set([start]);
  while (queue.length) {
    // console.log('--------');
    // console.log('--------');
    // console.log('--------');
    let [currWord, depth] = queue.shift();
    // console.log('curr word', currWord);
    let combos = genPossible(currWord);
    for (let possibleWord of combos) {
      if (possibleWord === end) {
        // console.log('done', depth + 1);
        return depth + 1;
      } else if (dictionary.has(possibleWord) && !enqueued.has(possibleWord)) {
        console.log('enqueing', possibleWord);
        queue.push([possibleWord, depth + 1]);
        enqueued.add(possibleWord);
      }
    }
  }
  return null;
}

// var a = buildGraph(new Set(['aaa', 'baa', 'bba']), 'aaa');
var aasdf = WordTransformer2(new Set(['aaa', 'baa', 'bba']), 'aaa', 'bba');
console.log(aasdf);

// rabbit hole of building graph
// think through entire problem before starting sub-part
// stop if found lost cause
