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

const times = 500;

// runTest(sudokuChecker);
// runTest(sudokuChecker2);
// runTest(sudokuChecker3);
const makePuzzle = () => [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
// const puzzle2 = new Array(9).fill(0).map(() => new Array(9).fill(0));
// console.log(sudokuSolver(puzzle3), 'solution');

const puzzle2 = [
  [0, 0, 0, 0, 0, 3, 0, 1, 7],
  [0, 1, 5, 0, 0, 9, 0, 0, 8],
  [0, 6, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 9, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 5, 0, 0, 0, 0, 4],
  [0, 0, 0, 0, 0, 0, 0, 2, 0],
  [5, 0, 0, 6, 0, 0, 3, 4, 0],
  [3, 4, 0, 2, 0, 0, 0, 0, 0]
];

const sol2 = [
  [ 2, 9, 4, 8, 6, 3, 5, 1, 7 ],
  [ 7, 1, 5, 4, 2, 9, 6, 3, 8 ],
  [ 8, 6, 3, 7, 5, 1, 4, 9, 2 ],
  [ 1, 5, 2, 9, 4, 7, 8, 6, 3 ],
  [ 4, 7, 9, 3, 8, 6, 2, 5, 1 ],
  [ 6, 3, 8, 5, 1, 2, 9, 7, 4 ],
  [ 9, 8, 6, 1, 3, 4, 7, 2, 5 ],
  [ 5, 2, 1, 6, 7, 8, 3, 4, 9 ],
  [ 3, 4, 7, 2, 9, 5, 1, 8, 6 ]
];

const puzzle3 = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]


const EMPTY = 0;
const possibleNumbers = [1,2,3,4,5,6,7,8,9];
const arrSet = [true,true,true,true,true,true,true,true,true];
let calls = 0;
// console.log(sudokuChecker(sudokuSolver(puzzle2)));
// console.log(calls);

// runTest(sudokuSolver);
runTest(solveSudoku2);

function runTest(fn, puzzle = puzzle2) {
  console.time(fn.name);
  for (var i = 0; i < times; i++) {
    fn(JSON.parse(JSON.stringify(puzzle)));
  }
  console.timeEnd(fn.name);
}

function sudokuChecker(board) {
  if (Array.isArray(board)) {
    board = board.map(row => row.join('')).join('\n');
  }
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
    if (val === '\n') { continue; }
    rows[Math.floor(i / 10)] |= 1 << val;
    cols[i % 10] |= 1 << val;
    boxNum = 3 * Math.floor(Math.floor(i / 10) / 3) + Math.floor((i % 10) / 3);
    boxes[boxNum] |= 1 << val;
  }
  let check = (val) => val === 1022;
  return (rows.every(check) && cols.every(check) && boxes.every(check)) ? 'solved' : 'invalid';
}
function sudokuSolver(board) {
  calls ++;
  // TODO: pass sets in as arguments and incrementally update as nums tried/undone
  // TODO: keep track of number of zeroes in board as argument
  const possible = board.map(row => row.map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])));
  const rowBans = new Array(9).fill(0).map(() => new Set());
  const colBans = new Array(9).fill(0).map(() => new Set());
  // box numbered from left to right then top to bottom
  const boxBans = new Array(9).fill(0).map(() => new Set());
  unfilledSquares = 0;
  for (const i in board) {
    for (const j in board[i]) {
      const val = board[i][j];
      if (val === 0) {
        unfilledSquares++;
        continue;
      }
      // check for invalids

      rowBans[i].add(val);
      colBans[j].add(val);
      boxBans[Math.floor(i / 3) * 3 + Math.floor(j / 3)].add(val);
    }
  }
  if (unfilledSquares === 0) {
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
        return null;
      } else if (myPoss.size === 1) {
        // Naked single
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

  // Hidden single for blocks
  for (let box = 0; box < 9; box++) {
    const startI = Math.floor(box / 3) * 3;
    const startJ = (box % 3)  * 3;
    for (let num = 1; num <= 9; num++) {
      let validLocCount = 0;
      let lastValidLoc = null;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const currI = startI + i;
          const currJ = startJ + j;
          if (board[currI][currJ] !== 0) {
            continue;
          }
          if (!possible[currI][currJ].has(num)) {
            continue;
          }
          validLocCount ++;
          lastValidLoc = [currI, currJ];
        }
      }
      if (validLocCount === 1) {
        const [i, j] = lastValidLoc;
        // console.log('found', i, j, num);
        // console.log(unfilledSquares);
        board[i][j] = num;
        const sol = sudokuSolver(board);
        board[i][j] = 0;
        return sol;
      }
    }
  }


  const [i, j, posVals] = bestGuess;
  // console.log(`At Depth ${zeroCount} at location ${[i, j]} trying ${Array.from(posVals)}`)
  const asdfasodfijs = 3;
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

