const SegmentIntersect = (xa1, ya1, xa2, ya2, xb1, yb1, xb2, yb2) => {
    sameXa = xa2 === xa1;
    sameXb = xb2 === xb1;
    if (sameXa && sameXb) {
        return parallelOverlap(xa1, ya1, xa2, ya2, xb1, yb1, xb2, yb2); 
    } else if (sameXa || sameXb) {
        // incomplete edge case
    }


    const sa = (ya2 - ya1)/(xa2 - xa1);
    const sb = (yb2 - yb1)/(xb2 - xb1);
    const interceptA = ya1 - (xa1 * sa);
    const interceptB = yb1 - (xb1 * sb);

    const aFn = (x) => sa * (x - xa1) + ya1;
    let res1 = aFn(xb1);
    let res2 = aFn(xb2);

    if (!(res1 === yb1 || res2 === yb2) && !(res1 > yb1 !== res2 > yb2)) {
        return false;
    }

    if (res1 === yb1 && res2 === yb2) {
        return parallelOverlap(xa1, ya1, xa2, ya2, xb1, yb1, xb2, yb2);
    }
    const xIntersect = (-(sa/sb) * xa1 + (ya1/sb) + xb1 - (yb1/sb))/(1- sa/sb);
    const yIntersect = aFn(xIntersect);
    return (
        containedIn(xIntersect, yIntersect, xa1, ya1, xa2, ya2) 
        && containedIn(xIntersect, yIntersect, xb1, yb1, xb2, yb2) 
    );
}

const containedIn = (x, y, x1, y1, x2, y2) => {
    return (
        x >= Math.min(x1, x2) 
        && x <= Math.max(x1, x2)
        && y >= Math.min(y1, y2)
        && y <= Math.max(y1, y2)
    )
}

const parallelOverlap = (xa1, ya1, xa2, ya2, xb1, yb1, xb2, yb2) => {
    return (
        containedIn(xa1, ya1, xb1, yb1, xb2, yb2)
        || containedIn(xa2, ya2, xb1, yb1, xb2, yb2)
        || containedIn(xb1, yb1, xa1, ya1, xa2, ya2)
        || containedIn(xb2, yb2, xa1, ya1, xa2, ya2)
    )
}


console.log(SegmentIntersect(2,1,1,2,1,1,2,2));