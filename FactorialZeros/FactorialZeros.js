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

function printZero(n) {
    console.log(factorialZeros(n), n);
}

for (var i = 1; i <= 125; i++) {
    printZero(i);
}