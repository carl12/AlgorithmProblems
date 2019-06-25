
function minArraysDiffMisread(arr1, arr2) {
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

function minArraysDiff(arr1, arr2) {
    if (arr1.length === 0 || arr2.length === 0) {
        return null;
    }
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    let pos1 = 0;
    let pos2 = 0;
    let diff = Infinity;
    while (pos1 < arr1.length && pos2 < arr2.length) {
        diff = Math.min(Math.abs(arr1[pos1] - arr2[pos2], diff));
        if (pos2 + 1 < arr2.length || arr1[pos1 + 1] < arr2[pos2 + 1]) {
            pos1 ++;
        } else {
            pos2 ++;
        }
    }
    return diff;
}

function minArraysDiff2(arr1, arr2) {
    if (arr1.length === 0 || arr2.length === 0) {
        return null;
    }
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);

    let pos1 = 0;
    let pos2 = 0;
    let diff = Infinity;
    while (pos1 < arr1.length && pos2 < arr2.length) {
        diff = Math.min(Math.abs(arr1[pos1] - arr2[pos2], diff));
        if (arr1[pos1] < arr2[pos2]) {
            pos1 ++;
        } else {
            pos2 ++;
        }
    }
    return diff;
}

function minArraysDiff3(arr1, arr2) {
    // O(A log B) solution instead of O(A log A) 
    // (where b is the smaller of the arrays)
    
    // sort smaller of arrays
    // iterate through larger array
        // binary search for best pair

}
