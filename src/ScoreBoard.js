import React, { Component } from 'react';
import './ScoreBoard.css';

const ScoreBoard = props => (
  <div className="ScoreBoard">
    <span className="Score-header">Scoreboard</span>
    <span className="Score-X">0</span>
    <span className="Score-O">0</span>
  </div>
);

export default ScoreBoard;
