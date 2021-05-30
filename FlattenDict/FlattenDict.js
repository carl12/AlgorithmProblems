
function flattenDictionary(dict) {
  const keyValuePairs = {};
  for (let key in dict) {
    if (!dict.hasOwnProperty(key)) {
      continue;
    }
    const val = dict[key];
    if (typeof(val) !== "object") {
      keyValuePairs[key] = val;
    } else {
      const subFlatDict = flattenDictionary(val);
      for (subKey in subFlatDict) {
        const subVal = subFlatDict[subKey];
        let combKey = `${key}.${subKey}`;
        if (subKey === '' || key === '') {
          combKey = key+subKey;
        }
        keyValuePairs[combKey] = subVal;
      }
    }
  }
  return keyValuePairs;
}
dict = {
            "Key1" : "1",
            "Key2" : {
                "a" : "2",
                "b" : "3",
                "c" : {
                    "d" : "3",
                    "e" : {
                        "" : "1"
                    }
                }
            }
        }

console.log(flattenDictionary(dict));
/*
maintain a list of keys and their entries
[[[key1, key2,...][entry]],[[key1,...],[entry2]]]



dict = {
            "Key1" : "1",
            "Key2" : {
                "a" : "2",
                "b" : "3",
                "c" : {
                    "d" : "3",
                    "e" : {
                        "" : "1"
                    }
                }
            }
        }

   output = {
            "Key1" : "1",
            "Key2.a" : "2",
            "Key2.b" : "3",
            "Key2.c.d" : "3",
            "Key2.c.e" : "1"
        }


*/