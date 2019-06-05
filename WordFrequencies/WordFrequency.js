function WordFrequencies(words, text) {
    const count = {};
    const myTrie = new Trie(words);
    for (let word of words) {
        count[word] = 0;
    }
    let curr;
    for (let char of text) {
        console.log(char);
        if (char === ' ') {
            if (curr && curr.finishedWord) {
                count[curr.finishedWord] += 1;
                console.log('found: ', curr.finishedWord);
            }
            curr = myTrie.root;
            continue;
        }
        if (!curr) {
            continue;
        }
        curr = curr.children[char] || null;
    }
    if (curr && curr.finishedWord) {
        count[curr.finishedWord] += 1;
        console.log('found: ', curr.finishedWord);
    }
    const res = [];
    for (let word of words) {
        res.push(count[word]);
    }
    return res;
}
class Trie {
    constructor(words) {
        this.root = this.makeNode();
        for (let word of words) {
            let curr = this.root;
            for (let char of word) {
                if (!curr.children[char]) {
                    curr.children[char] = this.makeNode();
                }
                curr = curr.children[char];
            }
            curr.finishedWord = word;
        }
    }
    makeNode(finishedWord = null) {
        return { finishedWord: null, children: {} };
    }
}
function WordFrequencies2(words, text) {
    let textWords = text.split(' ');
    let count = {};
    for (let word of words) {
        count[word] = 0;
    }
    for (let textWord of textWords) {
        if (count[textWord] !== undefined) {
            count[textWord]++;
        }
    }
    const res = [];
    for (let word of words) {
        res.push(count[word]);
    }
    console.log(count);
    return res;
}
WordFrequencies2(['asdf', 'a', 'b', 'sdf'], 'asdf a b asdf asd sdf c d e asdf asdf a');
