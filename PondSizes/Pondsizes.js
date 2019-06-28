
function pondSizes(plot) {
    let ponds = [];
    let visited = new Set();
    for (let i = 0; i < plot.length; i++) {
        for (let j = 0; j < plot[i].length; j++) {
            let size = getLakeSizeAt(i,j);
            if (size > 0) {
                ponds.push(size);
            }
        }
    }

    return ponds;

    function isUnvisitedLake(i, j) {
        if (i >= plot.length || i < 0) { return false; }
        
        // not nessesary in js, but good to check bounds
        if (j >= plot.length || j < 0) { return false; } 
        return plot[i][j] === 0 && !visited.has([i,j].toString());
    }

    function getLakeSizeAt(i, j) {
        if (!isUnvisitedLake(i,j)) {
            return 0;
        }
        visited.add([i,j].toString());
        return 1 
            + getLakeSizeAt(i + 1, j)
            + getLakeSizeAt(i, j + 1)
            + getLakeSizeAt(i - 1, j)
            + getLakeSizeAt(i, j + 1)
            + getLakeSizeAt(i + 1, j + 1)
            + getLakeSizeAt(i - 1, j + 1)
            + getLakeSizeAt(i + 1, j - 1)
            + getLakeSizeAt(i - 1, j - 1);

    }
}

let mat = [
    [0,2,1,0],
    [0,1,0,1],
    [1,1,0,1],
    [0,1,0,1],
];

console.log(pondSizes(mat));