function countCompares(len, ordered = true){
  let a = [];
  if (ordered) {
    for (var i = 0; i < len; i++) {
      a.push(i);
    }
  } else {
    for (var i = 0; i < len; i++) {
      a.push(Math.random());
    }
  }
  count  = 0;
  a.sort((a,b) => {count++; return a - b});
  console.log(len, count, ordered);
  console.log(count/len);
  console.log('-----');
  ordered && console.log();
  return count;
}

function countSequence() {
  let a = [10,11,20,40,60,80,100,1000,10000,100000,1000000];
  console.time();
  for (var num of a) {
    countCompares(num, false);
    countCompares(num, true);
  }
  console.timeEnd();
}

countSequence();
