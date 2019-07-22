
function Masseuse(times){
  let twoAgo = 0;
  let oneAgo = 0;
  for (let time of times) {
    let curr = Math.max(time + twoAgo, oneAgo);
    twoAgo = oneAgo;
    oneAgo = curr;
  }
  return oneAgo;
}

console.log(Masseuse([30, 15, 60, 75, 45, 15, 15, 45]));
