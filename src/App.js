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
      pause: false,
      cpu: null,
      message: null,
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
      board: [
        [ null, null, null ],
        [ null, null, null ],
        [ null, null, null ]
      ]
    });
  }
  resetState = () => {
    clearTimeout(this.waitTimer);
    this.setState({
      pause: false,
      playerPiece: 'O', 
      playerScore: 0,
      otherScore: 0
    }, () => this.resetBoard());
  }
  handleOnePlayer = e => {
    this.resetState();
    this.setState({ 
      cpu: true
    }, this.showMessage("Player vs CPU"));
  }
  handleTwoPlayer = e => {
    this.resetState();
    this.setState({ 
      cpu: false
    }, this.showMessage("Two Player"));
  }

  showMessage = text => {
    clearTimeout(this.msgTimer);
    this.setState({ 
      message: text
    }, () => this.msgTimer = setTimeout(
      () => this.setState({ message: null }),
      2000
    ));
  }

  gameComplete = winner => {
    this.setState({
      pause: true
    }, () => {
      this.waitTimer = setTimeout(() => this.gameWon(winner), 1000);
    });
  }

  gameWon = winner => {
    if (winner === 'tie') {
      this.setState({ pause: false }, () => {
        this.showMessage("Draw");
        this.resetBoard();
      });
    } else {
      let targetScore;
      if (winner === this.state.playerPiece) {
        targetScore = "playerScore";
      } else {
        targetScore = "otherScore";
      }

      this.setState(prevState => ({ 
        pause: false,
        [targetScore]: prevState[targetScore] + 1
      }), () => {
        this.showMessage(winner.concat(" won!"));
        this.resetBoard();
      });
    }
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
          this.gameComplete(winner);
        }
      }
    ));
  }

  handleClickCell = (i, j) => () => {
    if (this.state.board[i][j] === null && !this.state.pause) {
      this.setState(prevState => ({
        board: placePiece(i, j, 
          prevState.board, 
          prevState.playerPiece
        )
      }), () => {
        let winner = isGameOver(this.state.board);
        if (winner) {
          this.gameComplete(winner);
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
          message={this.state.message}
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
  } else if (props.message) {
    return (
      <p className="placeholder-text">
        {props.message}
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
