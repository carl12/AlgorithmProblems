function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}


function factorialZeros(n) {
    numFiveFactors = 0;
    value = 0;
    while (n > 0) {
        numFiveFactors += value * (n % 5);
        n = Math.floor(n / 5);
        value = value * 5 + 1;
    }
    return numFiveFactors;
}

function factorialZeros2(n) {
    count = 0;
    for (factor = 5; n / factor >= 1; factor *= 5) {
        count += Math.floor(n / factor);
    }
    return count;
}


console.time()
for (var i = 1; i < 10000000; i++) {
    factorialZeros(i);
}
console.timeEnd();

console.time();
for (var i = 1; i < 10000000; i++) {
    factorialZeros2(i);
}
console.timeEnd();