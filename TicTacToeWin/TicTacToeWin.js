const hasWon1 = board => {
    let horizontal = true;
    let vertical = true;
    for (let i = 0; i < board.length; i++) {
        horizontal = true;
        vertical = true;
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] !== 1) {
                horizontal = false;
            }
            if (board[j][i] !== 1) {
                vertical = false;
            }
        }
        if (horizontal || vertical) {
            return true;
        }
    }

    let majorDiag = true;
    let minorDiag = true;
    for (let i = 0; i < board.length; i++) {
        if (board[i][i] !== 1) {
            majorDiag = false;
        }
        if (board[i][(board.length - 1) - i] !== 1) {
            minorDiag = false;
        }
    }
    return minorDiag || majorDiag;
}

const hasWon2 = board => {
    for (let i = 0; i < board.length; i++) {
        if (checkAll(board, 1, 0, i, 1, 0)
            || checkAll(board, 1, i, 0, 0, 1)) {
            return true;
        }
    }
    return checkAll(board, 1, 0, 0, 1, 1)
    || checkAll(board, 1, 0, board.length - 1, 1, -1);
}

const checkAll = (board, target, startI, startJ, incI, incJ) => {
    let i = startI;
    let j = startJ;
    while (checkBound(board, i, j)) {
        if (target !== board[i][j]) {
            return false;
        }
        i += incI;
        j += incJ;
    }
    return true;
}

const checkBound = (board, i, j) => {
    return board[i] && board[i][j] !== undefined;
}

let board1 = [
    [1, 1, 1],
    [0, 0, 0],
    [0, 0, 0]
];


let board2 = [
    [1, 0, 1],
    [1, 0, 0],
    [1, 0, 0]
];

let board3 = [
    [1, 0, 1],
    [1, 1, 0],
    [0, 0, 1]
];

let board4 = [
    [0, 0, 1],
    [1, 1, 0],
    [1, 0, 1]
];

let board5 = [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 1]
];
let board6 = [
    [0, 1, 1],
    [1, 0, 1],
    [1, 0, 1]
];


console.log(hasWon2(board1));
console.log(hasWon2(board2));
console.log(hasWon2(board3));
console.log(hasWon2(board4));
console.log(hasWon2(board5));
console.log(hasWon2(board6));

