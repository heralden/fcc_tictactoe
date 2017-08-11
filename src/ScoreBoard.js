import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = props => {
  if (props.cpu) {
    return <VsCpu {...props} />;
  } else {
    return <VsPlayer {...props} />;
  }
}

const VsCpu = ({ playerScore, otherScore }) => (
  <div className="ScoreBoard">
    <span className="Score-X">P1: {playerScore}</span>
    <span className="Score-O">CPU: {otherScore}</span>
  </div>
);

const VsPlayer = ({ playerScore, otherScore }) => (
  <div className="ScoreBoard">
    <span className="Score-X">P1: {playerScore}</span>
    <span className="Score-O">P2: {otherScore}</span>
  </div>
);

export default ScoreBoard;
