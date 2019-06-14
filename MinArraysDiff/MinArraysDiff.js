
function minArraysDiff(arr1, arr2) {
    arr1.sort((a,b) => a - b);
    arr2.sort((a,b) => a - b);

    let pos1 = 0;
    let pos2 = 0;
    let diff = Infinity;
    while (pos1 < arr1.length) {
        if (arr1[pos1] < arr2[pos2]) {
            pos1 ++;
        } else if (arr2[pos2 + 1] && arr2[pos2 + 1] < arr1[pos1]) {
            pos2 ++;
        } else {
            diff = Math.min(arr1[pos1] - arr2[pos2], diff);
            pos1 ++;
        } 
    }
    
    return diff !== Infinity ? diff : null;
}


minArraysDiff([1,3,11,15,2], [23,127,235,19,8]);
minArraysDiff([1,3,11,15,2], [23,127,235,19,4]);
minArraysDiff([1,3,11,15,2], [23,127,235,19,8]);
