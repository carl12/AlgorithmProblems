
function RangeUnion(A, B) {
    if (A.length < 2) {
        return A.length;
    }
    let pairs = A.map((_, i) => [A[i], B[i]]);
    pairs.sort((a, b) => a[0] - b[0]);
    let res = [];
    let currHi = pairs[0][1];
    let currLo = pairs[0][0];
    let currPair;
    for (let i = 1; i < pairs.length; i++) {
        currPair = pairs[i];
        if (currPair[0] < currHi) {
            currHi = Math.max(currHi, currPair[1]);
            continue;
        }
        res.push([currLo, currHi]);
        currLo = currPair[0];
        currHi = currPair[1];
    }
    res.push([currLo, currHi]);
    console.log(res);
    return res.length;
}

A=[0,1,5]
B=[2,3,7]

console.log(RangeUnion(A, B));