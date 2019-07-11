
function circusTower(people) {
  people.sort((a,b) => a[0] - b[0]); 
  let runs = [];
  let runStart = 0;
  for (let i = 1; i < people.length; i++) {
    if (people[i] > people[i - 1]) {
      continue;
    } else {
      runs.push([runStart, i - 1]);
      runStart = i;
    }
  }
  runs.push([runStart, people.length - 1]);



  return getLongestRunFrom(people, runs, 0, people.length - 1);

  function getLongestRunFrom(people, runs, low, hi) {
    // if () { // base case
    //   return people.slice(low, high + 1);
    // }
    // find location for split
    let split = findSplit(runs, low, hi);
    // recursively invoke functions on left and right
    // merge together pieces

  
  }

  
}

function findSplit(runs, low, hi) {
  let i = 0; 
  let l = 0;
  while (i < runs.length - 1 && l < (hi + low) / 2) {
    l += runs[i][1] - runs[i][0] + 1;
    i ++;
  }
  console.log(i, runs[i][0]);
  return runs[i][0];
}

console.log('hi');
findSplit([[0, 10], [11, 12], [13, 25]], 0, 25);