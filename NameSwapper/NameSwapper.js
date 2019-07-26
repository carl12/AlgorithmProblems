// input: string of name list copied from sheets
// ouput: unique pair

let rawPairs = `Amar Vadhia	Zach Thomas	Amar Vadhia	David Brooks	Amar Vadhia	Tina Le
Andrew Poon	Pri Pramanik	Andrew Poon	Yi Sun	Andrew Poon	Marvin Ho
Brandon Yu	Yi Sun	Brandon Yu	Kenny Lee	Brandon Yu	Pri Pramanik
Cassie Tong	Kenny Lee	Cassie Tong	Joe Berthoud	Cassie Tong	Min Choo
Chad Archila	Yunyun Liu	Chad Archila	Marvin Ho	Chad Archila	Chris Chan
Christian Sarmiento	Min Choo	Christian Sarmiento	Jennie Zeng	Christian Sarmiento	Janice Lam
Connie Lun	David Brooks	Dorris Wong	Zach Thomas	Connie Lun	Joe Berthoud
Dorris Wong	Jennie Zeng	Eline Xavier	Joel Kaplan	Dorris Wong	Shane Zhao
Eline Xavier	Joe Berthoud	Esme Ling	Chris Chan	Eline Xavier	Yi Sun
Esme Ling	Joel Kaplan	Jackson Galan	Tina Le	Esme Ling	David Brooks
Jackson Galan	William Zhou	Janelle Bautista	William Zhou	Jackson Galan	Poema Cavalcanti
Janelle Bautista	Poema Cavalcanti	Jonathan Hsieh	Min Choo	Janelle Bautista	Zach Thomas
Jonathan Hsieh	Tina Le	Julio Fuentes	Janice Lam	Jonathan Hsieh	Joel Kaplan
Julio Fuentes	Chris Chan	Katherine Wang	Shane Zhao	Julio Fuentes	Kenny Lee
Katherine Wang	Janice Lam	Keaton Tatooles	Poema Cavalcanti	Katherine Wang	Yunyun Liu
Keaton Tatooles	Shane Zhao	Lee Graham	Pri Pramanik	Keaton Tatooles	William Zhou
Lee Graham	Marvin Ho	Maia Ling	Yunyun Liu	Lee Graham	Jennie Zeng`

let rawNames1 = `Amar Vadhia
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

let rawNames2 = `Zach Thomas
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

function makeNewPair(pairs, group1, group2) {
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
  console.log(group1, group2);
  console.log(oldPairs);
  let valid = false;
  let tmp;
  while (!valid) {
    console.log('generating random pair');
    tmp = shuffle(group2.slice());
    valid = true;
    for (let i = 0; i < tmp.length; i++) {
      if (oldPairs[tmp[i]].has(group1[i])) {
        valid = false;
        // console.log('found invalid', tmp[i], group1[i]);
      }
    }
    
  }
  console.log('found valid pair');
  let arr = tmp.map((p2, i) => [group1[i], p2]);
  let final = arr.map(pair => pair.join(',')).join('\n');
  console.log(final);
  return final;
}

function makeNameList(rawNames) {
  return rawNames.split('\n');
}

let nameList1 = makeNameList(rawNames1);
let nameList2 = makeNameList(rawNames2);
let pairList = NamePairMaker(rawPairs);
makeNewPair(pairList, nameList1, nameList2);




