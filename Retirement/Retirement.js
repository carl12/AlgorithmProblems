
function Retirement(age, interest, savings, spending) {
  total = 0;
  for (let year = 24; year < age; year ++) {
    total *= 1 + interest;
    total += savings;
  }
  console.log(`Savings at ${age}: ${Math.round(total)}`);
  for (let year2 = age; year2 < 67; year2 ++) {
    total -= spending;
    total *= 1 + interest;
    console.log(`Total: ${Math.round(total)} at ${year2}`);
  }
}

Retirement(35, 0.05, 80000, 60000);