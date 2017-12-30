import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Cellphone.css';

const Cellphone = props => {
  return (
    <div className="Cellphone">
      <div className="Cellphone-body">
        <div className="Cellphone-camera" />
        <div className="Cellphone-screen">
          <Link className="Cellphone-screen-btn" to="/game">
            {' '}
            PLAY{' '}
          </Link>
        </div>
        <div className="Cellphone-btn" />
      </div>
    </div>
  );
};

export default Cellphone;
