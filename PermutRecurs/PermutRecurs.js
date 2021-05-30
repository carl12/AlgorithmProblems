function getPermut(str) {
  if (str.length === 1) {
    return [str];
  }
  let options = [];
  for (let i = 0; i < str.length; i++) {
    let newOpt = getPermut(str.slice(0, i) + str.slice(i + 1));
    newOpt = newOpt.map(substr => substr + str[i]);
    options = options.concat(newOpt);
  }
  return options;
}

function assert(s1, s2) {
  if (s1.length !== s2.length || s1.some((_, i) => s1[i] !== s2[i])) {
    console.log('failed test', s1, s2);
  }
  console.log('ok');
}
let tests = [
  ['a', ['a']],
  ['ab', ['ba', 'ab']],
  ['abc', ['cba', 'bca', 'cab', 'acb', 'bac', 'abc']],
]

tests.forEach(test => assert(getPermut(test[0]), test[1]));