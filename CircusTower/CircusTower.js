
function circusTower(people) {
  people.sort((a,b) => a[0] - b[0]); 
  let runs = buildRuns(people);
  return getLongestRunFrom(people, runs, 0, people.length - 1);

  function buildRuns(people) {
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
  }

  function getLongestRunFrom(people, runs, low, hi) {
    if (false) { // base case // TODO
      return people.slice(low, hi + 1);
    }

    // find location for split (start of second part)
    let split = findSplit(runs, low, hi);

    // recursively invoke functions on left and right
    let run1 = getLongestRunFrom(people, runs, low, split - 1);
    let run2 = getLongestRunFrom(people, runs, split, hi);

    // merge together pieces
    return mergeRuns(run1, run2)
  
  }

  function mergeRuns(run1, run2) {
    if (run1.length === 0) {
      return run2;
    } else if (run2.length === 0) {
      return run1;
    }
    let p1 = 0;
    let p2 = 0;
    let maxLen = run2.length;
    let p1Max = 0;
    let p2Max = 0; 
    while (p2 < run2.length) {
      let val = run2[p2];
      while (p1 < run1.length && run1[p1] < val) {
        p1 ++;
      }
      let resultingLength = p1 + run2.length - p2;
      if (resultingLength > maxLen) {
        maxLen = resultingLength;
        p1Max = p1;
        p2Max = p2;
      }
    }

    return run1.slice(0, p1Max,).concat(run2.slice(p2Max));
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
  
}


// console.log('hi');
// findSplit([[0, 10], [11, 12], [13, 25]], 0, 25);