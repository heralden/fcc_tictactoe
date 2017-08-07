import React from 'react';
import './Game.css';

const Game = props =>  (
  <div className="Game">
    <table className="Game-table"
      cellSpacing="0">
      <tbody>
        <tr>
          {createCell(0, 0, props)}
          {createCell(0, 1, props)}
          {createCell(0, 2, props)}
        </tr>
        <tr>
          {createCell(1, 0, props)}
          {createCell(1, 1, props)}
          {createCell(1, 2, props)}
        </tr>
        <tr>
          {createCell(2, 0, props)}
          {createCell(2, 1, props)}
          {createCell(2, 2, props)}
        </tr>
      </tbody>
    </table>
  </div>
);

export default Game;

const createCell = ( y, x, { board, onClickCell }) => (
  <td onClick={onClickCell(y, x)}>
    {board[y][x]}
  </td>
);
