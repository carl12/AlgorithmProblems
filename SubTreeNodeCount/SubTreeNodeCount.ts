function countSubTrees(n: number, edges: number[][], labels: string): number[] {
    let tree = makeTree(edges);
    return labels.split('').map((char, i) => searchSubTree(tree, labels, i, char));
};

function searchSubTree(tree: any, labels: string, startNode: number, label: string): number {
    let count = 0;
    if (labels[startNode] === label) {
        count ++;
    }
    
    // loop over children and increment
    let children = tree[startNode];
    for (let child of children) {
        count += searchSubTree(tree, labels, child, labels[child]);
    }
    return count;   
}

function makeTree(edges: number[][]): any {
    let edgeMap = {};
    edges.forEach(edge => {
        edgeMap[edge[0]] = (edgeMap[edge[0]] || []).push(edge[1]);
        edgeMap[edge[1]] = (edgeMap[edge[1]] || []).push(edge[0]);
    });
    
    return removeParentEdges(edgeMap, 0);
}

function removeParentEdges(edgeMap, parent: number): any {
    edgeMap[parent].forEach(child => {
        edgeMap[child] = edgeMap[child].filter(el => el !== parent)
        removeParentEdges(edgeMap, child);
    })
    return edgeMap;
}

function getChildren(edges: number[][], startNode: number): number[] {
    return edges.filter(edge => edge[0] === startNode || edge[1] === startNode).map(edge => edge[0] === startNode ? edge[1] : edge[0]);
}