let hash = null;
function wordDistance(text, w1, w2){
  if (hash === null) {
    hash = getHash(text);
  }
  
  return getDist(hash, w1, w2);

  function getHash(text) {
    let hash = {};
    for (let [index, word] of text.split(' ').entries()) {
      if (!hash[word]) {
        hash[word] = [];
      }
      hash[word].push([index]);
    }
    return hash;
  }

  function getDist(hash, w1, w2) {
    let same = w1 === w2;
    dist = Infinity;
    let l1 = hash[w1];
    let l2 = hash[w2];
    if (!l1 || !l2) {
      return -1;
    }

    let i1 = 0;
    let i2 = 0;

    while (i1 < l1.length && i2 < l2.length) {
      if (same && i1 === i2) {
        i1 ++;
        continue;
      }
      dist = Math.min(dist, Math.abs(l1[i1] - l2[i2]) - 1);
      if (l1[i1] < l2[i2]) {
        i1 ++;
      } else {
        i2 ++;
      }
    }
    return dist === Infinity ? -1 : dist;
  }


}


console.log(wordDistance('a b c d a b d c a', 'd', 'd'));