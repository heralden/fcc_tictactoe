import React, { Component } from 'react';
import './Game.css';

class Game extends Component {
  render() {
    return (
      <div className="Game">
        <table className="Game-table"
          cellspacing="0">
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Game;
