
function patternMatching(value, pattern) {
    return matchExistsFrom(0, 0, {});

    function matchExistsFrom(vLoc, pLoc, matchings) {
        if (pLoc >= pattern.length && vLoc >= value.length) {
            return true;
        } else if (pLoc >= pattern.length || vLoc >= value.length) {
            return false;
        }
        if (matchings[pattern[pLoc]] !== undefined) {
            let currPattern = matchings[pattern[pLoc]];
            if (matchesAt(vLoc, currPattern)) {
                return matchExistsFrom(vLoc + currPattern.length, pLoc + 1, matchings);
            } else {
                return false;
            }
        } else {
            for (let i = vLoc; i < value.length; i++) {
                let test = value.slice(vLoc, i + 1);
                matchings[pattern[pLoc]] = test;
                if (matchExistsFrom(vLoc + test.length, pLoc + 1, matchings)) {
                    return true;
                }
            }
            return false;
        }
    }

    function matchesAt(vLoc, pattern) {
        for (let i = 0; i < pattern.length; i++) {
            if (value[vLoc + i] !== pattern[i]) {
                return false;
            }
        }
        return true;
    }
}

console.log(patternMatching('catcatgocatgo', 'aabab'));