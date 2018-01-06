import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import caretUp from '../images/caret-arrow-up.svg';
import caretLeft from '../images/caret-left.svg';
import caretDown from '../images/caret-down.svg';
import caretRight from '../images/caret-right.svg';
import '../styles/Help.css';

class Help extends Component {
  render() {
    return (
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <div className="instruction">
              <div className="instruction-goal-wrapper">
                <h3>
                  The goal is to touch <br /> the flag of the ship.
                </h3>
                <Link to="/game" className="instruction-btn">
                  START
                </Link>
              </div>
              <div className="instruction-arrow-keys-wrapper">
                <h3>Use The Arrow Keys To Move!</h3>
                <div className="arrow-key arrow-key-up">
                  <img src={caretUp} alt="20px x 20px" />
                </div>
                <div className="arrow-key arrow-key-down">
                  <img src={caretDown} alt="20px x 20px" />
                </div>
                <div className="arrow-key arrow-key-left">
                  <img src={caretLeft} alt="20px x 20px" />
                </div>
                <div className="arrow-key arrow-key-right">
                  <img src={caretRight} alt="20px x 20px" />
                </div>
              </div>
              <div className="instruction-spacebar-wrapper">
                <h3>And Space To Jump</h3>
                <div className="instruction-spacebar">
                  <h2>Spacebar</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Help;
