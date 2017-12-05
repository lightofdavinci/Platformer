import React, { Component } from 'react';
import Cellphone from '../components/Cellphone';
import Laptop from '../components/Laptop';
import { Link } from 'react-router-dom';

import '../styles/Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="Landing-container">
        <div className="Landing-wrapper">
          <div className="Computer-tab">
            <div className="mac-btns">
              <div className="mac-btn --bgc-red" />
              <div className="mac-btn --bgc-yellow" />
              <div className="mac-btn --bgc-green" />
            </div>
            <div className="nav-btns">
              <Link to="/register" className="register-btn">
                Register
              </Link>
              <Link to="/login" className="login-btn">
                Login
              </Link>
            </div>
            <h1 className="laptop-title">SPHERE</h1>
            <h3 className="laptop-subtitle">physical 3D platformer maze</h3>
            <Laptop />
          </div>
          <div className="Cellphone-tab">
            <h3 className="cellphone-title">Rolling ball game</h3>
            <Cellphone />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
