import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import ScoreBoard from './ScoreBoard';
import Game from './Game';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpu: null,
      gameOver: false,
      playerPiece: 'O', 
      playerScore: 0,
      otherScore: 0,
      board: [
        [ null, null, null ],
        [ null, null, null ],
        [ null, null, null ]
      ]
    };
  }

  resetState = () => {
    this.setState({
      gameOver: false,
      playerPiece: 'O', 
      playerScore: 0,
      otherScore: 0,
      board: [
        [ null, null, null ],
        [ null, null, null ],
        [ null, null, null ]
      ]
    });
  }
  handleOnePlayer = e => {
    this.resetState();
    this.setState({ 
      cpu: true
    });
  }
  handleTwoPlayer = e => {
    this.resetState();
    this.setState({ 
      cpu: false 
    });
  }
  handleClickCell = (i, j) => () => {
    if (this.state.board[i][j] === null) {
      this.setState(prevState => ({
        board: placePiece(i, j, 
          this.state.board, 
          this.state.playerPiece
        )
      }), () => {
        let winner = gameOver(this.state.board);
        if (winner) {
          this.setState({ gameOver: winner });
        } else {
          if (this.state.cpu) {
            this.cpuTurn();
          } else {
            this.setState(prevState => ({ 
              playerPiece: prevState.playerPiece === 'O' ? 'X' : 'O' 
            }));
          }
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Menu
          onOnePlayer={this.handleOnePlayer}
          onTwoPlayer={this.handleTwoPlayer}
        />
        <Main 
          cpu={this.state.cpu}
          gameOver={this.state.gameOver}
          handleClickCell={this.handleClickCell}
          board={this.state.board}
        />
        <ScoreBoard 
          playerScore={this.state.playerScore}
          otherScore={this.state.otherScore}
        />
      </div>
    );
  }
}

export default App;

const Main = props => {
  if (props.cpu === null) {
    return (
      <p className="placeholder-text">
        Choose a game mode!
      </p>
    );
  } else if (props.gameOver) {
    return (
      <p className="placeholder-text">
        {props.gameOver} won!
      </p>
    );
  } else {
    return (
      <Game 
        onClickCell={props.handleClickCell}
        board={props.board}
      />
    );
  }
}

const placePiece = (i, j, board, piece) => [
  ...board.slice(0, i),
  [
    ...board[i].slice(0, j),
    piece,
    ...board[i].slice(j+1)
  ],
  ...board.slice(i+1)
]

const gameOver = board => {
  if (winScenario(board, 'X'))
    return 'X';
  else if (winScenario(board, 'O'))
    return 'O';
  else
    return false;
}

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
