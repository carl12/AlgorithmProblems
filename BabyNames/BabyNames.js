
function babyNames(names, equivalents){
  let nameToCount = {};
  let output = [];

  setUpHashMap(equivalents, nameToCount);
  addNamesToMap(names, nameToCount);

  return output;

  function setUpHashMap(equivalents, nameToCount) {
    for (let pairs of equivalents) {
      let n1 = pairs[0];
      let n2 = pairs[1];
      if (nameToCount[n1]) {
        nameToCount[n2] = nameToCount[n1];
      } else if (nameToCount[n2]) {
        nameToCount[n1] = nameToCount[n2];
      } else {
        nameToCount[n1] = {name: n1, frequency: 0};
        output.push(nameToCount[n1]);
        nameToCount[n2] = nameToCount[n1];
      }
    }
  }

  function addNamesToMap(names, nameToCount) {
    for (let entry of names) {
      if (!nameToCount[entry.name]) {
        nameToCount[entry.name] = {name: entry.name, frequency: 0};
        output.push(nameToCount[entry.name]);
      }
      nameToCount[entry.name].frequency += entry.frequency;
    }
  }
}

function m(name, frequency) {
  return {name, frequency};
}


// babyNames([
//   m('joe', 4), 
//   m('bob', 10), 
//   m('cindy', 20), 
//   m('frank', 10), 
//   m('steve', 10),
//   m('al', 11),
//   m('fred', 12),

// ], [
//   ['joe', 'bob'], 
//   ['frank', 'bob'],
//   // ['steve', 'joe'],
//   ['bob', 'al'],
//   ['steve', 'fred'],
// ]);