function checkIfValid(number, row, col, board) {
    for (let i = 0; i < board.length; i += 1) {
        if (board[row][i] === number) {
            return false;
        }
        if (board[i][col] === number) {
            return false;
        }
    }
    const rowStart = Math.floor(row / 3) * 3
    const colStart = Math.floor(col / 3) * 3
    for (let i = rowStart; i < rowStart + 3; i += 1) {
        for (let j = colStart; j < colStart + 3; j += 1) {
            if (board[i][j] === number) {
                return false;
            }
        }
    }
    return true;
}
function solveSudoku2(board) {
    // Keep track of empty points so you can jump to the next empty point easily

    // TODO: keep track of number of zeroes in board as argument
    const possible = board.map(row => row.map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])));
    const rowBans = new Array(9).fill(0).map(() => new Set());
    const colBans = new Array(9).fill(0).map(() => new Set());
    // box numbered from left to right then top to bottom
    const boxBans = new Array(9).fill(0).map(() => new Set());
    const emptyPoints = [];
    for (let i = 0; i < board.length; i += 1) {
        for (let j = 0; j < board[i].length; j += 1) {
            if (board[i][j] === EMPTY) {
                emptyPoints.push({ row: i, col: j })
            }
            rowBans[i].add(board[i][j]);
            colBans[j].add(board[i][j]);
            boxBans[Math.floor(i / 3) * 3 + Math.floor(j / 3)].add(board[i][j]);
        }
    }
    function backtrack(emptyPointIndex) {
		// End case - no more empty points, and all have been filled
        if (emptyPointIndex >= emptyPoints.length) {
            return true;
        }
        const { row, col } = emptyPoints[emptyPointIndex]

        for (let num = 1; num <= 9; num++) {
          if (rowBans[row].has(num) || colBans[col].has(num) || boxBans[Math.floor(row / 3) * 3 + Math.floor(col / 3)].has(num)) {
            continue;
          }

        // for (let i = 0; i < possibleNumbers.length; i += 1) {
        //   const num = possibleNumbers[i];
        //   const isValid = checkIfValid(num, row, col, board);
			// Number is valid in square, so we move on to the next number that is not filled
            // if (isValid) {
              rowBans[row].add(num);
              colBans[col].add(num);
              boxBans[Math.floor(row / 3) * 3 + Math.floor(col / 3)].add(num);
              board[row][col] = num;
                const hasRecursiveSolution = backtrack(emptyPointIndex + 1)
                if (hasRecursiveSolution) {
                    return true;
                }
                rowBans[row].delete(num);
                colBans[col].delete(num);
                boxBans[Math.floor(row / 3) * 3 + Math.floor(col / 3)].delete(num);
                board[row][col] = EMPTY;
            // }
        }
        // None of the numbers work, we have to go back to the previous unfilled spot
		// and choose a different number
        return false;
    }
    backtrack(0);
    return board;
};

