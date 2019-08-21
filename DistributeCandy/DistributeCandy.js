
function DistributeCandy(candies, numPeople) {
  let lastCandies = candies;
  let oneToNumSum = (numPeople * (numPeople + 1)) / 2;
  let base = 0;
  let row = -1;
  while (candies > 0) {
      console.log(candies, oneToNumSum);
      lastCandies = candies;
      candies -= oneToNumSum + base * base;

      base += numPeople;
      row ++;
  }
  let lastRow = [];
  let currCandy = (base - numPeople) + 1;
  let lastRowCandiesLeft = lastCandies;
  while (lastRow.length < numPeople) {
    lastRow.push(Math.min(currCandy, lastRowCandiesLeft));
    lastRowCandiesLeft -= Math.min(currCandy, lastRowCandiesLeft);
    currCandy ++;
  }
  console.log(lastRow);
  return lastRow;
}

DistributeCandy(40, 7);