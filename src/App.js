import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import ScoreBoard from './ScoreBoard';
import Game from './Game';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <ScoreBoard />
        <Game />
      </div>
    );
  }
}

export default App;
