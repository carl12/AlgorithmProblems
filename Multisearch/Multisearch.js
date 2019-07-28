
function Multisearch(a, b) {
  let prefixTree = buildTrie(b);
  let map = b.reduce((obj, word) => {
    obj[word] = [];
    return obj;
  }, {});
  for (let i = 0; i < a.length; i++) {
    addMatchesFrom(str, map, trie, i);
  }
  return map;

  function addMatchesFrom(str, obj, trie, i) {
    let curr = trie;
    let word = ''
    for (; i < str.length && curr; i++) {
      word += str[i];
      curr = trie.childred[str[i]];
      if (curr.isEnd) {
        obj[word].push(i)
      }
    }
  }
}

