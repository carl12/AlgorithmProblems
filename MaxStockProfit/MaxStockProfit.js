/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = (prices) => {
  if (prices.length < 2) {
    return null;
  }
  let lowestSoFar = prices[0];
  let bestProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] <= lowestSoFar) {
      lowestSoFar = prices[i];
    } else {
      bestProfit = Math.max(prices[i] - lowestSoFar, bestProfit);
    }
  }
  console.log(bestProfit);
  return bestProfit;
};
