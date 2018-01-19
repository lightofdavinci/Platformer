import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUnixTime } from '../actions';

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
    this.reduxInterval = setInterval(this.updateUnixTimer, 100);
  }
  componentWillUnmount() {
    clearInterval(this.timerInterval);
    clearInterval(this.reduxInterval);
  }
  updateTimer = () => {
    const t = Date.parse(new Date()) - Date.parse(new Date(this.startTime));
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const timer = ('0' + minutes).slice(-2) + ' : ' + ('0' + seconds).slice(-2);
    this.setState({ timer });
  };
  updateUnixTimer = () => {
    this.props.updateUnixTime([this.startTime, Date.now()]);
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateUnixTime }, dispatch);
};

export default connect(null, mapDispatchToProps)(Timer);
