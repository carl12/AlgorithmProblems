
function babyNames(names, equivalents){
  let nameToCount = {};
  let output = [];

  setUpHashMap(equivalents, nameToCount);
  addNamesToMap(names, nameToCount);
  console.log(output);
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

function babyNamesCorrect(names, equivalents) {
  let nameToNode = {};
  let nameFreqs = [];
  
  for (let entry of names) {
    nameToNode[entry.name] = new Node(entry);
  }

  for (let pair of equivalents) {
    nameToNode[pair[0]].addConnectionTo(nameToNode[pair[1]]);
  }

  for (let entry of names) {
    let node = nameToNode[entry.name];
    if (node.visited) {
      continue;
    }
    nameFreqs.push({name: node.name, frequency: getSum(node)});
  }
  console.log(nameFreqs);
  return nameFreqs;

  function Node({ name, frequency }) {
    this.name = name;
    this.frequency = frequency;
    this.visited = false;
    this.neighbors = [];

    this.addConnectionTo = function(otherNode) {
      this.neighbors.push(otherNode);
      otherNode.neighbors.push(this);
    }
  }

  function getSum(node) {
    if (node.visited) {
      return 0;
    }
    node.visited = true;
    let sum = node.frequency;
    node.neighbors.forEach(neighbor => sum += getSum(neighbor));
    return sum;
  }
}


babyNamesCorrect([
  m('joe', 4), 
  m('bob', 10), 
  m('cindy', 20), 
  m('frank', 10), 
  m('steve', 10),
  m('al', 11),
  m('fred', 12),

], [
  ['joe', 'bob'],
  ['cindy', 'frank'],
  ['joe', 'cindy'],
]);