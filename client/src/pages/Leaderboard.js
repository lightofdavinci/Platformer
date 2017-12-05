import React, { Component } from 'react';
import identicons from 'identicons';
import '../styles/Leaderboard.css';

// dummy data
const stats = [
  {
    username: 'Paul',
    email: 'username@example.com',
    rank: 1,
    time: '02 : 45'
  },
  {
    username: 'Ben',
    email: 'ben@example.com',
    rank: 2,
    time: '06 : 35'
  },
  {
    username: 'Alex',
    email: 'alex@example.com',
    rank: 3,
    time: '08 : 35'
  },
  {
    username: 'Sean',
    email: 'sean@example.com',
    rank: 4,
    time: '09 : 15'
  },
  {
    username: 'John',
    email: 'john@example.com',
    rank: 5,
    time: '11 : 11'
  },
  {
    username: 'Brian',
    email: 'brian@example.com',
    rank: 6,
    time: '11 : 41'
  },
  {
    username: 'Dan',
    email: 'dan@example.com',
    rank: 7,
    time: '11 : 48'
  },
  {
    username: 'Kate',
    email: 'kate@example.com',
    rank: 8,
    time: '11 : 58'
  },
  {
    username: 'Maria',
    email: 'maria@example.com',
    rank: 9,
    time: '12 : 48'
  },
  {
    username: 'Julio',
    email: 'julio@example.com',
    rank: 10,
    time: '12 : 49'
  },
  {
    username: 'Lucy',
    email: 'lucy@example.com',
    rank: 11,
    time: '13 : 19'
  }
];

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = { stats: [] };
  }
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
          {this.state.stats.map((player, k) => {
            return (
              <div className="Leaderboard-row" key={k + player.username}>
                <div className="Leaderboard-rank">{player.rank}</div>
                <div className="Leaderboard-id">
                  <img
                    id="identicon"
                    src={identicons.generateSVGDataURIString(player.email, {
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
          Total riders on this list: {this.state.stats.length}{' '}
        </h3>
      </div>
    );
  }
  componentDidMount() {
    this.setState({ stats });
  }
}

export default Leaderboard;
