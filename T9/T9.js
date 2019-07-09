// wordTrie = {
//     char: String | null, // (for the first one)
//     isEnd: Boolean,
//     currWord: String
//     a: wordTrie | undefined,
//     b: wordTrie | undefined, 
//     ...
//     z: wordTrie | undefined
// }

function t9(dial, wordTrie, numIn){
    let numMatching = numIn || {
        2: ['a','b','c'],
        3: ['d', 'e', 'f'],
        4: ['g', 'h', 'i'],
        5: ['j', 'k', 'l'],
        6: ['m', 'n', 'o'],
        7: ['p', 'q', 'r', 's'],
        8: ['t', 'u', 'v'],
        9: ['w', 'x', 'y', 'z'],
    };
    let validNodes = [wordTrie];

    for (let digit of dial.toString()) {
        let nextNodes = [];
        for (let node of validNodes) {
            for (let char of numMatching[digit]) {
                if (node[char]) {
                    nextNodes.push(node[char]);
                }
            }
        }
        validNodes = nextNodes;
    }
    return validNodes.reduce((endedWords, node) => {
        if (node.isEnd) {
            endedWords.push(node.currWord);
        }
        return endedWords;
    }, []);
}

