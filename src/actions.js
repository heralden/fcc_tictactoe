export const placePiece = (i, j, board, piece) => [
  ...board.slice(0, i),
  [
    ...board[i].slice(0, j),
    piece,
    ...board[i].slice(j+1)
  ],
  ...board.slice(i+1)
]

export const moveCpu = (board, piece, cb) => {
  let J, I;
  board.forEach((arr, j) => arr.forEach((e, i) => {
    if (e === null) {
      J = j;
      I = i;
    }
  }));
  cb(J, I);
}

export const isGameOver = board => {
  if (winScenario(board, 'X'))
    return 'X';
  else if (winScenario(board, 'O'))
    return 'O';
  else if (tieScenario(board))
    return 'tie';
  else
    return false;
}

const tieScenario = b => b.every(arr => arr.every(e => e !== null))

const winScenario = (b, e) => {
  if ( isSeq(b[0][0], b[1][0], b[2][0], e)
    || isSeq(b[0][1], b[1][1], b[2][1], e)
    || isSeq(b[0][2], b[1][2], b[2][2], e)
    || isSeq(b[0][0], b[0][1], b[0][2], e)
    || isSeq(b[1][0], b[1][1], b[1][2], e)
    || isSeq(b[2][0], b[2][1], b[2][2], e)
    || isSeq(b[0][0], b[1][1], b[2][2], e)
    || isSeq(b[2][0], b[1][1], b[0][2], e))
    return true;
  else
    return false;
}

const isSeq = (a, b, c, e) => {
  if (a === e &&
      b === e &&
      c === e)
    return true
  else 
    return false
}
