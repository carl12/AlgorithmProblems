// How to use: 
// Set group1Str and group2Str as names split by newlines
// Copy paste old output into pairStr
// run file
// copy valid output into sheets (use split text into columns)
// enjoy! - for questions ask carl17r@gmail.com

let pairStr = `Amar Vadhia	Zach Thomas	Amar Vadhia	David Brooks	Amar Vadhia	Shane Zhao	Amar Vadhia	Jennie Zeng	Amar Vadhia	Yi Sun
Andrew Poon	Pri Pramanik	Andrew Poon	Yi Sun	Andrew Poon	Joe Berthoud	Andrew Poon	Zach Thomas	Andrew Poon	Kenny Lee
Brandon Yu	Yi Sun	Brandon Yu	Kenny Lee	Brandon Yu	Chris Chan	Brandon Yu	Joe Berthoud	Brandon Yu	Zach Thomas
Cassie Tong	Kenny Lee	Cassie Tong	Joe Berthoud	Cassie Tong	Poema Cavalcanti	Cassie Tong	Chris Chan	Cassie Tong	David Brooks
Chad Archila	Yunyun Liu	Chad Archila	Marvin Ho	Chad Archila	Janice Lam	Chad Archila	Pri Pramanik	Chad Archila	Joe Berthoud
Christian Sarmiento	Min Choo	Christian Sarmiento	Jennie Zeng	Christian Sarmiento	David Brooks	Christian Sarmiento	Tina Le	Christian Sarmiento	Poema Cavalcanti
Connie Lun	David Brooks	Dorris Wong	Zach Thomas	Connie Lun	Pri Pramanik	Connie Lun	Min Choo	Connie Lun	Marvin Ho
Dorris Wong	Jennie Zeng	Eline Xavier	Joel Kaplan	Dorris Wong	Yi Sun	Dorris Wong	Kenny Lee	Dorris Wong	William Zhou
Eline Xavier	Joe Berthoud	Esme Ling	Chris Chan	Eline Xavier	Tina Le	Eline Xavier	Poema Cavalcanti	Eline Xavier	Shane Zhao
Esme Ling	Joel Kaplan	Jackson Galan	Tina Le	Esme Ling	Jennie Zeng	Esme Ling	Yi Sun	Esme Ling	Janice Lam
Jackson Galan	William Zhou	Janelle Bautista	William Zhou	Jackson Galan	Kenny Lee	Jackson Galan	Shane Zhao	Jackson Galan	Chris Chan
Janelle Bautista	Poema Cavalcanti	Jonathan Hsieh	Min Choo	Janelle Bautista	Marvin Ho	Janelle Bautista	Joel Kaplan	Janelle Bautista	Min Choo
Jonathan Hsieh	Tina Le	Julio Fuentes	Janice Lam	Jonathan Hsieh	Joel Kaplan	Jonathan Hsieh	Janice Lam	Jonathan Hsieh	Yunyun Liu
Julio Fuentes	Chris Chan	Katherine Wang	Shane Zhao	Julio Fuentes	Min Choo	Julio Fuentes	William Zhou	Julio Fuentes	Tina Le
Katherine Wang	Janice Lam	Keaton Tatooles	Poema Cavalcanti	Katherine Wang	Zach Thomas	Katherine Wang	Marvin Ho	Katherine Wang	Pri Pramanik
Keaton Tatooles	Shane Zhao	Lee Graham	Pri Pramanik	Keaton Tatooles	Yunyun Liu	Keaton Tatooles	David Brooks	Keaton Tatooles	Jennie Zeng
Lee Graham	Marvin Ho	Maia Ling	Yunyun Liu	Lee Graham	William Zhou	Lee Graham	Yunyun Liu	Lee Graham	Joel Kaplan`

let group1Str = `Amar Vadhia
Andrew Poon
Brandon Yu
Cassie Tong
Chad Archila
Christian Sarmiento
Connie Lun
Dorris Wong
Eline Xavier
Esme Ling
Jackson Galan
Janelle Bautista
Jonathan Hsieh
Julio Fuentes
Katherine Wang
Keaton Tatooles
Lee Graham`;

let group2Str = `Zach Thomas
Pri Pramanik
Yi Sun
Kenny Lee
Yunyun Liu
Min Choo
David Brooks
Jennie Zeng
Joe Berthoud
Joel Kaplan
William Zhou
Poema Cavalcanti
Tina Le
Chris Chan
Janice Lam
Shane Zhao
Marvin Ho`;

function NamePairMaker(nameLists){
  let rows = nameLists.split('\n').map(row => row.split('\t'));
  let pairs = rows.map(row => row.reduce((pairs, val, i) => {
    if (i % 2 === 0) {
      pairs.push([val])
    } else {
      pairs[pairs.length - 1].push(val);
    }
    return pairs;
  }, []));
  return pairs.flat();
}

function shuffle(array) { 
  for (let i = array.length - 1; i > 0; i--) { 
    let j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}

function genOldPairSet(pairs, group1, group2) {
  let oldPairs = {};
  group1.forEach(name => oldPairs[name] = new Set());
  group2.forEach(name => oldPairs[name] = new Set());
  pairs.forEach(pair => {
    if (oldPairs[pair[0]] !== undefined) {
      oldPairs[pair[0]].add(pair[1]);
    } 
    if (oldPairs[pair[1]] !== undefined) {
      oldPairs[pair[1]].add(pair[0]);
    }
  });
  return oldPairs;
}

function removeForcedPairs(group1, group2, forcedPairs) {
  let group1Sl = group1.slice();
  let group2Sl = group2.slice();
  forcedPairs.forEach(pair => {
    group1Sl.splice(group1Sl.indexOf(pair[0]), 1);
    group2Sl.splice(group2Sl.indexOf(pair[1]), 1);
  });
  return [group1Sl, group2Sl];
}

function generateRandomPair(group2) {
  return shuffle(group2.slice());
}

function isValidPair(oldPairs, group1, testingGroup2) {
  valid = true;
  for (let i = 0; i < testingGroup2.length; i++) {
    if (oldPairs[testingGroup2[i]].has(group1[i])) {
      valid = false;
    } 
  }
  return valid;
}

function genOutputStr(group1, group2, forcedPairs = []) {
  let arr = group2.map((p2, i) => [group1[i], p2]);
  arr.push(...forcedPairs);
  arr.sort();
  let final = arr.map(pair => pair.join(',')).join('\n');
  return final;
}

function makeNewPair(pairs, group1, group2, forcedPairs = []) {
  oldPairs = genOldPairSet(pairs, group1, group2);
  let [group1Sl, group2Sl] = removeForcedPairs(group1, group2, forcedPairs);

  let valid = false;
  let tmp;
  let tries = 0;
  let maxTries = 1000;
  while (!valid && tries < maxTries) {
    console.log('generating random pair');
    tmp = generateRandomPair(group2Sl);
    valid = isValidPair(oldPairs, group1Sl, tmp)   
    tries ++;
  }
  if (tries >= maxTries) {
    console.log(`gave up after ${maxTries} tries`);
    return;
  }
  
  console.log(genOutputStr(group1Sl, tmp, forcedPairs))
  return ;
}

function makeNameList(rawNames) {
  return rawNames.split('\n');
}

let nameList1 = makeNameList(group1Str);
let nameList2 = makeNameList(group2Str);
let pairList = NamePairMaker(pairStr);
makeNewPair(pairList, nameList1, nameList2, []);




