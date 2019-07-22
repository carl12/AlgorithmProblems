
function Multisearch(a, b){
  let map = {};
  b.forEach(val => map[val] = []);
  let loc = 0;
  for (let word of a.split(' ')) {
    if (map[word]) {
      map[word].push(loc);
    }
    loc += word.length + 1;
  }
  return map;
}

console.log(Multisearch('the cat sat on the mat and said the mat', ['the', 'sat', 'cat']));
