function largestSum(arr) {
    let max = arr[0];
    let curr = max;
    arr.forEach(val => {
        curr += val;
        if (curr > max) { max = curr; }
        if (curr < 0) { curr = 0 }
    });
    console.log(max);
    return max;
}

largestSum([2, -8, 3, -2, 4, -10]);