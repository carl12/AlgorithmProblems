
function checkGuess(solution, guess) {
    const unusedSolution = new Set();
    const unusedGuess = new Set();
    let hitCount = 0;
    let pseudoHitCount = 0;
    for (var i = 0; i < guess.length; i++) {
        if (guess[i] === solution[i]) {
            hitCount += 1;
        } else {
            unusedGuess.add(guess[i]);
            unusedSolution.add(solution[i]);
        }
    }

    for (let guessChar of unusedGuess) {
        if (unusedSolution.has(guessChar)) {
            pseudoHitCount += 1;
        }
    }
    return [hitCount, pseudoHitCount];
}

function checkGuessActual(solution, guess) {
    let solutionCount = {};
    let hitCount = 0;
    let pseudoHitCount = 0;
    for (var i = 0; i < guess.length; i++) {
        if (guess[i] === solution[i]) {
            hitCount += 1;
        } else {
            solutionCount[solution[i]] = (solutionCount[solution[i]] || 0) + 1;
        }
    }

    for (var i = 0; i < guess.length; i++) {
        if (solutionCount[guess[i]]) {
            solutionCount[guess[i]] -= 1;
            pseudoHitCount += 1;
        } 
    }
    return [hitCount, pseudoHitCount];
}
// checkGuess('GGBB', 'YYGG');
// checkGuessActual('GGBB', 'YYGG');