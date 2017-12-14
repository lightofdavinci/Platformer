import React, { Component } from 'react';
import identicons from 'identicons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStats } from '../actions';

import '../styles/Leaderboard.css';

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <h1 className="Leaderboard-title">OVERALL</h1>
        <div className="Leaderboard-table">
          <div className="Leaderboard-header">
            <div className="Leaderboard-rank">RANK</div>
            <div className="Leaderboard-id">ID</div>
            <div className="Leaderboard-name">GAMERTAG</div>
            <div className="Leaderboard-time">TIME</div>
          </div>
          {this.props.stats.map((player, k) => {
            return (
              <div className="Leaderboard-row" key={k + player.username}>
                <div className="Leaderboard-rank">{player.rank}</div>
                <div className="Leaderboard-id">
                  <img
                    id="identicon"
                    src={identicons.generateSVGDataURIString(player.username, {
                      width: 28,
                      size: 5
                    })}
                    alt="identicons w28 s5"
                  />
                </div>
                <div className="Leaderboard-name">{player.username}</div>
                <div className="Leaderboard-time">{player.time}</div>
              </div>
            );
          })}
        </div>
        <h3 className="Leaderboard-footer">
          Total riders on this list: {this.props.stats.length}{' '}
        </h3>
      </div>
    );
  }
  componentDidMount() {
    this.props.getStats();
  }
}

const mapStateToProps = state => {
  return {
    stats: state.stats
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getStats }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
