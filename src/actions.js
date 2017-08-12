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
  let res = minimax(board, null, piece, piece);
  cb(res.move.j, res.move.i);
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

export const otherPiece = piece => piece === 'X' ? 'O' : 'X'

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

const availableMoves = board => {
  let moves = [];
  board.forEach((arr, i) => arr.forEach((e, j) => {
    if (e === null)
      moves.push({ i, j });
  }));
  return moves;
}

const CPUscore = (board, playerPiece) => {
  if (winScenario(board, playerPiece))
    return 10;
  else if (winScenario(board, otherPiece(playerPiece)))
    return -10;
  else
    return 0;
}

let maximum = arr => arr.reduce((max, e) => e.score > max.score ? e : max, { score: -1 });
let minimum = arr => arr.reduce((min, e) => e.score < min.score ? e : min, { score: 1 });

const minimax = (board, cpuMove, cpuPiece, currentPiece) => {
  if (isGameOver(board))
    return { score: CPUscore(board, cpuPiece), move: cpuMove };

  let data = availableMoves(board).map(move => {
    let newBoard = placePiece(move.i, move.j, board, currentPiece);
    return {
      score: minimax(newBoard, move, cpuPiece, otherPiece(currentPiece)).score,
      move: move
    };
  });

  if (currentPiece === cpuPiece) {
    let target = maximum(data);
    return { score: target.score, move: target.move };
  } else {
    let target = minimum(data);
    return { score: target.score, move: target.move };
  }
}
