/*
Given a full sudoku board, return 'solved' if the board is solved, or 'invalid' if the board is invalid.

A sudoku board is solved if each column, row, and 3 x 3 subgrid contains all of the digits from 1 to 9.

Input: A String representing the board.
Output: 'solved' if the board is valid, 'invalid' if it isn't

Example input:
"735814296\n
896275314\n
214963857\n
589427163\n
362189745\n
471356982\n
923541678\n
648792531\n
157638429"
*/







const puzzle = `735814296
896275314
214963857
589427163
362189745
471356982
923541678
648792531
157638429`;

const times = 5000;

// runTest(sudokuChecker);
// runTest(sudokuChecker2);
// runTest(sudokuChecker3);
const makePuzzle = () => [
    [1,2,3,4,5,6,7,8,9],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];
// const puzzle2 = new Array(9).fill(0).map(() => new Array(9).fill(0));
// console.log(sudokuSolver(puzzle3), 'solution');

console.time();
for (let i = 0; i < 4000; i++) {
    sudokuSolver(makePuzzle());
}
console.timeEnd();



function runTest(fn) {
    console.time(fn.name);
    for (var i = 0; i < times; i++) {
      fn(puzzle);
    }
    console.timeEnd(fn.name);
}

function sudokuChecker(board) {
    if (board.length != 89) {
      return 'invalid';
    }
    let boardArr = board.split('\n').map(row => row.split(''));

    let nums = new Set();
    for (var i = 0; i < boardArr.length; i++) {
      nums = new Set();
      for (var j = 0; j < boardArr.length; j++) {
        nums.add(boardArr[i][j]);
      }
      if (nums.size !== 9) {
        return 'invalid';
      }
    }

    for (var j = 0; j < boardArr.length; j++) {
      nums = new Set();
      for (var i = 0; i < boardArr.length; i++) {
        nums.add(boardArr[i][j]);
      }
      if (nums.size !== 9) {
        return 'invalid';
      }
    }

    for (var firstRow = 0; firstRow < boardArr.length; firstRow += 3) {
      for (var firstCol = 0; firstCol < boardArr.length; firstCol += 3) {
        nums = new Set();
        for (var i = firstRow; i < firstRow + 3; i++) {
          for (var j = firstCol; j < firstCol + 3; j++) {
            nums.add(boardArr[i][j]);
          }
        }
        if (nums.size !== 9) {
          return 'invalid';
        }
      }
    }
    return 'solved';
}

function sudokuChecker2(board) {

board = board.split('\n').map(row => row.split(''));
let rows = new Array(9).fill(0);
let cols = new Array(9).fill(0);
let boxes = new Array(9).fill(0);
let val;
for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
    val = board[i][j];
    rows[i] |= 1 << val;
    cols[j] |= 1 << val;
    let boxNum = 3 * Math.floor(i / 3) + Math.floor(j / 3);
    boxes[boxNum] |= 1 << val;
    }
}
let check = (val) => val === 1022;
return (rows.every(check) && cols.every(check) && boxes.every(check)) ? 'solved' : 'invalid';
}

function sudokuChecker3(board) {
let rows = new Array(9).fill(0);
let cols = new Array(9).fill(0);
let boxes = new Array(9).fill(0);
let val;
let boxNum;
for (var i = 0; i < board.length; i++) {
    val = board[i];
    if (val === '\n') {continue;}
    rows[Math.floor(i / 10)] |= 1 << val;
    cols[i % 10] |= 1 << val;
    boxNum = 3 * Math.floor(Math.floor(i / 10) / 3) + Math.floor((i % 10) / 3);
    boxes[boxNum] |= 1 << val;
}
let check = (val) => val === 1022;
return (rows.every(check) && cols.every(check) && boxes.every(check)) ? 'solved' : 'invalid';
}

function sudokuSolver(board) {
    // TODO: pass sets in as arguments and incrementally update as nums tried/undone
    // TODO: keep track of number of zeroes in board as argument
    const possible = board.map(row => row.map(() => new Set([1,2,3,4,5,6,7,8,9])));
    const rowBans = new Array(9).fill(0).map(() => new Set());
    const colBans = new Array(9).fill(0).map(() => new Set());
    // box numbered from left to right then top to bottom
    const boxBans = new Array(9).fill(0).map(val => new Set());
    zeroCount = 0;
    for (const i in board) {
        for (const j in board[i]) {
            const val = board[i][j];
            if (val === 0) {
                zeroCount++;
                continue;
            }
            // check for invalids

            rowBans[i].add(val);
            colBans[j].add(val);
            boxBans[Math.floor(i / 3) * 3 + Math.floor(j / 3)].add(val);
        }
    }
    if (zeroCount === 0) {
        // console.log(board, 'asdf');
        return JSON.parse(JSON.stringify(board));
    }
    // console.log(zeroCount);
    let bestGuess = null;
    let lowest = 10;
    for (const i in board) {
        for (const j in board) {
            const val = board[i][j];
            if (val !== 0) {
                continue;
            }
            // TODO: use data structure that is better at doing union (bits?)
            const banned = new Set([...rowBans[i], ...colBans[j], ...boxBans[Math.floor(i / 3) * 3 + Math.floor(j / 3)]])
            const myPoss = possible[i][j];
            banned.forEach(val => myPoss.delete(val));
            if (myPoss.size === 0) {
                // console.log(`No possible for ${[i, j]} at depth ${zeroCount}; ${Array.from(rowBans[i])} | ${Array.from(colBans[j])} | ${Array.from(boxBans[Math.floor(i / 3) * 3 + Math.floor(j / 3)])}`);
                // console.log(JSON.stringify(board));
                return null;
            } else if (myPoss.size === 1) {
                const poss = Array.from(myPoss)[0];
                board[i][j] = poss;
                const sol = sudokuSolver(board);
                board[i][j] = 0;
                return sol;
            }
            // console.log(myPoss);
            if (myPoss.size < lowest) {
                bestGuess = [i, j, myPoss];
                lowest = myPoss.size;
            }
        }
    }
    if (!bestGuess) {
        // console.log(`No solution found at depth ${zeroCount}`)
        return null;
    }

    // TODO: investigate logic for how humans solve (ie. two cols banned in box, and two squares full in remaining col)
    const [ i, j, posVals ] = bestGuess;
    // console.log(`At Depth ${zeroCount} at location ${[i, j]} trying ${Array.from(posVals)}`)
    for (const val of posVals) {
        board[i][j] = val;
        const sol = sudokuSolver(board);
        if (sol) {
            return sol;
        }
        board[i][j] = 0;
    }
    return null;
}