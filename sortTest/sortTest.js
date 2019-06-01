function countCompares(len, ordered = true, obj = false, batch = true){
  let a = [];
  let dataMaker = ordered ? (i) => i : () => Math.random();
  let entryMaker = obj ? (i) => ({key: dataMaker(i)}) : (i) => dataMaker(i);
  let get = obj ? (a) => a.key : (a) => a;  
  for (var i = 0; i < len; i++) {
    a.push(entryMaker(i));
  }
  count  = 0;
  a.sort((a,b) => {count++; !batch && console.log(get(a), get(a)); return get(a) - get(b)});
  console.log(len, count, ordered);
  console.log(count/len);
  console.log('-----');
  ordered && console.log();
  return count;
}

function countSequence() {
  let a = [11];
  console.time();
  for (var num of a) {
    // countCompares(num, false, true, false);
    countCompares(num, true, true, false);
  }
  console.timeEnd();
}

countSequence();
