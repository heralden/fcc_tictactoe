import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({ playerScore, otherScore }) => (
  <div className="ScoreBoard">
    <span className="Score-X">X: {playerScore}</span>
    <span className="Score-O">O: {otherScore}</span>
  </div>
);

export default ScoreBoard;
