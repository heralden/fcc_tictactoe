import React from 'react';
import './Menu.css';

const Menu = ({ onOnePlayer, onTwoPlayer }) => (
  <div className="Menu">

    <button type="button"
      onClick={onOnePlayer}>
      1 player
    </button>

    <button type="button"
      onClick={onTwoPlayer}>
      2 player
    </button>

  </div>
);

export default Menu;
