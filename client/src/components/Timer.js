import React, { Component } from 'react';
import '../styles/Timer.css';

class Timer extends Component {
  constructor() {
    super();
    this.state = { timer: '00 : 00' };
  }
  render = () => <div className="Game-timer">{this.state.timer}</div>;
  componentDidMount() {
    this.startTime = Date.now();
    this.timerInterval = setInterval(this.updateTimer, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }
  updateTimer = () => {
    const t = Date.parse(new Date()) - Date.parse(new Date(this.startTime));
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const timer = ('0' + minutes).slice(-2) + ' : ' + ('0' + seconds).slice(-2);
    this.setState({ timer });
  };
}

export default Timer;
