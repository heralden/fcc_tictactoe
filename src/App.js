import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import ScoreBoard from './ScoreBoard';
import Game from './Game';
import { placePiece, moveCpu, isGameOver } from './actions';

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

  resetBoard = () => {
    this.setState({
      gameOver: false,
      board: [
        [ null, null, null ],
        [ null, null, null ],
        [ null, null, null ]
      ]
    });
  }
  resetState = () => {
    this.setState({
      playerPiece: 'O', 
      playerScore: 0,
      otherScore: 0
    }, () => this.resetBoard());
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

  gameWon = winner => {
    let targetScore;
    if (winner === this.state.playerPiece) {
      targetScore = "playerScore";
    } else {
      targetScore = "otherScore";
    }

    this.setState(prevState => ({ 
      gameOver: winner,
      [targetScore]: prevState[targetScore] + 1
    }), () => {
      setTimeout(
        () => this.resetBoard(),
        2000
      )
    });
  }

  cpuTurn = () => {
    let cpuPiece = this.state.playerPiece === 'O' ? 'X' : 'O';
    moveCpu(this.state.board, cpuPiece, (i, j) => this.setState(
      prevState => ({
        board: placePiece(i, j,
          prevState.board,
          cpuPiece
        )
      }),
      () => {
        let winner = isGameOver(this.state.board);
        if (winner) {
          this.gameWon(winner);
        }
      }
    ));
  }

  handleClickCell = (i, j) => () => {
    if (this.state.board[i][j] === null) {
      this.setState(prevState => ({
        board: placePiece(i, j, 
          prevState.board, 
          prevState.playerPiece
        )
      }), () => {
        let winner = isGameOver(this.state.board);
        if (winner) {
          this.gameWon(winner);
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