function solveSudoku(board) {
    // Keep track of empty points so you can jump to the next empty point easily
    const emptyPoints = [];
    for (let i = 0; i < board.length; i += 1) {
        for (let j = 0; j < board[i].length; j += 1) {
            if (board[i][j] === EMPTY) {
                emptyPoints.push({ row: i, col: j })
            }
        }
    }
    function backtrack(emptyPointIndex) {
		// End case - no more empty points, and all have been filled
        if (emptyPointIndex >= emptyPoints.length) {
            return true;
        }
        const { row, col } = emptyPoints[emptyPointIndex]
        for (let i = 0; i < possibleNumbers.length; i += 1) {
            const num = possibleNumbers[i];
            const isValid = checkIfValid(num, row, col, board);
			// Number is valid in square, so we move on to the next number that is not filled
            if (isValid) {
                board[row][col] = num;
                const hasRecursiveSolution = backtrack(emptyPointIndex + 1)
                if (hasRecursiveSolution) {
                    return true;
                }
                board[row][col] = EMPTY;
            }
        }
        // None of the numbers work, we have to go back to the previous unfilled spot
		// and choose a different number
        return false;
    }
    backtrack(0);
    return board;
};
class Board {
  constructor(board) {
    this.parseBoard(board);
    this.possible = board.map(row => row.map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])));
    this.rowBans = new Array(9).fill(0).map(() => new Set());
    this.colBans = new Array(9).fill(0).map(() => new Set());
    // box numbered from left to right then top to bottom
    this.boxBans = new Array(9).fill(0).map(() => new Set());
    this.isInvalid = false;
    this.unfilledSquares = 0;
    this.fillSets();
  }

  setVal(i, j, num) {
    if (board[i][j] === num) {
      throw new Exception('bad arg')
    }
    if (num === 0) {
      const curr = board[i][j];
      this.rowBans[i].delete(curr);
      this.colBans[j].delete(curr);
      this.boxBans[Math.floor(i / 3) * 3 + Math.floor(j / 3)].delete(curr);
    } else if (this.board[i][j] !== 0) {
      throw new Exception('Overitting existing val');
    } else {
      this.rowBans[i].add(num);
      this.colBans[j].add(num);
      this.boxBans[Math.floor(i / 3) * 3 + Math.floor(j / 3)].add(val);
    }
    this.updatePossible({ type: 'row', loc: i});
    this.updatePossible({ type: 'col', loc: j});
    this.updatePossible({ type: 'box', loc: Math.floor(i / 3) * 3 + Math.floor(j / 3)});
  }

  parseBoard(board) {
    if (typeof board === 'string' && board.length != 89) {
      this.board = board.split('\n').map(row => row.split(''));
    } else if (Array.isArray(board) && board.length === 9) {
      this.board = board;
    } else {
      throw new Exception('unrecognized board format');
    }
  }

  fillSets() {
    for (const i in board) {
      for (const j in board[i]) {
        const val = board[i][j];
        if (val === 0) {
          this.unfilledSquares++;
          continue;
        }
        // check for invalids

        this.rowBans[i].add(val);
        this.colBans[j].add(val);
        this.boxBans[Math.floor(i / 3) * 3 + Math.floor(j / 3)].add(val);
      }
    }
    this.updatePossible({ type: 'all'});
  }

  updateAllPossible() {
    for (const i in board) {
      for (const j in board) {
        const val = board[i][j];
        if (val !== 0) {
          continue;
        }
        // TODO: use data structure that is better at doing union (bits?)
        const banned = new Set([...this.rowBans[i], ...this.colBans[j], ...this.boxBans[Math.floor(i / 3) * 3 + Math.floor(j / 3)]])
        const myPoss = this.possible[i][j];
        banned.forEach(val => myPoss.delete(val));
        if (myPoss.size === 0) {
          this.isInvalid = true;
        }
      }
    }
  }

  updateRowPossible(row) {

  }
  updateColPossible(row) {

  }
  updateBoxPossible(row) {

  }
}