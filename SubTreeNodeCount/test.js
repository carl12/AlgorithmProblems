function countSubTrees(n, edges, labels) {
    let tree = makeTree(edges);
    return labels.split('').map((char, i) => searchSubTree(tree, labels, i, char));
};

function searchSubTree(tree, labels, startNode, label) {
    let count = 0;
    if (labels[startNode] === label) {
        count ++;
    }
    
    // loop over children and increment
    let children = tree[startNode];
    for (let child of children) {
        count += searchSubTree(tree, labels, child, label);
    }
    return count;   
}

function makeTree(edges) {
    let edgeMap = {};
    edges.forEach(edge => {
        edgeMap[edge[0]] = [...(edgeMap[edge[0]] || []), edge[1]];
        edgeMap[edge[1]] = [...(edgeMap[edge[1]] || []), edge[0]];
    });
    
    return removeParentEdges(edgeMap, 0);
}

function removeParentEdges(edgeMap, parent) {
    edgeMap[parent].forEach(child => {
        edgeMap[child] = edgeMap[child].filter(el => el !== parent)
        removeParentEdges(edgeMap, child);
    })
    return edgeMap;
}


console.log(countSubTrees(4, [[0,2],[0,3],[1,2]], 'aeed'));