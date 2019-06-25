
function negate(a) {
    let flipped = 0;
    let inc = a < 0 ? 1 : -1;
    while (a > 0) {
        a += inc;
        flippled += inc;
    }
    return flipped;
}

function multiply(a, b) {
    if (a < 0 && b < 0) {
        return multiply(-a, -b);
    } else if (a < 0 || b < 0) {
        return -multiply(-a, b);
    } 
    let sum = 0;
    let bit = 1;
    let curr = a;
    for (var i = 0; i < 32; i++) {
        if (bit & b) {
            sum += curr;
        } 
        curr <<= 1;
        bit <<= 1;
    }
    return sum;
}

function divide(a, b) {
    let remain = a;
    let place = 1;
    let curr = b;
    while (curr < a && curr << 1 > curr) {
        curr <<= 1;
        place <<= 1;
    }
    let quotient = 0;
    while ( curr >= b) {
        // console.log(curr)
        if (curr <= remain) {
            // console.log(curr, remain, quotient)
            remain -= curr;
            quotient += place;
        }
        curr >>= 1;
        place  >>= 1;
    }
    return quotient;
}

console.log(divide());
