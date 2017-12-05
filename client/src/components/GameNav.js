import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/GameNav.css';

const GameNav = props => {
  return (
    <div className="Game-nav">
      <Link className="help-btn" to="/help">
        Help
      </Link>
      <Link className="stats-btn" to="/leaderboard">
        Stats
      </Link>
    </div>
  );
};

export default GameNav;
