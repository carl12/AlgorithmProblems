
function wordCountEngine(docuement) {
  const res = [];
  const wordToFirstAndCount = {};
  const words = docuement.split(' ');
  let i = 0;
  for (const word of words) {
    const cleanedWord = cleanWord(word);
    if (cleanedWord === '') {
      continue;
    }
    wordToFirstAndCount[cleanedWord] = (wordToFirstAndCount[cleanedWord] || [cleanedWord, 0, i]);
    wordToFirstAndCount[cleanedWord][1] ++;
    i ++;
  }

  for (word in wordToFirstAndCount) {
    // js
    res.push(wordToFirstAndCount[word])
  }

  res.sort((a, b) => {
    if (a[1] !== b[1]) return b[1] - a[1];
    return a[2] - b[2];
  });

  return res.map(el => [el[0], el[1].toString()]);

  function cleanWord(word) {
    word = word.toLowerCase();
    const punct = ['.', ',', '-', ':', ';', '\'', '\"', '!'];
    let newStr = [];
    for (char of word) {
      if (punct.includes(char)) {
        continue;
      }
      newStr.push(char);
    }
    return newStr.join('');
  }
}

document = "Practice makes perfect, you'll get perfecT by practice. just practice! just just just!!";

console.log(wordCountEngine(document));