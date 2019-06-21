
// Implementation has significant limitations
  // Takes XML as string input
  // assumes spaces between all elements
  // assumes no spaces between equal signs for attributes or inside strings

function xmlEncoder(xml, mapping) {
  let result = [];
  let tokens = xml.split(' ');
  let tagState = 0;
  for (let token of tokens) {
    let start = 0;
    let end = token.length;
    if (token[0] === '<') {
      if (token[1] === '/') {
        result.push(0);
        continue;
      }
      tagState = 1;
      start = 1; 
    } else if (tagState === 0) {
      result.push(token);
      continue;
    }
    if (token[token.length - 1] === '>') {
      tagState = tagState === 1 ? 3 : 4;
      end = token.length - 1;
    }

    if (tagState === 1 || tagState === 3) {
      result.push(mapping[token.slice(start, end)]);
    } else {
      let [key, value] = token.slice(start, end).split('=');
      result.push(mapping[key]);
      result.push(value.slice(1, - 1));
    }
    if (tagState === 1) {
      tagState = 2;
    } else if (tagState === 4 || tagState === 3) {
      result.push(0);
      tagState = 0;
    }
  }
  console.log(result.join(' '));
  return result.join(' ');
}

xmlEncoder('<div content="hello_here"> hi <lol> ig </lol> </div>', { div: 1, content: 2, lol:3 });
