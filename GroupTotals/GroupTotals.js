
// Have a function read in strArr parameter containing key:value pairs 
// where the key is a string and the value is an integer. 

// Your program should return a string with the new key:value pairs 
// seperated by a comma and summed into the same key


function GroupTotals(strArr) {
  const pairs = {};
  for (let i = 0; i < strArr.length; i++) {
    let [key, value] = strArr[i].split(':');
    pairs[key] = (pairs[key] || 0) + parseInt(value);
  }

  const output = [];
  for (let key in pairs) {
    output.push(`${key}:${pairs[key]}`);
  }
  output.sort();
  console.log(output.join(','));
  return output.join(',');
}


GroupTotals(['B:-1', 'A:1', 'B:3', 'A:5']);